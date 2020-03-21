import styled from 'styled-components';

export const FriendsWrapper = styled.section`
  width: 100%;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 50px 0;
`;

export const FriendsGeneralCard = styled.div`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  width: 75% !important;
  padding: 5px 0;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FriendsSeeMore = styled.div`
  button {
    width: 50% !important;
    padding: 5px;
  }
`;

export const LineSpanDiv = styled.div`
  span {
    display:inline-block;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center !important;
  }
`;


export const Button = styled.button`
  margin: 3px;

  border: solid black 1px;
  text-transform: uppercase;
  font-weight: bold;


  bottom: 0px;
  right: 0px;

  position: relative;

  zindex: 1000;

  background: none;

  &:active {
      background: ghostwhite;
  }

  &:hover {
      color: white;
      background: #00d4ff
      border: solid black 1px
  }
`;