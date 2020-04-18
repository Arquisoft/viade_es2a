import styled from 'styled-components';

export const FriendHolderHeader = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: .2em;

    text-align: center;
`;

export const FriendHolderWrapper = styled.div`
    display: flex;
    flex-direction: column;

    padding: .3em ${props => props.selected ? '.3em 0' : ''};
    width: 100%;
    min-height: 3em;
    height: auto;
    margin-bottom: .6em;

    background-color: white;
    
    border-radius: 5px;
    
    border: .5px solid rgba(8, 53, 117, 0.1);
    border-left: 2px solid ${props => props.selected ? '#52b5dd' : 'gray'};

    img {
        margin: .1em;
        border-radius: 50%;
        height: 2.5em;
        width: 2.5em;
        align-self: center;
    }

    span {
        &.friend-title {
            font-size: .9em;
            color: ${props => props.selected ? '#52b5dd' : 'gray'};
            width: 100%;
            margin: auto;
            overflow-wrap: break-word;
            width: 80%;
        }

        &.loading {
            font-size: .9em;
            text-align: center;
            font-style: italic;
            margin: .2em 0 .4em;
        }

        &.no-routes {
            font-size: .9em;
            text-align: center;
            font-style: italic;
            color: lightgray;
            margin: .2em 0 .4em;
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

export const FriendButtonContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    place-content: space-around;
`;

export const FriendOptionButton = styled.button`
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    color: #52b5dd;
    font-size: .75em;

    transition-duration: 100ms;

    zindex: 1000;

    background: none;

    &:active {
        background: ghostwhite;
    }

    &:hover {
        color: #D3D3D3;
    }
`;

export const RouteContainer = styled.div`
    padding: .2em 0 0 0;
`;