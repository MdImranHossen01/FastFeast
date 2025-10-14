import { collectionsName, dbConnect } from "@/lib/dbConnect";

export async function GET(req) {
    try {
        const request = await req

        const { searchParams } = new URL(request?.url);
        //http://localhost:3000/admin-dashboard/manage-reviews?search=All-reviews&ratings=All-ratings
        const search = searchParams.get("search");
        const rating = searchParams.get("ratings");

        const filter = {}


        const ratingsValue = parseInt(rating);
        if (!isNaN(ratingsValue) && ratingsValue >= 1 && ratingsValue <= 5) {
            filter.rating = ratingsValue;
        }

        const searchStrings = ["All-reviews", "Rider", "Restaurant", "Food"];
        if (searchStrings.includes(search)) {
            filter.targetType = search;
        }
        // console.log({ search, rating });

        // Connect reviews collection

        const reviewsCollection = await dbConnect(collectionsName.reviewsCollection);
        const reviews = await reviewsCollection.find(filter).toArray();

        return Response.json(reviews, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}
export async function POST(req) {
    try {
        const review = await req.json();

        const reviewsCollection = await dbConnect(collectionsName.reviewsCollection);
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
export async function DELETE(req) {
    try {
        // const review = await req.json();

        // const reviewsCollection = await dbConnect(collectionsName.reviewsCollection);
        // const result = await reviewsCollection.deleteMany({});

        // return Response.json(
        //     { ...result },
        //     { status: 201 }
        // )
    } catch (error) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}