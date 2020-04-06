import styled from 'styled-components';

export const FeedAdditionPanelHolder = styled.div`
    width: 40em;

    z-index: 100001;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
`;


export const FriendContainer = styled.div`
    padding: .6em .6em 0 .6em;

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
`

export const MainTabContainer = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: auto auto;
`

export const TabButton = styled.button`
    background: none;
    transition-duration: none;
    border: none;
    font-size: .9em;
    
    border-bottom: ${props => props.selected ? '4px solid #5361FD' : 'none'};
    background: ${props => props.selected ? '#d7dbff' : 'none'};
    color: ${props => props.selected ? '#5361FD' : '#666666'};

    border-radius: 0;

    &:hover {
        background: #e7e9ff;
        outline: none;
        color: #5361FD;
        border-color: #5361FD;
    }

    &:active {
        background: #d7dbff;
        outline: none;
        color: #5361FD
        border-color: #5361FD;
    }

    &.collapse {
        font-size: 1.5em;
        line-height: 0;
        font-weight: bolder;
        max-width: 2.5em;
        padding: 0 .5em 0 .5em;
    }
`

export const GroupContainer = styled.div`
    padding: .6em .6em 0 .6em;

    width: 100%;
    height: 100%;

    background-color: #f7f7f7;

    overflow-y: auto;
`;