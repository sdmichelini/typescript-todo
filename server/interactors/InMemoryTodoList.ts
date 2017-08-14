import TodoList from './TodoList' // eslint-disable-line no-unused-vars
import Todo from '../model/Todo'

export default class InMemoryTodoList implements TodoList {
    todos: Array<Todo> // eslint-disable-line no-undef

    constructor () {
        this.todos = []
    }

    getAllTodos () : Promise<Array<Todo>> {
        return new Promise(resolve => {
            resolve(this.todos)
        })
    }
    getTodoById (id: number) : Promise<Todo> {
        return new Promise((resolve, reject) => {
            const todosWithId = this.todos.filter(todo => {
                return todo.id === id
            })
            if (todosWithId.length > 0) {
                resolve(todosWithId[0])
            } else {
                reject(new Error('Todo Not Found'))
            }
        })
    }
    addTodo (
        title: String,
        description: String,
        due: Date,
        addedBy: String
    ) : Promise<Todo> {
        return new Promise(resolve => {
            const newTodo : Todo = {
                title: title,
                description: description,
                due: due,
                created: new Date(),
                addedBy: addedBy,
                id: this.generateId()
            }
            this.todos.push(newTodo)
            resolve(newTodo)
        })
    }
    deleteTodo (id: number) : Promise<boolean> {
        return new Promise(resolve => {
            const initialLength = this.todos.length
            this.todos = this.todos.filter(todo => {
                return todo.id !== id
            })
            const finalLength = this.todos.length
            resolve((initialLength - finalLength) > 0)
        })
    }

    private generateId () : number {
        if (this.todos.length === 0) {
            return 1
        }
        return this.todos[this.todos.length - 1].id + 1
    }
}
