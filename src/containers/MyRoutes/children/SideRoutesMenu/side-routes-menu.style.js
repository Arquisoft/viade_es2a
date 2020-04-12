import styled from 'styled-components';

export const SideMenuHolder = styled.div`
    width: ${props => props.collapsed ? '0' : '25%'};
    min-width: ${props => props.collapsed ? '0' : '18em'};
    max-width: 22em;

    z-index: 1;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
`;

export const RouteContainer = styled.div`
    padding: .6em .6em 0 .6em;

    width: 100%;
    height: 100%;

    background-color: #f7f7f7;

    overflow-y: auto;
`;

export const SideMenuHeader = styled.div`
    padding: 1em;
    width: 100%
    text-align: center;

    border-bottom: 1px solid rgba(8, 53, 117, 0.1);
`;

export const CollapseButton = styled.button`
    background: none;
    margin: 0;
    padding: 0 5px;
    position: absolute;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    top: 10px;
    right: 10px;
    font-size: 1.75em;
    z-index: 10000;
    border: none;
    color: #666;

    &:active,
    &:hover {
        background: none;
        color: black;
        border: none;
    }
`;