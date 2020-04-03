import styled from 'styled-components';

export const TabPanel = styled.div`
    display: flex;
    flex-direction: column;

    z-index: 1;

    overflow-y: auto;

    background-color: white;

    border-radius: 0 0 0 4px;

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

export const ScrollPanelComments = styled.div`
    overflow-y: auto;

    flex-direction: column;

    border-radius: 0 0 4px 0;
    
    width: 100%;

    flex-basis: 75%;

    p {
        font-size: .75em;
        margin: 0;
        padding: .75em .5em;
        border-bottom: solid 1px rgba(8,53,117,0.1);
    }
`;

export const AddCommentButton = styled.button`
    background: none;
    
    border-radius: 0;
    vertical-align: middle;

    width: 3.5em;

    border: none;

    &:hover {
        background: #f5f5f5;
    }

    &:active {
        background: #ececec;
    }

    img {
        height: 1.7em;
        width: 1.7em;
    }
`;

export const AddCommentText = styled.textarea`
    resize: none;
    border: none;
    padding: .5em 0 .5em .5em;
    font-size: .8em;
    border-radius: 0 0 0 4px;
`;


export const CommentButtonContainer = styled.div`
    display: flex;
    
    border-left: solid 1px rgba(8,53,117,0.1);
`;

export const CommentContainer = styled.div`
    display: flex;
    flex-direction: row;

    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    z-index: 2;
    border-radius: 0 0 0 4px;
    flex-basis: 25%;
`;