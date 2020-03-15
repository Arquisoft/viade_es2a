import styled from 'styled-components';

export const SideMenuHolder = styled.div`
    width: 25%;
    min-width: 18em;
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
`;

export const SideMenuHeader = styled.div`
    padding: 1em;
    width: 100%
    text-align: center;

    border-bottom: 1px solid rgba(8, 53, 117, 0.1);
`;

export const RouteCardHeader = styled.div`
    display: grid;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: .5em;
`

export const RouteCardWrapper = styled.div`
    padding: 0;
    width: 100%
    height: ${props => props.selected ? '6em' : '4em'};
    margin-bottom: .6em;

    background-color: white;
    
    border-radius: 5px;
    
    border: .5px solid rgba(8, 53, 117, 0.1);
    border-left: 4px solid ${props => props.color};

    span {
        &.title {
            font-size: .9em;
        }

        &.author {
            font-size: .8em;
            text-align: end;
        }

        &.date{
            font-size: .6em;
            text-align: start;
            color: #808080;
            opacity: 0.6;
        }
    }

    transition-duration: 200ms;

    cursor: pointer;

    transform: translateX(${props => props.selected ? '-3px' : '0'});
    box-shadow: 0 0px ${props => props.selected ? '2px' : '0'} rgba(8, 53, 117, 0.3);
    color: ${props => props.selected ? props.color : 'none'};

    &:hover {
        box-shadow: 0 0px 5px rgba(8, 53, 117, 0.3);
        transform: translate(-4px, 0px);
        color: ${props => props.color};
    }
`;

export const DetailsButton = styled.button`
    margin: 3px;

    border: none;
    text-transform: uppercase;
    font-weight: bold;
    color: ${props => props.color};

    bottom: 0px;
    right: 0px;

    position: absolute;

    zindex: 1000;

    background: none;

    &:active {
        background: ghostwhite;
    }

    &:hover {
        color: #D3D3D3;
    }
`;