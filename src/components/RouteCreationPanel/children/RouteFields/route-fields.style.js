import styled from 'styled-components';

export const RouteFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;

    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 1;

    flex-basis: 40%;

    background-color: white;

    border-radius: 0 0 0 4px;

    .comment {
        margin-left: 1em;
        font-size: .8em;
    }

    .no-comments {
        font-style: italic;
        color: #a3a3a3;
        margin: auto;
    }
`;