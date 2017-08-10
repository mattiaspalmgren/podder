import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Svg = (props) => {
  const { type, color, size } = props;
  const style = classNames(
        'svg-icon', {
          'svg-icon--large': size === 'large',
        });

  return (
    <svg className={style} fill={color}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

Svg.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
};


export default Svg;
