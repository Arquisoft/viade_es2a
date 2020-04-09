import styled from 'styled-components';

export const RouteFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;

    z-index: 1;

    overflow-y: auto;

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

    button,
    .file-upload-label {
        align-self: center;

        display: inline-block;
        font-size: 1em;
        border: none;
        border-radius: 4px;
        padding: .5em;
        white-space: nowrap;
        user-select: none;
        cursor: pointer;

        color: white;
        background-color: #7c4dff;
        box-shadow: 0px 0px 3px rgba(0,0,0,.5);

        &:hover {
            color: white;
            background-color: #9841fc;
            border: none;
        }
        
        &:active {
            color: white;
            background-color: #7c4dff;
            border: none;
        }
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
`;