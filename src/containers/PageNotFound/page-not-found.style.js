import styled from 'styled-components';

export const PageNotFoundWrapper = styled.section`
  height: 100%;
`;

export const PageNotFoundContent = styled.div`
  margin: 100px 40px 0 50px;
  
  flex-direction: column;
  display: flex;
  text-align: center;

  @media only screen and (max-width: 600px) {
    img {
      width: 100%;
    }
  }
`;
