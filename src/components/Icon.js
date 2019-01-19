import PropTypes from 'prop-types';
import React from 'react';
import InlineSVG from 'svg-inline-react';
import styled from '@emotion/styled';

const iconContainerFactory = (color, dimensions) =>
  styled('span')({
    display: 'block',
    width: dimensions + 'rem',
    height: dimensions + 'rem',
    marginRight: '0.5rem',
    '& *': {
      fill: color,
    },
    '& > i': {
      height: dimensions * 0.2 + 'rem',
    },
  });

const Icon = ({ icon, color, dimensions = 2 }) => {
  let IconContainer = iconContainerFactory(color, dimensions);
  return (
    <IconContainer color={color}>
      <InlineSVG src={icon} />
    </IconContainer>
  );
};
Icon.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Icon;
