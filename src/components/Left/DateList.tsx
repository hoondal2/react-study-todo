import React, { useState } from 'react';
import styled from 'styled-components';

type props = {
    setTitle(title: string) : void  
    dateArr : string[] | []
}


function DateList({setTitle, dateArr}: props) {
    
    const clickEvent = (date:string)=> {
        setTitle(date)
    }

    // const modStyle = () => {
    //     const todoListParentEl:any = document.getElementById("todo");
    //     const todoListEl:any = todoListParentEl.children;
    
    //     for (let i = 0; i < todoListEl.length; i++) {
    //         if (todoListEl[i].className === props.date) {
    //             todoListEl[i].style.display = "block";
    //         } else {
    //             todoListEl[i].style.display = "none";
    //         }
    //     }
    // }

    return <div className= 'date-list' style ={{color: '#333'}}>
                {dateArr.map((date: any) => (<Li key = {date} onClick= {() => { clickEvent(date);}}>
                                                {date}  
                                            </Li>)) }
        </div>
}

const Li = styled.li`
    cursor: pointer;
`

export default DateList;