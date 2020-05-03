import styled from 'styled-components';
import { media } from '../../utils';

export const WelcomeWrapper = styled.section`
  height: calc(100% - 60px);
  position: absolute;
  width: 100%;
  background-image: url('img/background-pattern.svg');
  background-repeat: repeat;
  display: flex;
  background-color: #c5eaf5;
`;

export const WelcomeContent = styled.section`
  width: 100%;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  h3.welcome-title {
    margin-top: 0;
    color: #666666;
    span {
      font-weight: bold;
      color: #52b5dd;
    }
    a {
      font-size: 1.9rem;
    }
  }

  h4.tutorial-title {
    text-align: center;
    margin: 0 0 10px;
    color: #666666;
    text-transform: none;
  }

  p.tutorial-content {

  }
`;

export const WelcomeCard = styled.div`
  background-color: #fff;
  margin: 20px auto;

  flex-direction: row !important;
  padding: 50px 0 !important;

  align-items: center;

  max-width: 80%;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    margin-left: 8px;
  }

  &.tutorial {
    position: relative;
    display: initial;
    padding: 20px 15px !important;

    img {
      width: 7em;
      transform: rotate(-35deg);
      position: absolute;
      right: 6em;
      user-select: none;
    }
  }

  &.video {
    display: flex;
    padding: 0 !important;
    background: none;
    box-shadow: none;

    video {
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      margin: auto;
    }
  }
`;

export const WelcomeLogo = styled.div`
  width: 50%;

  img {
    width: 60%;
    display: block;
    margin: 0 auto;
  }
`;

export const WelcomeProfile = styled.div`
  height: 100%;
  text-align: center;
  position: relative;

  display: flex;
  flex-direction: column;

  padding: .5em;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  h1,
  img {
    margin: 0 10px;
    display: inline-block;
    vertical-align: middle;
  }

  ${media.tablet`
    width: 50%;
    &:after {
      display: block;
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      background-color:#D0D0D0;
      top:0;
    }
  `}
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 0px;
  }
`;

export const ImageContainer = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : '#cccccc')};
  background-size: cover;
  border-radius: 50%;
  width: 128px;
  height: 128px;
`;

export const WelcomeName = styled.span`
  overflow-wrap: break-word;
  word-break: break-word;
`;
