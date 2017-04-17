import {addTodo, findById, toggleTodo, newId, updateTodo, updateTodoId, removeTodo, filterTodos} from './todoHelpers'

test('addTodo should add the passed todo to the list', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
  ]
  const newTodo = {id:3, name: 'three', isComplete: false}
  const expected = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = addTodo(startTodos, newTodo)

  expect(result).toEqual(expected)
  expect(result).not.toBe(startTodos)

})

test('findById should return the expected item from an array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const expected = {id:2, name: 'two', isComplete: false}
  const result = findById(2, startTodos)
  expect(result).toEqual(expected)
})

test('toggleTodo should toggle the isComplete prop of a todo', () => {
  const startTodo = {id:2, name: 'two', isComplete: false}
  const expected = {id:2, name: 'two', isComplete: true}
  const result = toggleTodo(startTodo)
  expect(result).toEqual(expected)
})

test('toggleTodo should not mutate the original todo', () => {
  const startTodo = {id:2, name: 'two', isComplete: false}
  const result = toggleTodo(startTodo)
  expect(result).not.toBe(startTodo)
})

test('newId should swap the id prop of a todo', () => {
  const startTodo = {id:2, name: 'two', isComplete: false}
  const expected = {id:3, name: 'two', isComplete: false}
  const result = newId(3, startTodo)
  expect(result).toEqual(expected)
})

test('newId should not mutate the original todo', () => {
  const startTodo = {id:2, name: 'two', isComplete: false}
  const result = newId(3, startTodo)
  expect(result).not.toBe(startTodo)
})

test('updateTodo should update an item by id', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const updatedTodo = {id:2, name: 'two', isComplete: true}
  const expectedTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).toEqual(expectedTodos)
})

test('updateTodo should not mutate the original array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const updatedTodo = {id:2, name: 'two', isComplete: true}

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).not.toBe(startTodos)
})

test('updateTodoId should update an item by id', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const updatedTodo = {id:1, name: 'one', isComplete: true}
  const expectedTodos = [
    {id:1, name: 'one', isComplete: true},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = updateTodoId(startTodos, 1, updatedTodo)

  expect(result).toEqual(expectedTodos)
})

test('updateTodoId should not mutate the original array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const updatedTodo = {id:1, name: 'one', isComplete: true}

  const result = updateTodoId(startTodos, updatedTodo)

  expect(result).not.toBe(startTodos)
})

test('removeTodo should remove an item by id', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const targetId = 2
  const expectedTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = removeTodo(startTodos, targetId)
})

test('filterTodos should return all items for the root route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = filterTodos(startTodos, '/')

  expect(result).toEqual(startTodos)
})

test('filterTodos should return only completed items for the complete route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]
  const expectedTodos = [
    {id:2, name: 'two', isComplete: true}
  ]

  const result = filterTodos(startTodos, '/complete')

  expect(result).toEqual(expectedTodos)
})

test('filterTodos should return only completed items for the complete route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]
  const expectedTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = filterTodos(startTodos, '/active')

  expect(result).toEqual(expectedTodos)
})
