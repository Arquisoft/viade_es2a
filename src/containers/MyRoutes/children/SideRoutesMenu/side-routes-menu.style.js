import styled from 'styled-components';

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