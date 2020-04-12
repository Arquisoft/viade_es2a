import styled from 'styled-components';

export const GroupPanel = styled.div`
    background-image: url('img/concentric-hex-pattern_2x.png');
    background-repeat: repeat;

    border-radius: 4px;
    margin: auto;
    padding: 0px;
    border: none;

    transition: all .25s ease-in-out;

    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    background-color: white;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: auto;

    max-width: 50em;
    z-index: 100001;
`;

export const GroupCard = styled.div`
    background-color: #fff;
    margin: 1em auto;

    display: flex;

    box-shadow: 0 0px 3px rgba(8,53,117,0.3);
    border-radius: 4px;
    
    width: 90%;
    padding: 1em;

    input {
        border: 1px solid #DAE0E6;
        font-size: 0.8em;
        padding: 0.5em 0;
        text-indent: 0.75em;
        border-radius: 4px;
    }
`;

export const GroupHeader = styled.div`
    border-radius: 4px 4px 0 0;
    box-shadow: 0 0px 3px rgba(8,53,117,0.3);
    background-color: white;

    width: 100%;

    padding: .75em;
    font-size: 1.75em;
`;

export const GroupLine = styled.div`
    background-color: white;
    margin: 1em auto;

    display: flex;

    box-shadow: 0 0px 3px rgba(8,53,117,0.3);
    border-radius: 4px;
    
    width: 90%;
    padding: 1em;
`;

export const Button = styled.button`
    margin-left: 1em;

    text-transform: uppercase;
    font-weight: bold;
    border: 1px solid #DAE0E6;

    background: none;

    color: none;

    &:active {
        background: lightgray;
    }

    &:hover {
        border: 1px solid #DAE0E6;
        color: white;
        background: lightgray;
    }
`;