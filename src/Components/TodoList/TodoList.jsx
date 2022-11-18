import { APP } from '../../store';
import classes from './TodoList.less'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'

const TodoList = () => {
    const db = getFirestore(APP)
    const query = collection(db, 'todos')
    const [todos, loading, error] = useCollectionData(query)
    return ( 

        <div className={classes.List}>
            {loading && 'Загрузка...'}
            {error && 'Произошла ошибка'}
            {todos?.map((item, index) => 
                <div key={Math.random()} className={classes.item}>
                    <div className={classes.left}>
                        <span className={classes.header}>{index+1}.{item.header}</span>
                        <span className={classes.description}>{item.description}</span>
                    </div>

                    <div className={classes.right}>
                        <span className={classes.date}>Дата завершения: {item.date}</span>
                        <span className={classes.files}>{item.file && 'Прикреплен(ы) файл(ы)'}</span>
                    </div>
                </div>

                )}
        </div>
     );
}
 
export default TodoList;