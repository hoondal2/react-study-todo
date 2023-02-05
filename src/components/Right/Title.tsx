import React, { useState } from 'react';
import styled from 'styled-components';

function Title(props: any) {
    return <div> 
        {props.title}    
    </div>

}

const TitleBox = styled.div`
    display: flex;
    justify-content: center;
    width: 450px;
    padding: 20px;
`   

export default Title;