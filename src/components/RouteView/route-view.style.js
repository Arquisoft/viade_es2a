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
        margin: 1;
    }

    button {
        margin: 3px 5px 3px 5px;
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

export const DownPanel = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    flex-basis: 60%;

    border-radius: 0 0 4px 0;
`;

export const TabPanel = styled.div`
    display: contents;
    flex-direction: column;

    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 1;

    flex-basis: 50%;

    background-color: white;

    border-radius: 0 0 0 4px;

    .element {
        margin-left: 1em;
        font-size: .8em;
    }

    .no-data {
        font-style: italic;
        color: #a3a3a3;
        margin: auto;
    }

    h1 {
        font-size: 1.25em;
        margin: 0;
    }
    
    height: 100%;
`;

export const Header = styled.div`
    height: 2.5em;

    padding: .5em;
    width: 100%;
    text-align: center;

    border-bottom: 1px solid rgba(8, 53, 117, 0.1);

    display: grid;
    grid-gap: 10px;
    grid-template-areas:
    'tab1 tab2';
`

export const TabButton = styled.button`
    background: none;
    transition-duration: none;
    border-bottom: ${props => props.selected ? '4px solid #98F5FF' : 'none'};
    background: ${props => props.selected ? 'linear-gradient(to right, rgba(124, 77, 255, 0.25) 0%, rgba(83, 97, 253, 0.25) 51.88%, rgba(55, 203, 239, 0.25) 100%)' : 'none'};

    &:focus,
    &:hover{
        background: linear-gradient(
            to right,
            rgba(124, 77, 255, 0.25) 0%,
            rgba(83, 97, 253, 0.25) 51.88%,
            rgba(55, 203, 239, 0.25) 100%
        );
        outline: none;
    }

    &:active{
        background: linear-gradient(
            to right,
            rgba(55, 203, 239, 0.25) 100%,
            rgba(83, 97, 253, 0.25) 51.88%,
            rgba(124, 77, 255, 0.25) 0%
        );
        outline: none;
    }
`

export const MapHolder = styled.div`
    border-radius: 4px 0 0 0;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

    flex-basis: 60%;
`;

export const CommentContainer = styled.div`
    display: flex;
    position: inherit;
`;

export const AddCommentText = styled.textarea`
    resize: none;
`;

export const AddCommentButton = styled.button`
    background: none;
    transition-duration: none;

    &:hover{
        background: linear-gradient(
            to right,
            rgba(124, 77, 255, 0.25) 0%,
            rgba(83, 97, 253, 0.25) 51.88%,
            rgba(55, 203, 239, 0.25) 100%
        );
        outline: none;
    }
`;

export const ScrollPanelComments = styled.div`
    overflow: auto;
    overflow-x: hidden;

    display: list-item;
    flex-direction: column-reverse;

    flex-basis: auto;

    border-radius: 0 0 4px 0;
    
    width: 100%;
    height: 130px;
`;

export const CommentSeparatorLine = styled.hr`
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;