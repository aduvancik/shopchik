import React, { useState, useMemo } from "react";
//style
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../styles/slider.scss";
//
import { Arrow } from "./Arrow";

export default function Slidere({ listPhotoSrc }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderKey, setSliderKey] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const keys = useMemo(() => listPhotoSrc.map((_, index) => index), [listPhotoSrc]);

  const reloadSlider = () => {
    setSliderKey((prevKey) => prevKey + 1);
    console.log(sliderKey);
  };

  return (
    <div className="slider__container">
      <div className="navigation-wrapper">
        <div key={keys[0] + keys.length} ref={sliderRef} className="keen-slider">
          {listPhotoSrc.map((src, index) => (
            <img
              key={keys[index]}
              src={src}
              alt={src}
              className={`keen-slider__slide number-slide${index}`}
            />
          ))}
        </div>
        {loaded && (listPhotoSrc.length > 1) && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (listPhotoSrc.length > 1) && (
        <div className="dots">
          {keys.map((idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={"dot" + (currentSlide === idx ? " active" : "")}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
