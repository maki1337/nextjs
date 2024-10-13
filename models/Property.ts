import { Schema, model, models, Model, Types } from "mongoose";

// Define the Location interface
interface Location {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

// Define the Rates interface
interface Rates {
  nightly?: number;
  weekly?: number;
  monthly?: number;
}

// Define the SellerInfo interface
interface SellerInfo {
  name: string;
  email: string;
  phone: string;
}

// Define the Property Interface (Add _id here)
export interface Property {
  _id?: Types.ObjectId; // _id is optional and can be ObjectId
  owner: Types.ObjectId; // User is referenced by ObjectId
  name: string;
  type: string;
  description?: string;
  location: Location;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: string[];
  is_featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Property Document Interface extends Document (which includes _id)
export interface PropertyDocument extends Property {}

// Mongoose Model for Property
const PropertySchema: Schema<PropertyDocument> = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Export the Mongoose model with the correct typing
const Property: Model<PropertyDocument> =
  models.Property || model<PropertyDocument>("Property", PropertySchema);

export default Property;
