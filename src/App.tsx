import React, { useCallback, useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import ResponsiveAppBar from './components/Header/AppBar';
import Right from './components/Right/Right';
import Left from './components/Left/Left';
import MiddleHeader from './components/Header/MiddleHeader';
import styled from 'styled-components';
import '@fontsource/roboto/400.css';
import { FileUpload, FileUploadProps } from './components/File/FileUpload';

import './App.css';

type todoObjType = {
  id: string; date: string; todo: string; isDone: boolean;
}

const fileUploadProp: FileUploadProps = {
  imageButton: true,
  accept: 'image/*',
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
          event.target.files !== null &&
          event.target?.files?.length > 0
      ) {
          console.log(`Saving ${event.target.value}`)
      }
  },
  onDrop: (event: React.DragEvent<HTMLElement>) => {
      console.log(`Drop ${event.dataTransfer.files[0].name}`)
  },
}


function App() {

  // hooks? useEffect => state가 변할 때 어떤 콜백 실행할지 정할 수 있음
  // add버튼 클릭 시 날짜 리스트 생성
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<todoObjType[]>([]);

  const onDragEnd = useCallback((result:any) => {
      // TODO
  },[]);

  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <ContainerWrap>
        <ContentWrap>
          <MiddleHeader></MiddleHeader>
          <ContainerWrap>
            <Left title= { title } setTitle= { setTitle }></Left>
            <FileUpload {...fileUploadProp}/>
            <DashedBar></DashedBar>
            <DragDropContext onDragEnd={onDragEnd}>
              <Right title= { title } todos= {todos} setTodos= {setTodos}></Right>
            </DragDropContext>
          </ContainerWrap>
        </ContentWrap>
      </ContainerWrap>
    </div>
  );
}

const ContainerWrap = styled.div`
  display: flex;
  justify-content: center;
`

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 900px;
  margin: 40px; 
  padding: 50px;
  background-color: #fff;
`

const DashedBar = styled.div`
  border-left: 3px dashed #333;
  height: 700px;
  left: 50%;
`
export default App;
