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
        box-shadow: 0 0px 4px rgba(8, 53, 117, 0.3);
        transform: translate(-4px, 0px);
        color: ${props => props.color};
    }
`;

export const OptionButton = styled.button`
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

export const OptionButtonContainer = styled.div`
    bottom: 0px;
    right: 0px;
    display: grid;
    position: absolute;
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
`