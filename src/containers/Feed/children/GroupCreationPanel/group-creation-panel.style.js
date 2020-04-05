import styled from 'styled-components';

export const AddGroupPanel = styled.div`
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
    z-index: 100000;
`;

export const AddGroupHeader = styled.div`
    border-radius: 4px 4px 0 0;
    box-shadow: 0 0px 3px rgba(8,53,117,0.3);
    background-color: white;

    width: 100%;

    padding: .75em;
    font-size: 1.75em;
`;