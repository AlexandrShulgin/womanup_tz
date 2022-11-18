import classes from './MyButton.less'

const MyButton = ({children, ...props}) => {
    return ( 
        <button {...props} className={[classes.myButton, props.className].join(' ')}>
            {children}
        </button>
     );
}
 
export default MyButton;