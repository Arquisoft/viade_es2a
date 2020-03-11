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

  align-items: flex-start !important;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  h3 {
    padding-left: 40%;
  }
`;

export const FriendsSeeMore = styled.div`
  button {
    width: 50% !important;
    padding: 5px;
  }
`;