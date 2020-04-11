import styled from 'styled-components';

export const GroupFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width:100%;

    z-index: 1;

    background-color: white;
`;

export const GroupFieldsCard = styled.div`
    background-color: #fff;
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