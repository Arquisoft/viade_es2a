import styled from 'styled-components';

export const MediaSectionWrapper = styled.div`
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

export const ScrollPanelMedia = styled.div`
    padding: .6em;
    display: grid;
    
    grid-template-columns: repeat( auto-fit, minmax(33.33%, 1fr) );

    grid-gap: .6em;
    align-content: center;

    border-radius: 0 0 4px 0;

    width: 100%;
`;

export const ThumbnailContainer = styled.button`
    padding: 0;
    border: none;
    background: none;
    margin: 0;

    p {
        margin: 0;
        font-size: 2em;
    }

    &:hover,
    &:active{
        border: none;
        background: white
    }

    input[type="file"] {
        display: none;
    }

    .file-upload-label {
        align-self: center;

        display: inline-block;
        
        border-radius: 50%;
        padding: .0625em;
        width: 1.25em;
        height: 1.25em;
        white-space: nowrap;
        user-select: none;
        cursor: pointer;

        user-select: none;
        border: none;
        color: white;
        font-size: .6em;
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

export const ImageThumbnail = styled.img`
    width: 100%; 
    border-radius: .4em;
    display: block;
    border: none;
`;

export const LinkMedia = styled.p`
    font-size: 100%;
`;

export const MediaModal = styled.div`
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
`;

export const SelectedImage = styled.img`
    border-radius: 12px;
    max-width: 100%;
    max-height: 100%;
    display: block;
`;

export const ImageContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    border-radius: 4px;

    z-index: 100001;
`;

export const DeleteConfirmation = styled.div`
    background: white;

    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    padding: 1em 1em 0;
    border: none;

    border-radius: 4px;

    z-index: 100001;

    user-select: none;

    * {
        outline: none;
    }
`;