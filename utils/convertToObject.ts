export function convertToSerializableObject(leanDocument: Record<string, any>) {
  // Use the Mongoose toObject method to convert to a plain object if it exists
  const serializableObject = leanDocument.toObject
    ? leanDocument.toObject()
    : { ...leanDocument };

  for (const key of Object.keys(serializableObject)) {
    const value = serializableObject[key];

    // Convert subdocuments and ObjectId to strings
    if (value && typeof value.toJSON === "function") {
      serializableObject[key] = value.toString();
    }
  }

  return serializableObject;
}

export function convertToSerializableObjects(
  leanDocument: Record<string, any> | Record<string, any>[]
) {
  // Check if the input is an array and process each item individually
  if (Array.isArray(leanDocument)) {
    return leanDocument.map((doc) => convertToSerializableObject(doc));
  }

  // If it's a single document, proceed with converting it to a plain object
  const serializableObject = leanDocument.toObject
    ? leanDocument.toObject()
    : { ...leanDocument };

  for (const key of Object.keys(serializableObject)) {
    const value = serializableObject[key];

    // Convert subdocuments and ObjectId to strings
    if (value && typeof value.toJSON === "function") {
      serializableObject[key] = value.toString();
    }
  }

  return serializableObject;
}
