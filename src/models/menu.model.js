import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
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
        required: true,
      },
    ],
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

if (mongoose.models.Menu) {
  mongoose.deleteModel("Menu");
}

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
