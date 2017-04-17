export const addTodo = (list, item) => [...list, item]

export const generateId = () => Math.floor(Math.random()*100000)

export const findById = (id, list) => list.find(item => item.id === id)

export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete})

export const newId = (id, todo) => ({...todo, id: id})

export const updateTodoId = (list, id, updated) => {
  const updatedIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ]
}

export const updateTodo = (list, updated) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id)
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ]
}

export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex + 1)
  ]
}

export const filterTodos = (todos, route) => {
  switch(route){
    case '/active':
      return todos.filter(todo => !todo.isComplete)
    case '/complete':
      return todos.filter(todo => todo.isComplete)
    default:
      return todos
  }
}
