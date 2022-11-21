import classes from './MyInput.less'

/**
 * @module MyInput
 */

/**
 * Компонент - инпут
 * @param {any} props Свойства передаваемые инпуту 
 * @returns {JSX}
 */
const MyInput = ({...props}) => {
    return ( 
        <div className={classes.myInputContainer}>
            <label> {props.caption}
                <input {...props}/>
            </label>
        </div>
        
     );
}
 
export default MyInput;