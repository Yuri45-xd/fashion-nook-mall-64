
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "../data/products";
import { Link } from "react-router-dom";

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden h-48 md:h-64 lg:h-80">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.url}
              className="w-full h-full flex-shrink-0"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-5 h-5 text-flipkart-blue" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
        onClick={nextSlide}
      >
        <ChevronRight className="w-5 h-5 text-flipkart-blue" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-flipkart-blue" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
