import styled from 'styled-components';

export const EditGroupPanel = styled.div`
    transition: all .25s ease-in-out;

    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;

    width: 100%;
    height: auto;
`;

export const EditGroupWrapper = styled.div`
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
`