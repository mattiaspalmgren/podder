import React from 'react';
import PropTypes from 'prop-types';

const Svg = (props) => {
  const { type, color } = props;

  return (
    <svg className="svg-icon svg-icon--large" fill={color}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

Svg.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};


export default Svg;
