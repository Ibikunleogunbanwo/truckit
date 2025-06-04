import React from "react";

const FullStar = () => (
  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.382-2.455a1 1 0 00-1.176 0l-3.382 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.97a1 1 0 00-.364-1.118L2.05 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.951-.69l1.285-3.97z" />
  </svg>
);

const HalfStar = ({ index }) => (
    <svg className="w-5 h-5 text-teal-500" viewBox="0 0 20 20">
      <defs>
        <linearGradient id={`half-${index}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#half-${index})`}
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.382-2.455a1 1 0 00-1.176 0l-3.382 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.97a1 1 0 00-.364-1.118L2.05 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.951-.69l1.285-3.97z"
      />
    </svg>
  );

const EmptyStar = () => (
  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.382-2.455a1 1 0 00-1.176 0l-3.382 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.97a1 1 0 00-.364-1.118L2.05 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.951-.69l1.285-3.97z" />
  </svg>
);

const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
  
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FullStar key={i} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<HalfStar key={i} index={i} />);
      } else {
        stars.push(<EmptyStar key={i} />);
      }
    }
  
    return <div className="flex space-x-1 text-teal-500">{stars}</div>;
  };

export default StarRating;