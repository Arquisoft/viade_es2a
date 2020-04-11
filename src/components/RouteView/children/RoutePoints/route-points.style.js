import styled from 'styled-components';

export const Points = styled.div`
    display: ${props => props.collapsed ? 'none' : 'flex'};
    flex-direction: column;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 5;
    width: 100%;
    flex-basis: 100%;
    border-radius: 0 0 4px 0;
    overflow-y: auto
`;

export const RouteViewHeader = styled.div`
    h1 {
        font-size: 1.25em;
        margin: 1;
    }

    p {
        font-size: .9em;
    }

    background-color: white;
    border-radius: 0 4px 0 0;

    padding: 1em 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(8,53,117,0.1);
`;

export const RouteOptionButton = styled.button`
    background: none;
    border: none;
    padding: .5em;
    margin: 0;

    img {
        height: 1.5em;
    }
`;