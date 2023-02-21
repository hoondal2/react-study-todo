import React, {useCallback, useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import styled from 'styled-components';
import { Checkbox, IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import uuid from 'react-uuid';
import { isAbsolute } from 'path';

type props = {
    title : string | ''
    todos : todoObjType[] | []
    setTodos(todos: Object | {}) : void
}

type todoObjType = {
    id: string; date: string; todo: string; isDone: boolean;
}

// a little function to help us with reordering the result
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const nextList = [...list];
    const [removed] = nextList.splice(startIndex, 1);
    nextList.splice(endIndex, 0, removed);
    return nextList;
  };

function Right({title, todos, setTodos}: props) {
    const [todoList, setTodoList] = useState<todoObjType[]>([]);
    const [text, setText] = useState('');
    const [checked, setChecked] = React.useState([false, true]);
    const dndRef = useRef<HTMLDivElement>(null);

    const onCreate = (todo:string)=> {
        if(!title){
            alert("날짜를 선택해주세요.");
            return;
        } 

        if(!todo){
            alert("todo를 입력해주세요.");
            return;
        } 

        const newTodoObj = {id: uuid(), date: title, todo: todo, isDone: false} 
        const newTodos = [newTodoObj, ...todos];
        setTodos(newTodos);
    }

    const changeTodoList = (init:boolean) => {
        let newTodoList: React.SetStateAction<todoObjType[]> = [];

        for(const todoObj of todos) {
            if(todoObj.date === title){
                newTodoList.push(todoObj);
            }
        }
        setTodoList(newTodoList);
    }

    useEffect(() => {
        changeTodoList(false);
        setText('');
      },[todos]);

    useEffect(() => {
        changeTodoList(true);
    },[title]);

    const changeText = (e: { currentTarget: { value: React.SetStateAction<string>; }; })=>{
        setText(e.currentTarget.value);
    }

    const completeTodo = () => {
        // 해당 todo의 isDone을 true로 바꾼다.
        // todos에서 id가 해당 todo의 id와 같은 todo를 가져온다 
    }

    const onDragEnd = (result: DropResult, provided: ResponderProvided) =>{
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;

        setTodoList(prevTempPosts =>
            reorder(prevTempPosts, result.source.index, result.destination!.index),
        );
    }

    // const onDragUpdate = (update) => {
    //     if (!update.destination) {
    //       return;
    //     }


    const grid = 8;
    const getItemStyle = (isDragging:boolean, draggableStyle:any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
      
        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",
      
        // styles we need to apply on draggables
        ...draggableStyle,
      });

    const getListStyle = (isDraggingOver:any) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 450,
    });

    return <FormWrap>
        <div>{title}</div>
        <form onSubmit={event => {
            event.preventDefault();
            // const text = event.currentTarget.todo.value;
            onCreate(text);
        }}>
            <input type='text' id='todo' name='todo' value={text} placeholder='todo 입력' onChange={changeText}/>
            <input type='submit' value = '등록'/>
        </form>
        <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    
                    {(provided,snapshot) => {
                        return <div 
                                {...provided.droppableProps} 
                                ref={provided.innerRef} 
                                style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {todoList.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {
                                                (provided, snapshot) => (
                                                    <div 
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps} 
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                    >
                                                        <div  id= {item.id} key={item.id}>
                                                        <Card sx={{ minWidth: 275 }} variant="outlined">
                                                            <Checkbox checked={checked[0]} inputProps={{ 'aria-label': 'controlled' }}/>
                                                                <span > {item.todo} </span>
                                                                <Tooltip title="Delete">
                                                                    <IconButton>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                        </Card>                                                                      
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                        </div>
                    }}
                </Droppable>   
        </DragDropContext>
        </FormWrap>
}

const FormWrap = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    width: 450px;
    color: #333; 
`;

export default Right;