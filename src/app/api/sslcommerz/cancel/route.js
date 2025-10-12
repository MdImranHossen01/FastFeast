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
      { $set: { status: "CANCELLED", payment_time: new Date() } }
    );

    return NextResponse.redirect(`${process.env.BASE_URL}/payment-cancelled`);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
