type ImageSwiperProps = {
  images: string[];
  selectedImage: number;
  setSelectedImage: (index: number) => void;
};

export default function ImageSwiper({
  images,
  selectedImage,
  setSelectedImage,
}: ImageSwiperProps) {
  const handleNext = () => {
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const handlePrevious = () => {
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main image */}
      <div className="relative">
        <img
          src={images[selectedImage]}
          alt={`Product ${selectedImage + 1}`}
          className="w-full cursor-pointer rounded-none md:rounded-2xl"
        />

        {/* Previous button */}
        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md hover:text-[#FF7D1A]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-black hover:text-[#FF7D1A] hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md  hover:text-[#FF7D1A]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-black hover:text-[#FF7D1A] hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
