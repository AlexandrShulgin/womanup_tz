import { useEffect, useState } from 'react';
import MyInput from '../../MyInput/MyInput';
import MyButton from '../MyButton/MyButton';
import classes from './OpenTodo.less'
import { getFirestore, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { APP } from '../../store';
import dayjs from 'dayjs'
import { getDownloadURL, getStorage, ref } from 'firebase/storage';


const OpenTodo = ({setVisible, currentTodoData}) => {
    
    const db = getFirestore(APP);

    const pushToDB = async (data) => {
        await setDoc(doc(db, "todos", `${data.date}${data.id}`), data)
    }

    useEffect(() => {
        setTodoData({id: currentTodoData.id,
                    header: currentTodoData.header, 
                    description: currentTodoData.description, 
                    date: currentTodoData.date, 
                    file: currentTodoData.file,
                    complete: currentTodoData.complete})

    },[currentTodoData])

    
    const [todoData, setTodoData] = useState({id: currentTodoData.id,
                                              header: currentTodoData.header, 
                                              description: currentTodoData.description, 
                                              date: currentTodoData.date, 
                                              file: currentTodoData.file,
                                              complete: currentTodoData.complete})
    
    
    const submitHandler = (e) => {
        e.preventDefault()
        pushToDB(todoData)
        setVisible(false)
        setTodoData({id: currentTodoData.id,
                     header: currentTodoData.header, 
                     description: currentTodoData.description, 
                     date: currentTodoData.date, 
                     file: currentTodoData.file,
                     complete: currentTodoData.complete})
    }
    

    
    

    const changeHandler = (e) => {
        const { id, value } = e.target
        setTodoData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const completeHandler = () => {
        setTodoData(prevState => ({
            ...prevState,
            complete: "Выполнено" 
        }))
        pushToDB(todoData)
    }


    const deleteHandler = async () => {
        await deleteDoc(doc(db, "todos", `${todoData.date}${todoData.id}`));
        setVisible(false)
    }


    const storage = getStorage(APP);
    todoData.file.map(item => {
        getDownloadURL(ref(storage, item)).then((res) => document.getElementById(item).setAttribute('href', res))
    })
    
    return (
        <div className={classes.openTodoContainer}>
            <div className={`${classes.todoInfo} ${todoData.complete === 'Выполнено' ?  classes.completeBorder : null}`}>
                <span className={classes.title}>Заголовок задачи:</span>
                <span className={classes.info}>{todoData.header}</span>
                <span className={classes.title}>Описание задачи:</span>
                <span className={classes.info}>{todoData.description}</span>
                <span className={classes.title}>Дата завершения задачи:</span>
                <span className={classes.info}>{dayjs(todoData.date).format('DD-MM-YYYY')}</span>
                <span className={classes.title}>Прикрепленные файлы:</span>
                <div className={classes.links}>
                    {!todoData.file[0] ? <div className={classes.info}>Файлов нет</div> : null}
                    {todoData.file.map((item, index) => <a className={classes.info} id={item} key={item} target={'_blank'} rel={'noreferrer'} href={''}>Файл{index+1}</a>)} 
                </div>
                <span>Двойной клик, чтобы выполнить</span>
                <MyButton className={classes.complete}
                          onClick={completeHandler}>
                    Задача выполнена
                </MyButton>
                <MyButton className={classes.delete}
                          onClick={deleteHandler}>
                    Удалить задачу
                </MyButton>

            </div>
            <form 
                className={classes.openTodoForm}
                onSubmit={submitHandler}>

                <span>Изменить задачу</span>
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

                
                <MyButton type={'submit'}>Изменить</MyButton>
            </form>
        </div>
     );
}
 
export default OpenTodo;

//Кнопка выполнить
//Кнопка удалить
//Отметки, если выполнено, просрочено.