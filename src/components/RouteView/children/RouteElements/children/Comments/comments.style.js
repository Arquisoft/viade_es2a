import styled from 'styled-components';

export const ScrollPanelComments = styled.div`
    overflow-y: auto;

    ${props => props.noComments ? 'display: flex;' : ''}
    flex-direction: column;

    border-radius: 0 0 4px 0;

    width: 100%;

    flex-basis: 75%;

    background-color: #f7f7f7;
    padding: 0 0 .4em 0;

    span.no-comments {
        user-select: none;
        margin: auto;
        font-style: italic;
    }
`;

export const CommentSectionWrapper = styled.div`
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

export const CommentContainer = styled.div`
    display: flex;
    flex-direction: row;

    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    z-index: 2;
    border-radius: 0 0 0 4px;
    flex-basis: 25%;
`;

export const AddCommentText = styled.textarea`
    resize: none;
    border: none;
    padding: .5em 0 .5em .5em;
    font-size: .8em;
    border-radius: 0 0 0 4px;
`;

export const CommentButtonContainer = styled.div`
    display: grid;
    
    border-left: solid 1px rgba(8,53,117,0.1);
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

export const SelectPointToCommentContainer = styled.div`
    padding: 1em;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    background-color: white;
    border-radius: 12px;

    text-align: center;

    z-index: 100001;

    max-height: 60%;
    min-width: 20%;

    overflow: auto;
    scrollbar-width: none;
`;
