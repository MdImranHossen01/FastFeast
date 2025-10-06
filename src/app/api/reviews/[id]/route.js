import { collectionsName, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {

    try {
        const param = await params;

        // Connect reviews collection
        const reviewsCollection = dbConnect(collectionsName.reviewsCollection);
        const filter = { _id: new ObjectId(param?.id) }
        const reviews = await reviewsCollection
            .findOne(
                { _id: new ObjectId(param?.id) }
            );

        return Response.json(reviews, { status: 200 });
    } catch (error) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}

export async function PATCH(req, { params }) {
    try {
        const param = await params;
        const updatedData = await req.json();
        // console.log(updatedData)
        
        // Connect reviews collection
        const reviewsCollection = dbConnect(collectionsName.reviewsCollection);
        const result = await reviewsCollection
            .updateOne(
                { _id: new ObjectId(param?.id) },
                {
                    $set: {
                        ...updatedData
                    }
                },
                { upsert: true }
            );

        // return Response.json(reviews, { status: 200 });
        return Response.json(result);
    } catch (error) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}
