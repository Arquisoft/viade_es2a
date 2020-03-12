import styled from 'styled-components';
// import { media } from '../../utils';

export const FriendsWrapper = styled.section`
  width: 100%;
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