import React from 'react';

import { FloatingButtonWrapper } from './floating-button.style';

type Props = {
  background: String,
  hoverBackground: String,
  activeBackground: String,
  foreground: String,
  onClick: Function,
  text: String,
  fontSize?: String
};

const FloatingButton = (props: Props) => {
  const { style, background, hoverBackground, activeBackground, foreground, onClick, text, fontSize } = props;

  return (
    <FloatingButtonWrapper
      style={style}
      onClick={onClick}
      fontSize={fontSize}
      background={background}
      hoverBackground={hoverBackground}
      activeBackground={activeBackground}
      foreground={foreground}>
      {text}
    </FloatingButtonWrapper>
  );
};

export default FloatingButton;
