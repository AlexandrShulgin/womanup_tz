import classes from './MyInput.less'

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