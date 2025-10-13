import { connectToDatabase } from "@/lib/dbConnect";
import crypto from "crypto";

export async function POST(req) {
  try {
    console.log("SSLCommerz POST success route hit");

    // Parse form data
    const formData = await req.formData();
    console.log("🔹 Raw formData received:", formData);

    const tran_id = formData.get("tran_id");
    const val_id = formData.get("val_id");

    if (!val_id || !tran_id) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing transaction or validation ID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify with SSLCommerz validation API
    const storeId = process.env.SSLC_STORE_ID;
    const storePass = process.env.SSLC_STORE_PASS;
    const verifyUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${storeId}&store_passwd=${storePass}&format=json`;

    console.log("🔹 Verifying with URL:", verifyUrl);

    const verifyRes = await fetch(verifyUrl);
    const text = await verifyRes.text();

    let verifyData;
    try {
      verifyData = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", err);
      return new Response(
        JSON.stringify({ success: false, message: "Invalid JSON from SSLCommerz", raw: text }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Parsed verification data:", verifyData);

    // If payment valid, save to DB
    if (verifyData.status === "VALID" || verifyData.status === "SUCCESS") {
      console.log("Payment verification success, saving to DB...");

      try {
        // Fix: destructure db properly
        const { db } = await connectToDatabase();
        const collection = db.collection("payments"); // or use "orders"

        const newOrder = {
          orderId: crypto.randomUUID(),
          tran_id,
          val_id,
          amount: verifyData.amount,
          currency: verifyData.currency,
          card_type: verifyData.card_type,
          store_id: verifyData.store_id,
          status: verifyData.status,
          tran_date: verifyData.tran_date,
          card_issuer: verifyData.card_issuer,
          payment_gateway: "SSLCommerz",
          createdAt: new Date(),
        };

        await collection.insertOne(newOrder);
        console.log("Order saved successfully:", newOrder.orderId);

        // Redirect to checkout with success
        return Response.redirect(
          `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout?status=success&tran_id=${tran_id}&order_id=${newOrder.orderId}`,
          302
        );
      } catch (dbError) {
        console.error(" DB Save Error:", dbError);
        return new Response(
          JSON.stringify({ success: false, message: "Database save failed", error: dbError.message }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // If verification fails
    console.warn(" Payment verification failed:", verifyData);
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout?status=failed&tran_id=${tran_id}`,
      302
    );
  } catch (error) {
    console.error("SSLCommerz POST success error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error on POST success", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Optional: handle GET if user refreshes or hits the success URL directly
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tran_id = searchParams.get("tran_id");
    const val_id = searchParams.get("val_id");

    if (!tran_id || !val_id) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing tran_id or val_id in GET" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const storeId = process.env.SSLC_STORE_ID;
    const storePass = process.env.SSLC_STORE_PASS;
    const verifyUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${storeId}&store_passwd=${storePass}&format=json`;

    const verifyRes = await fetch(verifyUrl);
    const verifyData = await verifyRes.json();

    if (verifyData.status === "VALID" || verifyData.status === "SUCCESS") {
      return new Response(
        JSON.stringify({ success: true, message: "Payment verified via GET", tran_id }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "Payment verification failed", verifyData }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("SSLCommerz GET success error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error on GET success", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
