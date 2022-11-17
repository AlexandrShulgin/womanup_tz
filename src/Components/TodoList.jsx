const TodoList = () => {
    
    const todos = [
        {id: 1, header: 'h1', description: 'desc1', date: '11-10-2000', files: "123"},
        {id: 2, header: 'h2', description: 'desc2', date: '12-10-2000', files: "123"},
        {id: 3, header: 'h3', description: 'desc3', date: '13-10-2000', files: "123"},
        {id: 4, header: 'h4', description: 'desc4', date: '14-10-2000', files: "123"},
        {id: 5, header: 'h5', description: 'desc5', date: '15-10-2000', files: "123"},

    ]
    
    return ( 
        <div className="List">
            {todos.map(item => 
                
                <div className="ListItem">
                    {item.id}
                    {item.header}
                    {item.description}
                    {item.date}
                </div>

                )}
        </div>
     );
}
 
export default TodoList;