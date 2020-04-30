import styled from 'styled-components';

export const Gradient = styled.div`
  background-color: #c5eaf5;
  background-repeat: no-repeat;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('img/background-pattern.svg');
  }
`;
