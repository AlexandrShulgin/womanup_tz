import { useState } from 'react';
import MyInput from '../../MyInput/MyInput';
import MyButton from '../MyButton/MyButton';
import classes from './CreateTodo.less'
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { getStorage } from 'firebase/storage';
import { APP } from '../../store';
import { v4 as uuidv4 } from 'uuid';

/**
 * @module CreateTodo
 */

/**
 * @param {boolean} setVisible Отвечает за видимость модального окна
 */
const CreateTodo = ({setVisible}) => {

    const db = getFirestore(APP);

    /**
     * Отправляет данные о todo в store
     * @function pushToDB
     * @async
     * @param {object} data Данные о todo 
     */
    const pushToDB = async (data) => {
    await setDoc(doc(db, "todos", `${data.date}${data.id}`), data)
    }
    
    const [fileURL, setFileURL] = useState()
    const [todoData, setTodoData] = useState({id: uuidv4(), header: '', description: '', date: '', complete: 'Не выполнено'})
    
    /**
     * Вызывается при отправке формы
     * @function submitHandler
     * @param {event} e  
     */
    const submitHandler = (e) => {
            e.preventDefault()
            const paths = []
            if (fileURL) {
                Array.from(fileURL).forEach(file => {
                    const path = `files/${todoData.id}/${file.name}`
                    paths.push(path)
                    const storageRef = ref(getStorage(), path);
                    uploadBytes(storageRef, file).then((snapshot) => {console.log('file uploaded')});
                });
            }
            pushToDB({id: todoData.id, header: todoData.header, description: todoData.description, date: todoData.date, file: paths, complete: todoData.complete})
            setVisible(false)
            setTodoData({id: uuidv4(), header: '', description: '', date: '', complete: 'Не выполнено'})
    }
    
    /**
     * Вызывается при изменении полей в инпутах
     * Меняет состояние TodoData
     * @function changeHandler
     * @param {event} e 
     */
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
                     multiple={'multiple'}
                     onChange={(e) => setFileURL(e.target.files)}/>
            <MyButton type={'submit'}>Создать</MyButton>
        </form>
     );
}
 
export default CreateTodo;