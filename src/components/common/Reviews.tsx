import { ReviewType } from "@/types/products.type";
import Image from "next/image";
import React from "react";

const reviewsData = [
  {
    id: "1",
    customer: {
      display_name: "Ahmed Ali",
      avatar_url: "/avatars/user1.png",
    },
    rating: 5,
    heading: "Amazing product!",
    body: "I loved the quality and fast delivery. Highly recommended.",
    media: [
      { id: "m1", url: "/reviews/media1.png" },
      { id: "m2", url: "/reviews/media2.png" },
    ],
  },
  {
    id: "2",
    customer: {
      display_name: "Sara Mohamed",
      avatar_url: "/avatars/user2.png",
    },
    rating: 4,
    heading: "Good but needs improvement",
    body: "The product is good, but the packaging was a bit weak.",
    media: [],
  },
  {
    id: "3",
    customer: {
      display_name: "Khaled Hassan",
      avatar_url: "/avatars/user3.png",
    },
    rating: 5,
    heading: "Excellent experience",
    body: "Everything was perfect. I will buy again.",
    media: [{ id: "m3", url: "/reviews/media3.png" }],
  },
];

export default function Reviews() {
  return reviewsData.map((review: ReviewType) => {
    const {
      id,
      customer: { display_name, avatar_url },
      heading,
      body,
      media,
    } = review;

    return (
      <div className="flex flex-col gap-4" key={id}>
        {/* User */}
        <div className="flex items-center gap-4 font-medium">
          <Image
            src={avatar_url || "/avatars/default.png"}
            alt={display_name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span>{display_name}</span>
        </div>

        {/* Stars */}
        <div className="flex gap-2">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Image src="/star.png" alt="" key={index} width={16} height={16} />
          ))}
        </div>

        {/* Desc */}
        {heading && <p>{heading}</p>}
        {body && <p>{body}</p>}

        <div className="flex gap-2 flex-wrap">
          {media && media.length > 0
            ? media.map((item) => (
                <Image
                  src={item.url}
                  key={item.id}
                  alt=""
                  width={100}
                  height={50}
                  className="object-cover"
                />
              ))
            : ""}
        </div>
      </div>
    );
  });
}
