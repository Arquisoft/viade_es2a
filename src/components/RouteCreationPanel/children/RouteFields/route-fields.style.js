import styled from 'styled-components';

export const RouteFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;

    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 1;

    flex-basis: 30%;

    padding: 1em;

    background-color: white;

    border-radius: 0 0 0 4px;

    textarea {
        border: 1px solid #DAE0E6;
        font-size: 0.8em;
        padding: 0.5em 0;
        text-indent: 0.75em;
        border-radius: 4px;
        resize: none;
    }

    input[type="file"] {
        display: none;
    }

    .file-upload-label {
        align-self: center;

        color: none;
        background: none;
        border: 1px solid #DAE0E6;

        display: inline-block;
        
        border: 1px solid #999;
        border-radius: 4px;
        padding: .2em;
        white-space: nowrap;
        user-select: none;
        cursor: pointer;

        &:hover {
            border: 1px solid #DAE0E6;
            color: white;
            background: lightgray;
        }
        
        &:active {
            background: lightgray;
        }
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
`;