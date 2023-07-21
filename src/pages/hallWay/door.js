import { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import Doors from '../../assets/door.json';

const Door = (props) => {
  const { openDoor } = props;
  console.log(openDoor);
  const defaultOptions = {
    loop: false,
    autoplay: openDoor,
    animationData: Doors,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};
export default Door;
