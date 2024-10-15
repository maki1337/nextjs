"use client";
import { Property } from "@/models/Property";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProfilePropertiesProps {
  properties: Record<string, any>[];
}

const ProfileProperties: React.FC<ProfilePropertiesProps> = ({
  properties: initialProperties,
}) => {
  const [properties, setProperties] = useState(initialProperties);

  return properties.map((property, index) => (
    <div key={index} className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          width={1000}
          height={400}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street}, {property.location.city}{" "}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <a
          href="/add-property.html"
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </a>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;