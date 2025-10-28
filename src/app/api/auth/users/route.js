import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";

export async function POST(req) {
  try {
    const user = await req.json();

    await connectMongooseDb();

    const createdUser = await User.create(user);

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
