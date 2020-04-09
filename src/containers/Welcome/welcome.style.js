import styled from 'styled-components';
import { media } from '../../utils';

export const WelcomeWrapper = styled.section`
  width: 100%;
  background-image: url('img/background-pattern.svg');
  background-repeat: repeat;
  padding: 50px 0;
  display: flex;
  background-color: #c5eaf5;

  h3 {
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
`;

export const WelcomeCard = styled.div`
  background-color: #fff;
  margin: 30px auto;

  flex-direction: row !important;
  padding: 50px 0 !important;

  align-items: center;

  max-width: 80%;
  height: 80%;
  margin: auto;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    margin-left: 8px;
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
