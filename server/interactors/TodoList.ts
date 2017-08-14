import Todo from '../model/Todo'

/* eslint no-undef: 0 */
interface TodoList {
    getAllTodos() : Promise<Array<Todo>>
    getTodoById(id: number) : Promise<Todo>
    addTodo(
        title: String,
        description: String,
        due: Date,
        addedBy: String
    ) : Promise<Todo>
    deleteTodo(id: number) : Promise<boolean>
}

export default TodoList
