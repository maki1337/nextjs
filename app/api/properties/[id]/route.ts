import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

interface Params {
  id: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("Somethnig went wrong", { status: 500 });
  }
};
