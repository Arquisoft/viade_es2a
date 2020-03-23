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
`

export const TabButton = styled.button`
    background: none;
    transition-duration: none;
    border-bottom: ${props => props.selected ? '4px solid green' : 'none'};
`

export const MapHolder = styled.div`
    border-radius: 4px 0 0 0;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

    flex-basis: 60%;
`;

export const ContenedorComentario = styled.div`
    display: flex;
    position: inherit;
`;

export const AñadirComentarioTexto = styled.textarea`
    resize: none;
`;

export const AñadirComentarioBoton = styled.button`
    background: none;
    transition-duration: none;
`;

export const ScrollPanelComments = styled.div`
    overflow: auto;
    overflow-x: hidden;

    display: list-item;
    flex-direction: column-reverse;

    flex-basis: auto;

    border-radius: 0 0 4px 0;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    
    width: 100%;
    height: 130px;
`;

export const LineaSeparadoraComentarios = styled.hr`
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;