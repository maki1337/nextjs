"use client";

import { Property } from "@/models/Property";
import React from "react";
import { FaShare } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

interface PropertyProps {
  property: Property;
}

const ShareButtons: React.FC<PropertyProps> = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton url={shareUrl} hashtag="#RealEstate">
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} title={property.name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton url={shareUrl} title={property.name}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <EmailShareButton url={shareUrl} subject={property.name}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
