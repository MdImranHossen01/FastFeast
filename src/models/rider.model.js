import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ["Bicycle", "Motorcycle", "Car"],
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  drivingLicenseNumber: {
    type: String,
    required: true,
  },
});

const bankDetailsSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
});

const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  NID: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  workingArea: {
    type: String,
    required: true,
  },
  vehicle: {
    type: vehicleSchema,
    required: true,
  },
  bankDetails: {
    type: bankDetailsSchema,
    required: true,
  },
  availability: {
    type: [String],
    enum: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "deactive"],
    default: "active",
  },
});

const Rider = mongoose.models.Rider || mongoose.model("Rider", riderSchema);

export default Rider;
