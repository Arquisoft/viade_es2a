import styled from 'styled-components';

export const WaypointMenuHolder = styled.div`
    display: flex;
    flex-direction: column;

    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 1;

    width: 100%;
    min-width: 12em;

    flex-basis: 30%;

    border-radius: 0 0 4px 0;

    overflow-y: auto;
`;

export const WaypointMenuHeader = styled.div`
    h1 {
        font-size: 1.25em;
        margin: 0;
    }

    padding: 1em 2em;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(8,53,117,0.1);
`;

export const WaypointContainer = styled.div`
    padding: .25em .25em 0;

    transition-duration: 200ms;

    background-color: white;

    border-radius: 0 0 4px 0;
`;