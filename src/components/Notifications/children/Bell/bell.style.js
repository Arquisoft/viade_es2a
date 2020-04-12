import styled from 'styled-components';

export const BellIcon = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 0;

  &:active,
  &:focus,
  &:hover,
  &.active {
    outline: none;
  }
  
  &:hover {
    background: #e7faff;
  }

  &:active,
  &.active {
    background: #c3eaf4;
  }

  .icon {
    width: 18px;
    height: 18px;
    position: relative;
  }
`;
