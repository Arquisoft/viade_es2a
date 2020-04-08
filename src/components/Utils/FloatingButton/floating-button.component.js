import React from 'react';

import { FloatingButtonWrapper } from './floating-button.style';

type Props = {
  background: String,
  hoverBackground: String,
  activeBackground: String,
  foreground: String,
  onClick: Function,
  text: String
};

const FloatingButton = (props: Props) => {
  const { background, hoverBackground, activeBackground, foreground, onClick, text } = props;

  return (
    <FloatingButtonWrapper
      onClick={onClick}
      background={background}
      hoverBackground={hoverBackground}
      activeBackground={activeBackground}
      foreground={foreground}>
      {text}
    </FloatingButtonWrapper>
  );
};

export default FloatingButton;
