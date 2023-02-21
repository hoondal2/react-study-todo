import React, { useState } from 'react';
import styled from 'styled-components'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro';
import { TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MoreTime } from '@mui/icons-material';
import Button from '@mui/material/Button';
import DateList from './DateList';
import moment from 'moment';
import { CloudUpload } from '@mui/icons-material'


type props = {
    title : string | ''
    setTitle(title: string) : void  
}

function Left({title, setTitle} : props){
    const [todoStartDate, setTodoStartDate] = useState<moment.Moment|null>(null);
    const [dateArr, setDateArr] = useState<string[]>([]);

    const createDateList = () => {
        const customDate = todoStartDate?.format('YYYY-MM-DD') || '';    
        const dateArr_copy = [...dateArr]; // 내부도 참조형이면 >> 어렵 deepCopy / lodash

        if(dateArr.includes(customDate)){
            alert('이미 있는 날짜입니다');
            return;
        };
    
        dateArr_copy.push(customDate);
        setDateArr(dateArr_copy);
    }

    return <LeftWrap>
    <ContentWrap>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Choose Date"
          value={todoStartDate}
          onChange={(date) => {
            setTodoStartDate(date); 
            console.log({todoStartDate});
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button 
        variant="contained" 
        color="success" 
        endIcon={<MoreTime />} 
        onClick={() => {
          createDateList();
        }}
      >ADD</Button>
    </ContentWrap>
      <DateList dateArr ={dateArr} setTitle = {setTitle}></DateList>
    </LeftWrap>
}

const LeftWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 450px;
`

const ContentWrap = styled.div`
    display: flex;
    width: 450px;
    justify-content: space-evenly;
    padding: 20px;
`

export default Left;