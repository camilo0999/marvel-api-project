import React, { useState } from "react";
import "../styles/Carrusel.css";

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiByPu7gLlbIDAo7wcF29pQ23PQeHszElqpW9eMpQA174zuIPP6gRPaFmm4qnotdLIfNqwR2VzU8ugsQ2mp_IY9ooalSTciOJ64MsNQVHjlBHaH6IwPMaVFo-pkgmDSNKdKs9f1kpfGt2Ih/s1600/Marvel10AniversarioBannerLatino.png",
    "https://collider.com/wp-content/uploads/avengers-character-poster-banner.jpeg",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/d611b26e-22f5-460f-a60a-eb4fbe6df848.__CR0,0,970,300_PT0_SX970_V1___.jpg",
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carrusel-container">
      <div className="carrusel">
        <button className="carrusel-button prev" onClick={handlePrev}>
          Anterior
        </button>
        <div className="carrusel-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen ${index + 1}`}
              className="carrusel-image"
            />
          ))}
        </div>
        <button className="carrusel-button next" onClick={handleNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Carrusel;
