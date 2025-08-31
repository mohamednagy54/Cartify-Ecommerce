import { Star, StarHalf, StarOff } from "lucide-react";
import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingProps {
  rating: number;
  reviewsCount?: number;
}

export default function RatingStars({ rating, reviewsCount }: RatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex">{stars}</div>
      <span className="text-sm text-gray-500">{rating.toFixed(1)}</span>
      {reviewsCount && (
        <span className="text-sm text-gray-400">({reviewsCount})</span>
      )}
    </div>
  );
}
