import styled from 'styled-components';
// import { media } from '../../utils';

export const FriendsWrapper = styled.section`
  width: 100%;
  background-image: url('/img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 50px 0;

  h3 {
    color: #666666;
    span {
      font-weight: bold;
    }
    a {
      font-size: 1.9rem;
    }
  }
`;

export const FriendsGeneralCard = styled.div`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  width: 80% !important;
  padding: 5px 0;

  align-items: flex-start !important;

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

export const FriendsDetail = styled.div`
  padding: 1rem 3.5rem;

  p,
  li {
    color: #666666;
  }
  ul {
    list-style: disc;
    margin: 0 18px;
  }
`;