import styled from 'styled-components';

export const FriendHolderHeader = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    padding: .5em;

    text-align: center;
`;

export const FriendHolderWrapper = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0;
    width: 100%
    min-height: 4em;
    height: ${props => props.selected ? 'auto' : '4em'};
    margin-bottom: .6em;

    background-color: white;
    
    border-radius: 5px;
    
    border: .5px solid rgba(8, 53, 117, 0.1);
    border-left: 2px solid ${props => props.selected ? '#5361FD' : 'gray'};

    span {
        &.friend-title {
            font-size: .9em;
            color: ${props => props.selected ? '#5361FD' : 'gray'};
        }

        &.loading {
            font-size: .9em;
            text-align: center;
            font-style: italic;
        }

        &.no-routes {
            font-size: .9em;
            text-align: center;
            font-style: italic;
            color: lightgray;
        }
    }

    transition-duration: 200ms;

    cursor: pointer;

    transform: translateX(${props => props.selected ? '-4px' : '0'});
    box-shadow: 0 0px ${props => props.selected ? '2px' : '0'} rgba(8, 53, 117, 0.3);
    color: gray;

    &:hover {
        box-shadow: 0 0px 2px rgba(8, 53, 117, 0.3);
        transform: translateX(${props => props.selected ? '-4px' : '-2px'});
    }
`;

export const RouteContainer = styled.div`
    padding: .3em .3em 0 .3em;
`;