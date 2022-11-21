import classes from './MyModal.less'

/**
 * @module MyModal
 */

/**
 * Компонент - модальное окно
 * @param {any} children Элемент внутри модального окна
 * @param {boolean} visible Отвечает за видимость модального окна
 * @param {Function} setVisible Отвечает за изменение видимости модального окна
 * @returns {JSX}
 */
const MyModal = ({children, visible, setVisible}) => {
    
    const rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active)
    }

    return ( 
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
     );
}
 
export default MyModal;