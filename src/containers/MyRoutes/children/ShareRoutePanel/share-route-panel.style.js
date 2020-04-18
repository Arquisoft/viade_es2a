import styled from 'styled-components';

export const ShareRoutePanelHolder = styled.div`
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
    height: 100%;

    user-select: none;
`;

export const ShareOptionsContainer = styled.div`
    overflow-y: auto;
    margin: auto 0;

    span {
        align-self: center;

        &.share-title {
            margin: 0 auto 1em;
        }

        &.no-friends {
            font-style: italic;
            color: gray;
        }
    }
`;

export const ShareHolder = styled.div`
    background-color: #fff;
    margin: 1em auto;

    display: flex;
    flex-direction: column;

    box-shadow: 0 0px 3px rgba(8,53,117,0.3);
    border-radius: 4px;
    
    width: 90%;
    padding: 1em;

    table {
        td {
            border-radius: 4px;
            display: flex;
            padding: .75em;
            margin-right: .3em;
        }

        tr {
            border-radius: 4px;
            transition-duration: 200ms;

            &.selected {
                background: rgba(124, 77, 255, 0.46);
                color: black;
            }

            img {
                border-radius: 50%;
                height: 2em;
            }
        }
    }
`;

export const ShareRouteHeader = styled.div`
    border-radius: 4px 4px 0 0;
    box-shadow: 0 0px 3px rgba(8,53,117,0.3);
    background-color: white;

    width: 100%;

    padding: .75em;
    font-size: 1.75em;
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

    &.deshare {
        align-self: center;
        
        background: red;
        color: white;
        border: 1px solid darkred;

        &:active {
            border: 1px solid darkred;
            color: white;
            background: darkred;
        }
    }
`;