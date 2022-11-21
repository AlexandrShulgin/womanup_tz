import classes from "./App.less"
import TodoList from "./Components/TodoList/TodoList";
import 'firebase/firestore'
import MyModal from "./Components/MyModal/MyModal";
import { Component, useState } from "react";
import MyButton from "./Components/MyButton/MyButton";
import CreateTodo from "./Components/CreateTodo/CreateTodo";
import OpenTodo from "./Components/OpenTodo/OpenTodo";


/**
 * Главный компонент приложения
 * @module App
 */
const App = () => {

  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState('')  

  
  /** 
  * @function createTodo 
  * Вставляет в контентную часть модального окна компонент <CreateTodo/>
  */
  const createTodo = () => {
    setModalContent(<CreateTodo setVisible={setModal}/>)
    setModal(true)
  }
  /** 
  * @function openTodo 
  * Вставляет в контентную часть модального окна компонент <OpenTodo/>
  */
  const openTodo = (data) => {
    setModalContent(<OpenTodo setVisible={setModal} currentTodoData={data}/>)
    setModal(true)
  }

  return (
    <div className={classes.Content}>
      <MyButton 
        className={classes.addButton}
        onClick={createTodo}>
        Добавить задачу
      </MyButton>
      <TodoList openTodo={openTodo}/>
      <MyModal visible={modal} setVisible={setModal}>
        {modalContent}
      </MyModal>
    </div> 
   );
}
 
export default App;