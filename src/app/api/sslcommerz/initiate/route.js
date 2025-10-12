import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const { total, customer } = await request.json();
    const tran_id = uuidv4();

    const payload = {
      store_id: process.env.SSLC_STORE_ID,
      store_passwd: process.env.SSLC_STORE_PASS,
      total_amount: total || 100,
      currency: "BDT",
      tran_id,
      success_url: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/sslcommerz/success`, 
      fail_url: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout`,                 
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/checkout`,              
      cus_name: customer?.name || "Anonymous User",
      cus_email: customer?.email || "example@gmail.com",
      cus_add1: customer?.address || "Dhaka",
      cus_city: "Dhaka",
      cus_postcode: "1207",
      cus_country: "Bangladesh",
      cus_phone: customer?.phone || "01700000000",
      shipping_method: "NO",
      product_name: "Food Order",
      product_category: "Food",
      product_profile: "general",
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
      console.error("SSLCommerz Error:", data);
      return NextResponse.json({
        success: false,
        message: "Failed to create payment session",
        data,
      });
    }
  } catch (err) {
    console.error("Payment Init Error:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
