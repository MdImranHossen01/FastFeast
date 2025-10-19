import { connectToDatabase } from "@/lib/dbConnect";
import crypto from "crypto";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());
    console.log("🔹 Success callback received:", body);

    // We only rely on tran_id and val_id, and userEmail from value_a
    const { tran_id, val_id, value_a: userEmail } = body;

    if (!tran_id || !val_id) {
      return Response.redirect(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout?status=error&message=Invalid_Callback`, 302);
    }

    // 1. Verify the transaction with SSLCommerz
    const storeId = process.env.SSLC_STORE_ID;
    const storePass = process.env.SSLC_STORE_PASS;
    const verifyUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${storeId}&store_passwd=${storePass}&format=json`;
    
    const verifyRes = await fetch(verifyUrl);
    const verifyData = await verifyRes.json();

    if (verifyData.status !== "VALID" && verifyData.status !== "VALIDATED") {
      console.warn("Payment verification failed:", verifyData);
      return Response.redirect(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout?status=failed&tran_id=${tran_id}`, 302);
    }

    console.log("✅ Payment verification success.");
    
    // 2. Find the pending order in your database
    const { db } = await connectToDatabase();
    // Since we saved it in initiate.route.js, it should be here
    const pendingOrder = await db.collection("pendingOrders").findOne({ _id: tran_id });

    if (!pendingOrder) {
      console.error(`Error: Could not find pending order for tran_id: ${tran_id}. It might have already been processed.`);
      const finalTransaction = await db.collection("transactionHistory").findOne({ tran_id });
      if (finalTransaction) {
        return Response.redirect(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout?status=success&tran_id=${tran_id}&order_id=${finalTransaction.orderId}`, 302);
      }
      return Response.redirect(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout?status=error&message=Order_Not_Found`, 302);
    }

    // 3. Create the final transaction record
    const transactionCollection = db.collection("transactionHistory");
    const newOrder = {
      orderId: crypto.randomUUID(),
      userEmail: pendingOrder.userEmail,
      tran_id,
      val_id,
      items: pendingOrder.items, // 🎯 SECURE: Get items from the database record
      amount: verifyData.amount, // Use verified amount
      currency: verifyData.currency,
      card_type: verifyData.card_type,
      status: "success",
      tran_date: verifyData.tran_date,
      payment_gateway: "SSLCommerz",
      createdAt: new Date(),
    };
    await transactionCollection.insertOne(newOrder);
    console.log("✅ Order saved to transactionHistory:", newOrder.orderId);

    // 4. Clear the user's cart (existing logic, assuming this collection exists)
    try {
      await db.collection("carts").deleteMany({ userEmail: pendingOrder.userEmail });
      console.log(`🛒 Cart cleared for ${pendingOrder.userEmail}`);
    } catch (cartError) {
      console.error("Failed to clear user cart:", cartError);
    }

    // 5. Remove the order from the pending collection
    await db.collection("pendingOrders").deleteOne({ _id: tran_id });

    // 6. Redirect to checkout with success message
    return Response.redirect(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout?status=success&tran_id=${tran_id}&order_id=${newOrder.orderId}`, 302);

  } catch (error) {
    console.error("--- SSLCommerz Success Route Error ---", error);
    return Response.redirect(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout?status=server_error`, 302);
  }
}