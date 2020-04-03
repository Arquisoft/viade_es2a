import styled from 'styled-components';

export const RightPanel = styled.div`
    display: ${props => props.collapsed ? 'none' : 'flex'};
    flex-direction: column;

    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 5;

    width: 100%;

    flex-basis: 30%;

    border-radius: 0 0 4px 0;
`;

export const RouteViewHeader = styled.div`
    h1 {
        font-size: 1.25em;
        margin: 1;
    }

    button {
        margin: 3px 5px 3px 5px;
    }

    background-color: white;
    border-radius: 0 4px 0 0;

    padding: 1em 2em;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(8,53,117,0.1);
`;
