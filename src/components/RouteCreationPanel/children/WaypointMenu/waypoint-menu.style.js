import styled from 'styled-components';

export const WaypointMenuHolder = styled.div`
    display: ${props => props.collapsed ? 'none' : 'flex'};
    flex-direction: column;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 5;
    width: 100%;
    flex-basis: 100%;
    border-radius: 0 0 4px 0;
    overflow-y: auto;
    min-width: 12em;
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

export const AddWaypointButton = styled.button`
    border-radius: 50%;
    height: 1.25em;
    width: 1.25em;
    margin: 12px auto;
    padding: 0;
    border: none;
    color: white;
    font-size: 1.5em;
    background-color: #7c4dff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .5);

    &:hover {
        color: white;
        background-color: #9841fc;
    }
    
    &:active {
        color: white;
        background-color: #7c4dff;
    }
`;