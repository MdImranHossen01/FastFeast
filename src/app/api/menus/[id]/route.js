import connectMongooseDb from "@/lib/mongoose";
import Menu from "@/models/menu.model";
import { NextResponse } from "next/server";

// GET menu by ID - OPTIMIZED
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    await connectMongooseDb();

    // ✅ OPTIMIZATION: Select only needed fields + use lean()
    const menu = await Menu.findById(id)
      .select('title imageUrl description price cuisine category ingredients dietaryTags restaurantId availability isCombo isSpecialOffer discountRate offerPrice reviewsCount rating')
      .lean();

    if (!menu) {
      return NextResponse.json(
        { success: false, message: "Menu not found" },
        { status: 404 }
      );
    }

    // ✅ OPTIMIZATION: Add caching headers for single menu
    return NextResponse.json(menu, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH (update) menu by ID - OPTIMIZED
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const updateData = await req.json();

    await connectMongooseDb();

    // ✅ OPTIMIZATION: Select only needed fields in response
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { $set: updateData },
      { 
        new: true, 
        runValidators: true, 
        context: "query",
        select: 'title imageUrl description price cuisine category ingredients dietaryTags restaurantId availability isCombo isSpecialOffer discountRate offerPrice reviewsCount rating'
      }
    );

    if (!updatedMenu) {
      return NextResponse.json(
        { success: false, message: "Menu not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMenu, { status: 200 });
  } catch (error) {
    console.error("Error updating menu:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE menu by ID - OPTIMIZED
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await connectMongooseDb();

    // ✅ OPTIMIZATION: Select only needed fields in response
    const deletedMenu = await Menu.findByIdAndDelete(id)
      .select('title restaurantId');

    if (!deletedMenu) {
      return NextResponse.json(
        { success: false, message: "Menu not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Menu deleted successfully",
        deletedMenu: {
          title: deletedMenu.title,
          restaurantId: deletedMenu.restaurantId
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting menu:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}