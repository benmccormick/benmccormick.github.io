import PropTypes from 'prop-types';
import React from 'react';
import InlineSVG from 'svg-inline-react';
import glamorous from 'glamorous';

const iconContainerFactory = color =>
  glamorous.span({
    display: 'inline-block',
    width: '0.75em',
    marginRight: '0.5em',
    '& *': {
      fill: color,
    },
    '& > i': {
      height: '30px',
    },
  });

const Icon = ({ icon, color }) => {
  let IconContainer = iconContainerFactory(color);
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
