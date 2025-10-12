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
        return this.price;
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware to calculate offerPrice based on discountRate
menuSchema.pre("save", function (next) {
  if (this.isSpecialOffer && this.discountRate > 0) {
    this.offerPrice = this.price - (this.price * this.discountRate) / 100;
  } else {
    this.offerPrice = this.price;
    this.discountRate = 0;
  }
  next();
});

// Prevent model overwrite upon initial compile
if (mongoose.models.Menu) {
  mongoose.deleteModel("Menu");
}

// Create and export the Menu model
const Menu = mongoose.model("Menu", menuSchema);

// Export the Menu model
export default Menu;
