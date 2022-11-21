import { APP } from '../../store';
import classes from './TodoList.less'
import { getFirestore, collection} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react';
dayjs.extend(RelativeTime)

/**
 * @module TodoList
 */

/**
 * Компонент отображающий все todo в бд
 * @param {Function} openTodo Связывет todo в списке с todo в модальном окне  
 * @returns {JSX}
 */
const TodoList = ({openTodo}) => {
    const db = getFirestore(APP)
    const query = collection(db, 'todos') 
    const [todos, loading] = useCollectionData(query)
    const [now, setNow] = useState('')

    useEffect(() => {
        setNow(dayjs().format('DDMMYYYY'))
    }, [])

    /**
     * @param {string} date Дата завершения задачи 
     * @returns {int} Число, по которому определяется, истек ли срок задачи
     */
    const timeOut = (date) => {
        const date2 = dayjs(date).format('DDMMYYYY')
        return date2 - now
    }
    return ( 

        <div className={classes.List}>
            {loading && 'Загрузка...'}
            {loading ? '' : !todos ? '' : todos[0] ? '' : "Похоже тут пусто, добавьте задачу, чтобы она отобразилась"}
            {todos?.map((item, index) =>  
                <div key={Math.random()} 
                     className={classes.item}
                     onClick={() => openTodo({id: item.id,
                                              header: item.header, 
                                              description: item.description,
                                              date:item.date,
                                              file:item.file,
                                              complete: item.complete})
                              }>

                    <div className={classes.left}>
                        <span className={classes.header}>{index+1}.{item.header}</span>
                        <span className={classes.description}>{item.description}</span>
                    </div>

                    <div className={classes.right}>
                        <span className={classes.date}>Дата завершения: {dayjs(item.date).format('DD-MM-YYYY')}</span>
                        <span className={`${classes.completion} ${item.complete === 'Выполнено' ? classes.complete : null}`}>{timeOut(item.date) < 0 ? 'Срок истек' : item.complete}</span>
                    </div>
                </div>
                
                )}
        </div>
     );
}
 
export default TodoList;