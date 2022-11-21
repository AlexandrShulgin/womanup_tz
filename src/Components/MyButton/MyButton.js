import classes from './MyButton.less'

/**
 * @module MyButton
 */

/**
 * Компонент - кнопка
 * @param {any} children Элемент внутри кнопки
 * @param {any} props Свойства, передаваемые кнопке 
 * @returns {JSX} 
 */
const MyButton = ({children, ...props}) => {
    return ( 
        <button {...props} className={[classes.myButton, props.className].join(' ')}>
            {children}
        </button>
     );
}
 
export default MyButton;