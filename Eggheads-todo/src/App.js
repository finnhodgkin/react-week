import React, { Component } from 'react'
import './App.css'
import {TodoForm, TodoList, Footer} from './components/todo'
import {addTodo, generateId, findById, newId, toggleTodo, updateTodo, updateTodoId, removeTodo, filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'
import PropTypes from 'prop-types'
import {loadTodos, createTodo, saveTodo, deleteTodo} from './lib/todoService'

class App extends Component {
  state = {
    todos: [],
    currentTodo: ''
  }

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(({todos}) => this.setState({todos}))
  }

  handleRemove = (id, event) => {
    event.preventDefault()
    event.stopPropagation()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })
    deleteTodo(id)
      .then(() => this.showTempMessage('Todo removed'))
  }

  handleToggle = (id, key) => {
    if (key.charCode && key.charCode !== 13) { return }

    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({ todos: updatedTodos })
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo updated'))
  }

  handleReplaceId = (id, dbId) => {
    const getUpdatedTodos = pipe(findById, partial(newId, dbId), partial(updateTodoId, this.state.todos, id))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({ todos: updatedTodos })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newId = generateId()
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
    const updateTodos = addTodo(this.state.todos, newTodo)

    this.setState({
      todos: updateTodos,
      currentTodo: '',
    })
    createTodo(newTodo)
      .then(({ id }) => {
        this.handleReplaceId(newId, id)
        this.showTempMessage('Todo added')
      })
  }

  showTempMessage = (msg) => {
    this.setState({
      message: msg,
      errorMessage: ''
    })
    setTimeout(() => this.setState({ message: '' }), 2500)
  }

  showErrorMessage = (msg) => {
    this.setState({
      message: '',
      errorMessage: msg
    })
    setTimeout(() => this.setState({ errorMessage: '' }), 2500)
  }

  handleEmptySubmit = (event) => {
    event.preventDefault()
    this.showErrorMessage('Please supply a todo text')
  }

  handleInputChange = (event) => {
    this.setState({
      currentTodo: event.target.value,
      errorMessage: ''
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)

    return (
      <div className="App">
        <div className="App-header">
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          <div className="Todo-message">
            {this.state.message && <span className='success'>{this.state.message}</span>}
            {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          </div>
          <TodoForm handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}/>
          <TodoList handleToggle={this.handleToggle}
            todos={displayTodos}
            handleRemove={this.handleRemove}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
