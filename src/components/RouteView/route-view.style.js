import styled from 'styled-components';

export const RouteViewWrapper = styled.div`
    border-radius: 4px;
    margin: auto;
    padding: 0px;
    border: none;

    transition: all .25s ease-in-out;

    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    background-color: white;

    width: 100%;
    height: 100%;
`;

export const RouteViewHeader = styled.div`
    h1 {
        font-size: 1.25em;
        margin: 0;
    }

    padding: 1em 2em;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(8,53,117,0.1);
`;

export const RouteInfoContainer = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 100%;
`;

export const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    flex-basis: 70%;
`;

export const RightPanel = styled.div`
    display: flex;
    flex-direction: column;

    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 1;

    width: 100%;
    min-width: 12em;
    //max-width: 22em;

    flex-basis: 30%;

    border-radius: 0 0 4px 0;
`;

export const CommentsPanel = styled.div`
    display: flex;
    flex-direction: column;

    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 1;

    flex-basis: 40%;

    background-color: white;

    border-radius: 0 0 0 4px;

    .comment {
        margin-left: 1em;
        font-size: .8em;
    }

    .no-comments {
        font-style: italic;
        color: #a3a3a3;
        margin: auto;
    }
`;

export const CommentsHeader = styled.div`
    padding: .5em;
    width: 100%;
    text-align: center;

    border-bottom: 1px solid rgba(8, 53, 117, 0.1);
`

export const MapHolder = styled.div`
    border-radius: 4px 0 0 0;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

    flex-basis: 60%;
`;