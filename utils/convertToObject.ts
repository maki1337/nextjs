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
