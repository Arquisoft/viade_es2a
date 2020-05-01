import styled from 'styled-components';

import { dimensions } from '@constants';

export const SidePanelHolder = styled.div`
    @media (max-width: ${dimensions.FULL_SCREEN_WIDTH_THRESHOLD}) {
        ${props => props.collapsed ? '' : 'flex-basis: 100%'};
        width: ${props => props.collapsed ? '0' : '100%'};
    }

    @media (min-width: ${dimensions.FULL_SCREEN_WIDTH_THRESHOLD}) {
        width: ${props => props.collapsed ? '0' : '25%'};
        min-width: ${props => props.collapsed ? '0' : props.minWidth};
        max-width: ${props => props.maxWidth};
    }

    z-index: 1;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
`;

export const SideElementContainer = styled.div`
    padding: .6em .6em calc(54px + 18px * 1.5) .6em;

    width: 100%;
    height: 100%;

    background-color: #f7f7f7;

    overflow-y: auto;
`;

export const TabContainer = styled.div`
    height: 3em;

    width: 100%;
    text-align: center;

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    z-index: 2;

    display: flex;
`;

export const MainTabContainer = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: auto auto;
`;

export const TabButton = styled.button`
    background: none;
    transition-duration: none;
    border: none;
    font-size: .9em;
    
    border-bottom: ${props => props.selected ? '4px solid #52b5dd' : 'none'};
    background: ${props => props.selected ? '#c3eaf4' : 'none'};
    color: ${props => props.selected ? '#52b5dd' : '#666666'};

    border-radius: 0;

    &:hover {
        background: #e7faff;
        outline: none;
        color: #52b5dd;
        border-color: #52b5dd;
    }

    &:active {
        background: #c3eaf4;
        outline: none;
        color: #52b5dd
        border-color: #52b5dd;
    }

    &.collapse {
        font-size: 1.5em;
        line-height: 0;
        font-weight: bolder;
        max-width: 2.5em;
        padding: 0 .5em 0 .5em;
    }
`;