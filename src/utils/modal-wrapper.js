import styled from 'styled-components';

const WIDTH_THRESHOLD = '650px';
const HEIGHT_THRESHOLD = '850px';

const MobileCompatWrapper = styled.div`
    @media (max-width: ${WIDTH_THRESHOLD}) {
        width: 100%;
    }

    @media (max-height: ${HEIGHT_THRESHOLD}) {
        height: 100%;
    }

    @media (min-width: ${WIDTH_THRESHOLD}) {
        width: 70%;
    }

    @media (min-height: ${HEIGHT_THRESHOLD}) {
        height: 70%;
    }

    @media (max-height: ${HEIGHT_THRESHOLD}) and (max-width: ${WIDTH_THRESHOLD}) {
        i {
            display: block;
            z-index: 100002;
        }
    }

    display: flex;
    z-index: 100001;
`;

const ModalCloseButton = styled.i`
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 0;
    line-height: .4em;
    border: none;
    background: none;

    z-index: -1;
    display: none;

    font-size: 3em;

    &:active,
    &:hover {
        border: none;
        background: none;
    }

    &::before {
        content: '×';
    }
`;

export { MobileCompatWrapper, ModalCloseButton };