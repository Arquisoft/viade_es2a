import styled from 'styled-components';

import { dimensions } from '@constants';

export const RouteMapHolder = styled.section`
    width: 100%;

    display: flex;
    flex-direction: row;

    position: absolute;

    height: calc(100% - 60px);
`;

export const MapHolder = styled.div`
    @media (max-width: ${dimensions.FULL_SCREEN_WIDTH_THRESHOLD}) {
        ${props => props.collapsed ? '' : 'flex-basis: 0'};
    }

    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
`;

export const ExpandButton = styled.button`
    background: none rgb(255, 255, 255);
    border: 0px;
    margin: 0 10px;
    padding: 0px;
    position: absolute;
    cursor: pointer;
    user-select: none;
    border-radius: 2px;
    height: 40px;
    width: 40px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    overflow: hidden;
    top: 60px;
    right: 0px;
    font-size: 1.75em;
    z-index: 1000;
`;