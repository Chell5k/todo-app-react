import PropTypes from 'prop-types';
import React from 'react';

import { api } from '../helpers/api';
import Todo from './todo';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  deleteTodo: PropTypes.func,
  toggleTodo: PropTypes.func
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  deleteTodo: noop,
  toggleTodo: noop
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, deleteTodo, toggleTodo }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todos';

  /**
   * Callback function to delete todo from todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  // const deleteTodo = json => {
  //   const index = todos.findIndex(todo => {
  //     return todo.id === json.id;
  //   });

  //   updateTodos(
  //     [
  //       ...todos.slice(0, index),
  //       ...todos.slice(index + 1),
  //     ]
  //   );
  // }

  /**
   * Callback function to replace todo with results of fetching the todo PUT endpoint
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  // const putTodo = json => {
  //   const index = todos.findIndex(todo => {
  //     return todo.id === json.id;
  //   });

  //   updateTodos(
  //     [
  //       ...todos.slice(0, index),
  //       json,
  //       ...todos.slice(index + 1),
  //     ]
  //   );
  // }

  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = todo => {
    // api('DELETE', todo, deleteTodo);
    deleteTodo(todo);
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickTodo = todo => {
    toggleTodo(todo);
  }

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
  const renderTodos = () => {
    if (!Array.isArray(todos)) {
      return null;
    }

    return todos.map(todo => {
      let filtered;
      switch (filterBy) {
        case 'active':
          filtered = todo.status === 'complete';
          break;
        case 'completed':
          filtered = todo.status !== 'complete';
          break;
        default:
          filtered = false;
      }
      console.log('todos: todos.map todo, filtered:',todo, filtered)
      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={onClickDelete.bind(this, todo)}
          onClickTodo={onClickTodo.bind(this, todo)}
          status={todo.status}
          text={todo.text}
        />
      );
    })
  }

  return (
    <ul className={baseCls + ' collection'}>
      {renderTodos()}
    </ul>
  )
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;
