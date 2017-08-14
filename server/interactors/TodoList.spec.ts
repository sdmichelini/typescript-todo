import TodoList from './TodoList'
import InMemoryTodoList from './InMemoryTodoList'

import { expect } from 'chai'

describe('Todo List Tests', () => {
    it('Should Return an Array of Todos', () => {
        let todoList: TodoList = new InMemoryTodoList()
        return todoList.getAllTodos().then(todos => {
            expect(todos).to.be.an('array')
        })
    })

    it('Should Add A Todo', () => {
        let todoList: TodoList = new InMemoryTodoList()
        return todoList.addTodo('Name', 'Description', new Date(), 'addedBy')
        .then(todo => {
            expect(todo.title).to.equal('Name')
            expect(todo.description).to.equal('Description')
            expect(todo).to.have.property('due')
            expect(todo).to.have.property('created')
            expect(todo.addedBy).to.equal('addedBy')
            expect(todo).to.have.property('id')
        })
    })

    describe('Persist the Todo', () => {
        let todoList: TodoList
        let id: number
        before(() => {
            todoList = new InMemoryTodoList()
            return todoList.addTodo('Name', 'Description', new Date(), 'addedBy')
            .then(todo => {
                id = todo.id
            })
        })

        it('should be in the list of todos', () => {
            return todoList.getAllTodos().then(todos => {
                let todosWithId = todos.filter(todo => {
                    return todo.id === id
                })
                expect(todosWithId.length).to.equal(1)
                let todoWithId = todosWithId[0]
                expect(todoWithId.title).to.equal('Name')
                expect(todoWithId.id).to.equal(id)
            })
        })

        it('should find the todo by the id', () => {
            return todoList.getTodoById(id).then(todoWithId => {
                expect(todoWithId.title).to.equal('Name')
                expect(todoWithId.description).to.equal('Description')
                expect(todoWithId.addedBy).to.equal('addedBy')
                expect(todoWithId.id).to.equal(id)
            })
        })
    })

    describe('Get Todo By ID', () => {
        it('should not find an id that does not exist', () => {
            let todoList: TodoList = new InMemoryTodoList()
            return todoList.getTodoById(-1).then(todo => {
                throw new Error('Should Have Failed')
            }).catch(err => {
                expect(err).to.not.equal(undefined)
            })
        })
    })

    describe('Delete a Todo By ID', () => {
        let todoList: TodoList
        let id: number
        before(() => {
            todoList = new InMemoryTodoList()
            return todoList.addTodo('Name', 'Description', new Date(), 'addedBy')
            .then(todo => {
                id = todo.id
            })
        })

        it('should delete the todo by ID', () => {
            return todoList.deleteTodo(id).then(result => {
                expect(result).to.equal(true)
            })
        })

        it('should no longer be able to delete that ID', () => {
            return todoList.deleteTodo(id).then(result => {
                expect(result).to.equal(false)
            })
        })
    })
})