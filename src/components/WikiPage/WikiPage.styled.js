import styled from 'styled-components';

export const WikiPageContainer = styled.div`
    width: 300px;
    height: 500px;
    border: 1px solid black;
    padding: 10px;
    overflow: hidden;
    margin: 20px;
    min-width: 300px;
    display: flex;

    & body {
        scale: 0.75;
    }
`

export const InfoBox = styled.div`
    width: 100%;
    height: auto;
    max-width: 20em;

    img {
        border: 0;
        vertical-align: middle;
        height: auto;
        width: 100%;
    }
`
