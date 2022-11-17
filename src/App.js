import classes from "./App.less"
import TodoList from "./Components/TodoList";

const App = () => {
  return (
    <div className={classes.Content}>
      <TodoList/>
    </div> 
   );
}
 
export default App;