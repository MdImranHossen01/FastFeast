// src/app/api/debug/check-id/route.js
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json(
        { success: false, message: 'Missing id parameter' },
        { status: 400 }
      );
    }
    
    return Response.json({
      success: true,
      id,
      type: typeof id,
      isValid: ObjectId.isValid(id),
      length: id.length
    });
  } catch (error) {
    console.error('Debug error:', error);
    return Response.json(
      { success: false, message: 'Debug error', error: error.message },
      { status: 500 }
    );
  }
}