import React from 'react'
import PropTypes from 'prop-types'
import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
    const handleToggle = partial(props.handleToggle, props.id)
    const handleRemove = partial(props.handleRemove, props.id)
    const preventDefault = (event) => event.preventDefault()
    const completeClass = props.isComplete ? 'complete' : ''
    return (
      <li className={completeClass} onClick={handleToggle} onKeyPress={handleToggle} tabIndex="0">
        <span className='delete-item'><a href="#" onClick={handleRemove}>x</a></span>
        <input type="checkbox" tabIndex="-1" className="checkbox" id={props.id}
          onChange={handleToggle} checked={props.isComplete}/>
        <label htmlFor={props.id} onClick={preventDefault}> {props.name} </label>
      </li>
    )
}

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number.isRequired
}
