import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { connectToDatabase } from "@/lib/dbConnect"; // 🎯 Assuming you have this utility

export async function POST(request) {
  try {
    // Receive the full cartItems array and customer data from the client
    const { cartItems, customer } = await request.json();

    // Validation check for cartItems
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      console.error("Error: 'cartItems' is missing or empty.");
      return NextResponse.json({ success: false, message: "Invalid request data: cartItems is missing or invalid." });
    }

    // FIX 1: Calculate the total amount on the server securely.
    const total_amount = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity, 10),
      0
    );

    // Basic total validation
    if (isNaN(total_amount) || total_amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid calculated total amount." });
    }

    const tran_id = uuidv4();
    const userEmail = customer?.email || "anonymous@example.com";
    
    // NOTE: SSLCommerz value_b is limited to 255 characters. 
    // We will save the large cart data in our DB and use value_b for confirmation data only if needed.
    const cartJson = JSON.stringify(cartItems.map(i => ({ id: i.originalId, qty: i.quantity }))); // Minimal cart data for value_b

    if (cartJson.length > 255) {
      console.warn("Minimal cart data is still too long for SSLCommerz value_b field.");
      // For large carts, consider passing a short order reference ID instead of cartJson
    }

    // 🎯 NEW LOGIC: Save the full pending order to the database
    const { db } = await connectToDatabase();
    
    const pendingOrderData = {
      _id: tran_id, // Use tran_id as the unique ID for easy lookup
      userEmail: userEmail,
      total_amount: total_amount,
      items: cartItems, // Save the complete cart array
      customerInfo: customer, 
      status: "pending_sslcommerz",
      createdAt: new Date(),
    };

    await db.collection("pendingOrders").insertOne(pendingOrderData);
    console.log(`✅ Pending order saved with tran_id: ${tran_id}`);

    const payload = {
      store_id: process.env.SSLC_STORE_ID,
      store_passwd: process.env.SSLC_STORE_PASS,
      total_amount: total_amount, // Use the secure server-calculated total
      currency: "BDT",
      tran_id,
      success_url: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/sslcommerz/success`,
      fail_url: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout`,
      cus_name: customer?.fullName || "Anonymous User", // Use fullName from form
      cus_email: userEmail,
      cus_add1: customer?.address || "Dhaka",
      cus_city: customer?.city || "Dhaka",
      cus_postcode: customer?.postalCode || "1207",
      cus_country: "Bangladesh",
      cus_phone: customer?.phone || "01700000000",
      shipping_method: "NO",
      product_name: "Food Order",
      product_category: "Food",
      product_profile: "general",

      // Passing necessary data back to success route
      value_a: userEmail,
      value_b: tran_id, // 🎯 OPTIONAL: Send tran_id or minimal cart data in value_b
    };

    const sslRes = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload).toString(),
    });

    const data = await sslRes.json();

    if (data.status === "SUCCESS") {
      return NextResponse.json({
        success: true,
        GatewayPageURL: data.GatewayPageURL,
        tran_id,
      });
    } else {
      // IMPORTANT: If SSLCommerz fails, you might want to delete the pending order here.
      await db.collection("pendingOrders").deleteOne({ _id: tran_id });
      console.error("SSLCommerz Error:", data.failedreason || data);
      return NextResponse.json({
        success: false,
        message: data.failedreason || "Failed to create payment session",
        data,
      });
    }
  } catch (err) {
    console.error("Payment Init Error:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}