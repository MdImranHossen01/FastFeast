import { NextResponse } from "next/server";
import { dbConnect, collectionsName } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tran_id = searchParams.get("tran_id");

    const transactionCollection = await dbConnect(
      collectionsName.transactionHistoryCollection
    );
    await transactionCollection.updateOne(
      { tran_id },
      { $set: { status: "FAILED", payment_time: new Date() } }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/payment-failed?tran_id=${tran_id}`
    );
  } catch (err) {
    console.error("Fail Route Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
