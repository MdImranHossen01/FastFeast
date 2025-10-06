import { collectionsName, dbConnect } from "@/lib/dbConnect";

export async function GET() {
    try {
        // Connect reviews collection
        const reviewsCollection = dbConnect(collectionsName.reviewsCollection);
        const reviews = await reviewsCollection.find().toArray();

        return Response.json(reviews, { status: 200 });
    } catch (error) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}
export async function POST(req) {
    try {
        const review = await req.json();

        const reviewsCollection = dbConnect(collectionsName.reviewsCollection);
        const result = await reviewsCollection.insertOne(review);

        return Response.json(
            { ...result },
            { status: 201 }
        )
    } catch (error) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}