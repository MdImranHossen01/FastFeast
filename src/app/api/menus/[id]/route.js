import connectMongooseDb from "@/lib/mongoose";
import Menu from "@/models/menu.model";
import { NextResponse } from "next/server";

// GET menu by ID
export async function GET(req, { params }) {
  try {
    // Extract menu ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Fetch menu by ID
    const menu = await Menu.findById(id);

    // Handle case where menu is not found
    if (!menu) {
      return NextResponse.json(
        { success: false, message: "Menu not found" },
        { status: 404 }
      );
    }

    // Return the found menu in the expected format
    return NextResponse.json(
      { 
        success: true, 
        menuItem: menu 
      }, 
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH (update) menu by ID
export async function PATCH(req, { params }) {
  try {
    // Extract menu ID from params
    const { id } = await params;

    // Parse the request body to get update data
    const updateData = await req.json();

    // Ensure DB connection
    await connectMongooseDb();

    // Update the menu and return the updated document
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" }
    );

    // Handle case where menu is not found
    if (!updatedMenu) {
      return NextResponse.json(
        { success: false, message: "Menu not found" },
        { status: 404 }
      );
    }

    // Return the updated menu
    return NextResponse.json(
      { 
        success: true, 
        menuItem: updatedMenu 
      }, 
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error updating menu:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE menu by ID
export async function DELETE(req, { params }) {
  try {
    // Extract menu ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Delete the menu by ID
    const deletedMenu = await Menu.findByIdAndDelete(id);

    // Handle case where menu is not found
    if (!deletedMenu) {
      return NextResponse.json(
        { success: false, message: "Menu not found" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Menu deleted successfully",
        deletedMenu,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error deleting menu:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}