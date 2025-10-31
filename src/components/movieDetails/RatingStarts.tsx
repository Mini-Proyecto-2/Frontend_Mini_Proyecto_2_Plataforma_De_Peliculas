import React from 'react';
import { StarIcon } from 'lucide-react';

type RatingStarsProps = {
  id: number;
  rating?: number;
};

const RatingStars: React.FC<RatingStarsProps> = ({ id, rating }) => {
  const ratingNumber = () => {
    if (!rating || rating < 0) return 0;
    if (rating > 5) return 5;
    return rating;
  }

  console.log(id);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`text-[#FFD60A] ${ratingNumber() >= i + 1 ? 'fill-current' : ''}`}
          onMouseEnter={() => {
            const starsToLight = document.querySelectorAll('.filled');
            starsToLight.forEach((star, index) => {
              if (index < i) {
                star.classList.add('fill-current');
              } else {
                star.classList.remove('fill-current');
              }
            });
          }}
          onMouseLeave={() => {
            const starsToLight = document.querySelectorAll('.filled');
            starsToLight.forEach((star) => {
              star.classList.remove('fill-current');
            });
          }}
        />
      );
    }
    return stars;
  };

  return (
    <section className="flex gap-2 items-end">
      <div className="flex gap-1 pb-0.5">{renderStars()}</div>
      <p className="text-sm text-gray-300">{ratingNumber()}/5</p>
    </section>
  );
};

export default RatingStars;
