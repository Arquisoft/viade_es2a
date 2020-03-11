import styled from 'styled-components';

export const SideFeedHolder = styled.div`
    width: 25%;
    min-width: 18em;
    max-width: 22em;

    z-index: 1;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;


export const RouteContainer = styled.div`
    padding: .6em .6em 0 .6em;

    width: 100%;
    height: 100%;

    background-color: #f7f7f7;
`;

export const SideFeedHeader = styled.div`
    padding: 1em;
    width: 100%
    text-align: center;

    border-bottom: 1px solid rgba(8, 53, 117, 0.1);
`;

export const RouteCardWrapper = styled.div`
    padding: .5em;
    width: 100%
    height: 4em;
    margin-bottom: .6em;

    background-color: white;
    display: grid;
    
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
    }

    transition-duration: 200ms;

    cursor: pointer;

    &:hover {
        box-shadow: 0 0px 3px rgba(0, 0, 0, 0.1);
    }
`;
