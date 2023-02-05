import * as React from 'react';
import styled from 'styled-components';

function MiddleHeader() {

    return <TitleWrap>
        <TitleBox>
            날짜를 추가해주세요
        </TitleBox>
        <TitleBox>
            todo를 추가해주세요
        </TitleBox>
    </TitleWrap>
}

const TitleWrap = styled.div`
    display: flex;
    justify-content: center;
    color: #333;
`

const TitleBox = styled.div`
    display: flex;
    justify-content: center;
    width: 450px;
    padding: 20px;
`   

export default MiddleHeader;    