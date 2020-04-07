import styled from 'styled-components';

export const ScrollPanelMedia = styled.div`
    padding: .6em;
    display: grid;
    
    grid-template-columns: auto auto auto;

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

    border-radius: 12px;

    z-index: 100001;

    height: 80%
`;
