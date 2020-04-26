import styled from 'styled-components';

export const GroupHolderHeader = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    padding: .2em;

    text-align: center;
`;

export const GroupHolderWrapper = styled.div`
    padding: .3em .3em 0;
    width: 100%
    min-height: 3em;
    height: auto;
    margin-bottom: .6em;

    background-color: white;
    
    border-radius: 5px;
    
    border: .5px solid rgba(8, 53, 117, 0.1);
    border-left: 2px solid ${props => props.selected ? '#8a94ff' : 'gray'};

    span {
        &.friend-title {
            font-size: .9em;
            color: ${props => props.selected ? '#5361FD' : 'gray'};
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

export const DetailsButton = styled.button`
    margin: 0 3px 3px 3px;
    padding: 0 .5em .5em .5em;

    border: none;
    text-transform: uppercase;
    font-weight: bold;
    color: ${props => props.color};

    background: none;

    &:active {
        background: ghostwhite;
    }

    &:hover {
        color: #D3D3D3;
    }
`;

export const ButtonContainer = styled.div`
    bottom: 0px;
    right: 0px;
    display: grid;
    position: absolute;
`;