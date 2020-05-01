import styled from 'styled-components';

export const DownPanel = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    ${props => props.downPanelCollapsed ? '' : 'flex-basis: 40%;'}

    border-radius: 0 0 4px 0;

    max-height: 40%;
`;

export const TabContainer = styled.div`
    height: 2.25em;

    width: 100%;
    text-align: center;

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    z-index: 2;

    display: grid;
    grid-template-areas: 'tab1 tab2';
`;

export const TabButton = styled.button`
    background: none;
    transition-duration: none;
    border: none;
    
    border-bottom: ${props => props.selected ? '4px solid #8a25fc' : 'none'};
    background: ${props => props.selected ? '#e2c8ff' : 'none'};
    color: ${props => props.selected ? '#8a25fc' : '#666666'};

    border-radius: 0;

    &:hover {
        background: #f1e5ff;
        outline: none;
        color: #8a25fc;
        border-color: #8a25fc;
    }

    &:active {
        background: #e2c8ff;
        outline: none;
        color: #8a25fc
        border-color: #8a25fc;
    }
`;

export const PanelContainer = styled.div`
    flex-direction: column;

    width: 100%;

    border-radius: 0 0 4px 0;

    display: ${props => props.downPanelCollapsed ? 'none' : !props.hidden ? 'flex' : 'none'};
    height: calc(100% - 2.25em);
`;