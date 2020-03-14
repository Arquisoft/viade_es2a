import styled from 'styled-components';

export const LocationInfoHolder = styled.div`
    height: ${props => props.selected ? 'auto' : '3em'};
    margin-bottom: .25em;
    border: 1px solid rgba(8,53,117,0.1);
    display: flex;
    flex-direction: row;

    transition-duration: 200ms;

    cursor: pointer;

    .marker {
        margin: auto 4px;
    }

    .content {
        padding: 4px;
        height: 100%;
        width: calc(100% - 28px);

        .header {
            height: ${props => props.selected ? 'calc(3em - 10px)' : '100%'};
            display: flex;

            .name {
                margin: auto;
                width: calc(100% - 28px);
                color: #616161;
            }
        }
    }
`;

export const LocationContainer = styled.div`
    padding: .25em .25em 0;

    height: 100%;

    transition-duration: 200ms;

    background-color: #f7f7f7;
`;