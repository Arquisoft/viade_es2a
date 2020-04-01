import styled from 'styled-components';

export const DownPanel = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    flex-basis: auto;

    border-radius: 0 0 4px 0;

    max-height: 40%;
`;

/**
 * ############## Comments ##############
 */

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

export const CommentButtonContainer = styled.div`
    display: flex;
    border-left: solid 1px rgba(8,53,117,0.1);
`

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

/**
 * ############## Media ##############
 */

export const ScrollPanelMedia = styled.div`
    padding: .6em;
    display: grid;
    
    grid-template-columns: auto auto auto auto;

    grid-gap: .6em;
    align-content: center;

    overflow-y: auto;

    border-radius: 0 0 4px 0;

    width: 100%;
`;

export const ImageThumbnail = styled.img`
    width: 100%; 
    border-radius: .4em;
    display: block;
    border: none;
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

export const TabPanel = styled.div`
    display: flex;
    flex-direction: column;

    z-index: 1;

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
    
    height: calc(100% - 2.25em);
`;

export const LinkMedia = styled.p`
    font-size: 100%;
`;

export const PanelContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    flex-basis: 60%;

    border-radius: 0 0 4px 0;

    max-height: 100%;
`;

export const Collapsed = styled.div`

`;

export const Header = styled.div`
    height: 2.25em;

    width: 100%;
    text-align: center;

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    z-index: 2;

    display: grid;
    grid-template-areas: 'tab1 tab2';
`

export const TabButton = styled.button`
    background: none;
    transition-duration: none;
    border: none;
    
    border-bottom: ${props => props.selected ? '4px solid #8a25fc' : 'none'};
    background: ${props => props.selected ? '#e2c8ff' : 'none'};
    color: ${props => props.selected ? '#8a25fc' : '#666666'};

    border-radius: 0;

    &:hover {
        background: #f1e5ff;
        outline: none;
        color: ${props => props.selected ? '#8a25fc' : 'white'};
        border-color: #8a25fc;
    }

    &:active {
        background: #e2c8ff;
        outline: none;
        color: #8a25fc
        border-color: #8a25fc;
    }
`

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
`;