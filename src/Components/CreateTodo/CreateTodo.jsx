import { useState } from 'react';
import MyInput from '../../MyInput/MyInput';
import MyButton from '../MyButton/MyButton';
import classes from './CreateTodo.less'
import dayjs from 'dayjs'
import { collection, getFirestore, addDoc } from 'firebase/firestore';
import { APP } from '../../store';

const db = getFirestore(APP);

const pushToDB = async (data) => {
    const col = collection(db, 'todos')
    await addDoc(col, data)
}

const CreateTodo = ({setVisible}) => {

    const [todoData, setTodoData] = useState({header: '', description: '', date: '', file: ''})
        const submitHandler = (e) => {
            e.preventDefault()
            pushToDB(todoData)
            setVisible(false)
            setTodoData({header: '', description: '', date: '', file: ''})
    }
    
    const changeHandler = (e) => {
        const { id, value } = e.target
        setTodoData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    return ( 
        <form 
            className={classes.createTodo}
            onSubmit={submitHandler}>

            <span>Новая задача</span>
            <MyInput id={'header'}
                     caption={'Заголовок'}
                     value={todoData.header}
                     onChange={changeHandler}
                     required={'required'}/>
            <>
            <label htmlFor='description'>Описание</label>
            <textarea id={'description'}
                      value={todoData.description}
                      onChange={changeHandler}>
            </textarea>
            </>
            <MyInput id={'date'}
                     caption={'Дата завершения'}
                     type={'date'}
                     value={todoData.date}
                     onChange={changeHandler}
                     required={'required'}/>

            <MyInput id={'file'} 
                     caption={'Прикрепить файл(ы)'} 
                     type={'file'}
                     value={todoData.file}
                     onChange={changeHandler}/>
            <MyButton type={'submit'}>Создать</MyButton>
        </form>
     );
}
 
export default CreateTodo;