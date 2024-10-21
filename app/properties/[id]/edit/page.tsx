import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import React from "react";

interface EditPropertyPageProps {
  params: {
    id: string;
  };
}

const EditPropertyPage: React.FC<EditPropertyPageProps> = async ({
  params,
}: EditPropertyPageProps) => {
  await connectDB();
  const propertyDoc = await Property.findById(params.id).lean();

  if (!propertyDoc) {
    return <div>Property not found</div>;
  }

  const property = convertToSerializableObject(propertyDoc);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPropertyPage;
