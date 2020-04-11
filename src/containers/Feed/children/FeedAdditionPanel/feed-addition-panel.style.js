import styled from 'styled-components';

export const FeedAdditionPanelHolder = styled.div`
    z-index: 100001;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    background-image: url('img/concentric-hex-pattern_2x.png');
    background-repeat: repeat;

    display: flex;
    flex-direction: column;

    max-width: 50em;
    width: 100%;

    border-radius: 4px;

    margin: auto 0;
    padding: 0px;
    border: none;
`;

export const SectionContainer = styled.div`
    overflow-y: auto;
`;

export const TabContainer = styled.div`
    height: 3em;

    width: 100%;
    text-align: center;

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    z-index: 2;

    display: grid;
    grid-template-columns: auto auto;
`;

export const TabButton = styled.button`
    background: white;
    transition-duration: none;
    border: none;
    font-size: .9em;

    border-radius: 4px 4px 0 0;
    
    border-bottom: ${props => props.selected ? '4px solid #52b5dd' : 'white'};
    background: ${props => props.selected ? '#c3eaf4' : 'white'};
    color: ${props => props.selected ? '#52b5dd' : '#666666'};

    &:hover {
        background: #e7faff;
        outline: none;
        color: #52b5dd;
        border-color: #52b5dd;
    }

    &:active {
        background: #c3eaf4;
        outline: none;
        color: #52b5dd
        border-color: #52b5dd;
    }
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

export const InputCard = styled.div`
    background-color: white;
    margin: 1em auto;

    display: flex;

    box-shadow: 0 0px 3px rgba(8,53,117,0.3);
    border-radius: 4px;
    
    width: 90%;
    padding: 1em;
`;