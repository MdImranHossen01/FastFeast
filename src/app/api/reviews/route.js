// src/app/api/reviews/route.js
import { NextResponse } from 'next/server';
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function POST(request) {
  console.log('=== REVIEW SUBMISSION STARTED ===');

  try {
    const reviewData = await request.json();
    const { orderId, customerEmail, riderId, riderReview, itemReviews } = reviewData;

    console.log('Received review data:', {
      orderId,
      customerEmail,
      riderId,
      riderReview,
      itemReviewsCount: itemReviews?.length || 0
    });
    // Validation
    if (!orderId || !customerEmail) {
      console.log('Validation failed: Missing orderId or customerEmail');
      return NextResponse.json(
        { success: false, message: 'Order ID and customer email are required' },
        { status: 400 }
      );
    }

    const reviewsCollection = await getCollection('reviews');

    // Check if a review already exists for this order
    const existingReview = await reviewsCollection.findOne({ orderId });
    if (existingReview) {
      console.log('Review already exists for order:', orderId);
      return NextResponse.json(
        { success: false, message: 'You have already reviewed this order' },
        { status: 409 }
      );
    }

    // Create the main review document
    const newReview = {
      orderId,
      customerEmail,
      riderId: riderId || null,
      riderReview: riderReview || null,
      itemReviews: itemReviews || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Inserting review document:', newReview);

    // Insert the review into the reviews collection
    const result = await reviewsCollection.insertOne(newReview);
    console.log('Review inserted successfully, ID:', result.insertedId);

    // --- Update Rider's Average Rating ---
    if (riderId && riderReview && riderReview.rating > 0) {
      try {
        console.log('Updating rider rating for:', riderId);
        const usersCollection = await getCollection('users');

        // Fetch all rider reviews to calculate the new average
        const allRiderReviews = await reviewsCollection
          .find({
            riderId: riderId,
            'riderReview.rating': { $gt: 0 }
          })
          .toArray();

        console.log(`Found ${allRiderReviews.length} rider reviews`);

        if (allRiderReviews.length > 0) {
          const totalRating = allRiderReviews.reduce((sum, review) => sum + review.riderReview.rating, 0);
          const averageRating = totalRating / allRiderReviews.length;
          const roundedRating = parseFloat(averageRating.toFixed(1));

          console.log(`Calculated rider average: ${roundedRating} from ${totalRating} / ${allRiderReviews.length}`);

          // Update the rider document with the new average
          const riderUpdateResult = await usersCollection.updateOne(
            { _id: new ObjectId(riderId) },
            { $set: { rating: roundedRating } }
          );

          console.log('Rider rating update result:', riderUpdateResult);
        }
      } catch (riderError) {
        console.error('Error updating rider rating:', riderError);
        // Don't fail the whole request if rider update fails
      }
    } else {
      console.log('Skipping rider rating update - no rider review data');
    }

    // --- Update Each Menu Item's Average Rating ---
    if (itemReviews && itemReviews.length > 0) {
      console.log(`Processing ${itemReviews.length} item reviews`);
      const menuCollection = await getCollection('menu');

      for (const itemReview of itemReviews) {
        if (itemReview.rating > 0 && itemReview.itemId) {
          try {
            console.log(`Updating rating for menu item: ${itemReview.itemId}`);

            // Safely handle ObjectId conversion
            let itemObjectId;
            try {
              itemObjectId = new ObjectId(itemReview.itemId);
            } catch (e) {
              console.warn(`Invalid ObjectId for menu item: ${itemReview.itemId}, skipping...`);
              continue; // Skip this item if ID is invalid
            }

            // Fetch all item reviews for this specific menu item
            const allItemReviews = await reviewsCollection
              .find({
                'itemReviews.itemId': itemReview.itemId,
                'itemReviews.rating': { $gt: 0 }
              })
              .toArray();

            console.log(`Found ${allItemReviews.length} reviews for item ${itemReview.itemId}`);

            if (allItemReviews.length > 0) {
              let totalRating = 0;
              let reviewCount = 0;

              allItemReviews.forEach(reviewDoc => {
                const foundItemReview = reviewDoc.itemReviews.find(r => r.itemId === itemReview.itemId);
                if (foundItemReview && foundItemReview.rating > 0) {
                  totalRating += foundItemReview.rating;
                  reviewCount++;
                }
              });

              if (reviewCount > 0) {
                const averageRating = totalRating / reviewCount;
                const roundedRating = parseFloat(averageRating.toFixed(1));

                console.log(`Item ${itemReview.itemId}: ${totalRating} / ${reviewCount} = ${roundedRating}`);

                // Update the menu item document with the new average
                const menuUpdateResult = await menuCollection.updateOne(
                  { _id: itemObjectId },
                  { $set: { rating: roundedRating } }
                );

                console.log(`Menu item ${itemReview.itemId} update result:`, menuUpdateResult);
              } else {
                console.log(`No valid ratings found for item ${itemReview.itemId}`);
              }
            } else {
              console.log(`No reviews found for item ${itemReview.itemId}`);
            }
          } catch (itemError) {
            console.error(`Error updating menu item ${itemReview.itemId}:`, itemError);
            // Continue with other items even if one fails
          }
        } else {
          console.log(`Skipping item ${itemReview.itemId} - no rating or invalid itemId`);
        }
      }
    } else {
      console.log('No item reviews to process');
    }

    console.log('=== REVIEW SUBMISSION COMPLETED SUCCESSFULLY ===');

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      reviewId: result.insertedId
    }, { status: 201 });

  } catch (error) {
    console.error('=== REVIEW SUBMISSION FAILED ===');
    console.error('Error details:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit review',
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const riderId = searchParams.get('riderId');
    const itemId = searchParams.get('itemId');
    const customerEmail = searchParams.get('customerEmail');

    console.log('Fetching reviews with params:', { orderId, riderId, itemId, customerEmail });

    // Build query
    let query = {};

    if (orderId) query.orderId = orderId;
    if (riderId) query.riderId = riderId;
    if (customerEmail) query.customerEmail = customerEmail;
    if (itemId) query['itemReviews.itemId'] = itemId;

    const reviewsCollection = await getCollection('reviews');
    const reviews = await reviewsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const serializedReviews = serializeDocument(reviews);

    console.log(`Found ${reviews.length} reviews`);

    return NextResponse.json({
      success: true,
      reviews: serializedReviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reviews', error: error.message }, 
      { status: 500 }
    );
  }
}