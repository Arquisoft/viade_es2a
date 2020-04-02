import styled from 'styled-components';

export const RouteViewWrapper = styled.div`
    border-radius: 4px;
    margin: auto;
    padding: 0px;
    border: none;

    transition: all .25s ease-in-out;

    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    background-color: white;

    z-index: 100001;

    width: 100%;
    height: 100%;

    position: relative;
`;

export const RouteViewHeader = styled.div`
    h1 {
        font-size: 1.25em;
        margin: 1;
    }

    button {
        margin: 3px 5px 3px 5px;
    }

    background-color: white;
    border-radius: 0 4px 0 0;

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

    flex-basis: ${props => props.collapsed ? '100%' : '70%'};
`;

export const ExpandButton = styled.button`
    background: none rgb(255, 255, 255);
    border: 0px;
    margin: 0 10px;
    padding: 0px;
    position: absolute;
    cursor: pointer;
    user-select: none;
    border-radius: 2px;
    height: 40px;
    width: 40px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    overflow: hidden;
    top: 60px;
    right: 0px;
    font-size: 1.75em;
    z-index: 10000;
`

export const CollapseButton = styled.button`
    background: none;
    margin: 0;
    padding: 0 5px;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    top: 10px;
    right: 10px;
    font-size: 1.75em;
    z-index: 10000;
    border: none;
    color: #666;

    &:active,
    &:hover {
        background: none;
        color: black;
        border: none;
    }
`

export const RightPanel = styled.div`
    display: ${props => props.collapsed ? 'none' : 'flex'};
    flex-direction: column;

    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    z-index: 5;

    width: 100%;

    flex-basis: 30%;

    border-radius: 0 0 4px 0;
`;

export const MapHolder = styled.div`
    border-radius: 4px 0 0 0;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

    flex-basis: auto;
`;


/**
 * ############## Media modal ##############
 */
export const MediaModal = styled.div`

    display: block;

    width: 600px;
    height: 400px;
    max-width: 100%;
    max-height: 100%;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);

    background-color: white;
    border-radius: 12px;
    opacity 0.8;

    text-align: center;

`;

export const ButtonCloseMediaModal = styled.button`

    position: fixed;
    top: 10%;
    left: 92%;
    transform: translate(-50%, -50%);

`;

export const SelectedImage = styled.img`
    display: block;
    width: auto; 
    height: 500px;
    max-width: 100%;
    max-height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
    border-radius: 12px;
`;

export const DownloadImage = styled.a`
    position: fixed;
    top: 20%;
    left: 80%;
    transform: translate(-50%, -50%);
`;