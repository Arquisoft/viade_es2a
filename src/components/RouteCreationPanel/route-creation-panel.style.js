import styled from 'styled-components';

export const CreationPanelHolder = styled.div`
    border-radius: 4px;
    margin: auto;
    padding: 0px;
    border: none;

    transition: all .25s ease-in-out;

    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    background-color: white;

    display: flex;
    flex-direction: row;

    width: 100%;
    height: 100%;
`;

export const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    flex-basis: 70%;
`;

export const MapHolder = styled.div`
    border-radius: 4px 0 0 0;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

    flex-basis: 60%;
`;