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
    isSpecialOffer: {
      type: Boolean,
      default: false,
    },
    offerPrice: {
      type: Number,
      required: true,
      default: function() {
        return this.price;
      }
    },
    discountRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isCombo: {
      type: Boolean,
      default: false,
    },
    cuisine: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    dietaryTags: [
      {
        type: String,
        required: true,
      },
    ],
    ingredients: [
      {
        type: String,
      },
    ],
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  {
    timestamps: true, // automatically manage createdAt and updatedAt fields
    versionKey: false, // disable the __v field
  }
);

// Pre-save middleware to calculate offerPrice based on discountRate
menuSchema.pre('save', function(next) {
  if (this.isSpecialOffer && this.discountRate > 0) {
    this.offerPrice = this.price - (this.price * this.discountRate) / 100;
  } else {
    this.offerPrice = this.price;
    this.discountRate = 0;
  }
  next();
});

if (mongoose.models.Menu) {
  mongoose.deleteModel("Menu");
}

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;