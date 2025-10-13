import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    dietaryTags: [
      {
        type: String,
        required: true,
      },
    ],
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    isCombo: {
      type: Boolean,
      default: false,
    },
    isSpecialOffer: {
      type: Boolean,
      default: false,
    },
    discountRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    offerPrice: {
      type: Number,
      default: function () {
        return this.price - (this.price * this.discountRate) / 100;
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Prevent model overwrite upon initial compile
if (mongoose.models.Menu) {
  mongoose.deleteModel("Menu");
}

// Create and export the Menu model
const Menu = mongoose.model("Menu", menuSchema);

// Export the Menu model
export default Menu;
