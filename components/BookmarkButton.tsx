"use client";

import { Property } from "@/models/Property";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

interface PropertyProps {
  property: Property;
}

const BookmarkButton: React.FC<PropertyProps> = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const userId = session?.user.id;

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a listing.");
      return;
    }

    if (!property._id) {
      toast.error("Property does not exsist!");
      return;
    }

    bookmarkProperty(property._id.toString()).then((resp: any) => {
      if (resp.error) toast.error(resp.message);
      setIsBookmarked(resp.isBookmarked);
      toast.success(resp.message);
    });
  };

  // init logic
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    if (!property._id) {
      toast.error("Property does not exsist!");
      return;
    }

    checkBookmarkStatus(property._id?.toString()).then((resp: any) => {
      if (resp.error) toast.error(resp.error);

      if (resp.isBookmarked) setIsBookmarked(resp.isBookmarked);
      setIsLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  if (isLoading) {
    return null;
  }

  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;
