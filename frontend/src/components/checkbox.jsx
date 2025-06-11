import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/lottieflow-chekbox-08-8E51FF-linear.json';

export default function Checkbox({ isChecked }) {
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      if (isChecked) {
        lottieRef.current.play(); // Play animation to checked state
      } else {
        lottieRef.current.goToAndStop(0, true); // Reset to start frame (unchecked)
      }
    }
  }, [isChecked]);

  return (
    <div style={{ width: 20, height: 20 }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
      />
    </div>
  );
}
