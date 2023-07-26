import React, { useState, useEffect } from 'react';
import frame1 from '../assets/fancy-progressbar/walk-1.png';
import frame2 from '../assets/fancy-progressbar/walk-2.png';
import frame3 from '../assets/fancy-progressbar/walk-3.png';
import frame4 from '../assets/fancy-progressbar/walk-4.png';
import frame5 from '../assets/fancy-progressbar/walk-5.png';
import frame6 from '../assets/fancy-progressbar/walk-6.png';
import frame7 from '../assets/fancy-progressbar/walk-7.png';

const frames = [frame1, frame2, frame3, frame4, frame5, frame6, frame7];

const ProgressBar = ({ totalSteps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) =>
        prevStep < totalSteps ? prevStep + 1 : totalSteps
      );
    }, 1000); // Adjust the interval (in milliseconds) to control the animation speed.

    return () => clearInterval(interval);
  }, [totalSteps]);

  const renderChild = () => {
    const frameIndex = Math.min(currentStep, frames.length - 1); // Ensure we don't exceed the number of frames.
    const frame = frames[frameIndex];
    return (
      <img
        src={frame}
        alt={`Child - Step ${currentStep + 1}`}
        style={{
          width: '10%',
          height: 'auto',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />
    );
  };

  return (
    <div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="child-container">{renderChild()}</div>
    </div>
  );
};

export default ProgressBar;
