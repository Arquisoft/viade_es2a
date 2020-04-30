import styled from 'styled-components';

export const CommentWrapper = styled.div`
    display: flex;
    flex-direction: row;

    padding: .4em;
    margin: .3em .3em 0 .3em;
    width: calc(100% - .3em * 2);
    min-height: 3em;
    height: ${props => props.selected ? 'auto' : '3em'};

    background-color: white;

    border-radius: 5px;

    box-shadow: ${props => props.selected ? '0px 1.5px 2.5px' : '0px .5px .5px'} rgba(0,0,0,0.2);

    &:hover {
        ${props => props.selected ? '' : 'box-shadow: 0px 1px 1.5px rgba(0,0,0,0.2);'}
    }

    img {
        margin: .1em;
        border-radius: 50%;
        height: 2em;
        width: 2em;
        align-self: center;
    }

    span {
        &.user-title {
            font-size: .9em;
            color: gray;
            width: 100%;
            overflow-wrap: anywhere;
        }

        &.content {
            margin-top: .4em;
            font-size: .8em;
            color: gray;
            width: 100%;
            overflow-wrap: anywhere;
            font-style: italic;
            overflow-y: hidden;
            white-space: break-spaces;
        }

        &.waypoint-name {
            margin-top: .1em;
            font-weight: bold;
            padding: .3em;
            background-color: ${props => props.color}66;
            border-radius: 4px;
            font-size: .7em;
            overflow-wrap: anywhere;
        }
    }

    transition-duration: 200ms;

    cursor: pointer;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: .5em;
    width: 100%;
`;