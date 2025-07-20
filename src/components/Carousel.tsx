import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(130);
  const [marginRight] = useState(10);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);

  const offset = currentIndex * (itemWidth + marginRight);

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(currentIndex - step, 0));
    }
  }

  function handleNext() {
    if (currentIndex < images.length - frameSize) {
      setCurrentIndex(Math.min(currentIndex + step, images.length - frameSize));
    }
  }

  function onChangeStep(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);

    if (val > 0) {
      setStep(val);
    }
  }

  function onChangeItemWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);

    if (val > 0) {
      setItemWidth(val);
    }
  }

  function onChangeFrameSize(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);

    if (val > 0 && val <= images.length) {
      setFrameSize(val);
    }

    setCurrentIndex(0);
  }

  return (
    <>
      <h1 data-cy="title">Carousel</h1>

      <label htmlFor="itemId">Image width</label>
      <input
        id="itemId"
        type="number"
        value={itemWidth}
        onChange={onChangeItemWidth}
      />

      <label htmlFor="frameId">Frame size</label>
      <input
        id="frameId"
        type="number"
        value={frameSize}
        onChange={onChangeFrameSize}
      />

      <label htmlFor="stepId">Step</label>
      <input id="stepId" type="number" value={step} onChange={onChangeStep} />

      <div
        className="Carousel__wrapper"
        style={{
          width: frameSize * (itemWidth + marginRight) - marginRight,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {images.map((src, index) => (
            <li key={src} style={{ width: itemWidth, marginRight }}>
              <img
                src={src}
                alt={`Image ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          data-cy="prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={currentIndex >= images.length - frameSize}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
