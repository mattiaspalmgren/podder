import React from 'react';


const Svg = (props) => {
  const { type, color } = props;

  return (
    <svg className="svg-icon svg-icon--large" fill={color}> 
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Svg;