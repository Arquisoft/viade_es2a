import styled from 'styled-components';

export const FloatingButtonWrapper = styled.button`
    position: absolute;
    bottom: 0px;
    left: 0px;
    margin: 24px;
    padding: 0px;

    font-size: 1.5em;

    text-align: center;

    height: 56px;
    width: 56px;

    border: none;
    border-radius: 100%;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, .5);
    z-index: 10000;
    background-color: ${props => props.background};
    color: ${props => props.foreground};
    transition-duration: 100ms;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.hoverBackground};
        box-shadow: 0px 0px 11px rgba(0, 0, 0, .5);
        color: ${props => props.foreground};
    }
    
    &:active {
        background-color: ${props => props.activeBackground};
        box-shadow: 0px 0px 9px rgba(0, 0, 0, .5);
    }
`;