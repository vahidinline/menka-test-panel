//reusable button component

import React from 'react';

const MenkaButton = ({ label, type, ...rest }) => {
  return (
    <button {...rest} className="btn btn-primary">
      {label}
    </button>
  );
};

export default MenkaButton;
