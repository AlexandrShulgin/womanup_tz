import classes from "./App.less"
import TodoList from "./Components/TodoList/TodoList";
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import MyModal from "./Components/MyModal/MyModal";
import { useState } from "react";
import MyButton from "./Components/MyButton/MyButton";
import CreateTodo from "./Components/CreateTodo/CreateTodo";

const App = () => {

  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState('')

  

  const createTodo = () => {
    setModalContent(<CreateTodo setVisible={setModal}/>)
    setModal(true)
  }

  return (
    <div className={classes.Content}>
      <MyButton 
        className={classes.addButton}
        onClick={createTodo}>
        Добавить задачу
      </MyButton>
      <TodoList/>
      <MyModal visible={modal} setVisible={setModal}>
        {modalContent}
      </MyModal>
    </div> 
   );
}
 
export default App;