import styled from 'styled-components';

export const FriendsWrapper = styled.section`
  width: 100%;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;

`;

export const FriendsAddCard = styled.div`
  background-color: #fff;
  margin: 10px auto 0px;

  display:flex;
  justify-content: center;

  border: 1px solid 1px solid rgba(124, 77, 255, 0);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  border-radius : 4px;
  

  //Overriding the style guide card flexbox settings
  width: 75% ;
  padding: 5px 0;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FriendsGeneralCard = styled.div`
  background-color: #fff;
  margin: 5px;

  display:flex;
  flex-direction: column;
  border: 1px solid 1px solid rgba(124, 77, 255, 0);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  border-radius : 4px;

  align-items: center;
  justify-content: center;

  width: 50% ;
  height: 100%;

    padding: 10px 0;

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

export const FriendsAndGroups = styled.div`

margin: 10px auto;
display:flex;
flex-direction: row;

align-items: center;
justify-content: space-between;

width: 75% ;
height: 75% ;

  padding: 50px 0;


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