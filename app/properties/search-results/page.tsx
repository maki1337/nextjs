import connectDB from "@/config/database";
import Property from "@/models/Property";
import {
  convertToSerializableObject,
  convertToSerializableObjects,
} from "@/utils/convertToObject";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { FaArrowCircleLeft } from "react-icons/fa";

interface SearchResultsPageProps {
  searchParams: {
    location?: string;
    propertyType?: string;
  };
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();

  const locationPattern = new RegExp(location || "", "i");
  let query: any = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipCode": locationPattern },
    ],
  };

  if (propertyType !== "All") {
    const typePattern = new RegExp(propertyType || "", "i");
    query.type = typePattern;
  }

  try {
    // Query for properties
    const propertiesQueryResutls = await Property.find(query).lean();

    // Ensure propertiesQueryResutls is an array or fallback to an empty array
    const properties =
      convertToSerializableObjects(propertiesQueryResutls) || [];

    if (!Array.isArray(properties)) {
      console.error("Expected properties to be an array, but got:", properties);
      throw new Error("Data returned from the database is not an array.");
    }

    return (
      <>
        <section className="bg-blue-700 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
            <PropertySearchForm />
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href={`/properties`}
              className="flex items-center text-blue-500 hover:underline mb-3"
            >
              <FaArrowCircleLeft className="mr-2 mb-1" />
              Back to properties
            </Link>

            <h1 className="text-2xl mb-4">Search results</h1>
            {properties.length === 0 ? (
              <p>No properties found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property: any) => (
                  <PropertyCard
                    key={property._id.toString()}
                    property={property}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    return (
      <>
        <section className="bg-blue-700 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
            <PropertySearchForm />
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href={`/properties`}
              className="flex items-center text-blue-500 hover:underline mb-3"
            >
              <FaArrowCircleLeft className="mr-2 mb-1" />
              Back to properties
            </Link>

            <h1 className="text-2xl mb-4">Search results</h1>
            <p>
              There was an error loading the properties. Please try again later.
            </p>
          </div>
        </section>
      </>
    );
  }
};

export default SearchResultsPage;
