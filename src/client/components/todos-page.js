import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';
import Summary from './summary';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: null,
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.putTodo = this.putTodo.bind(this);
  }

  /**
   * Component did mount. Get all the Todos. 'Read All'
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  /**
   * Add todo - 'C'
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection. 'U'
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Delete.
   *
   */

  removeTodo(todo) {
    api('DELETE', todo, this.deleteTodo(todo));
  }
  deleteTodo (json){
     const index = this.state.todos.findIndex(todo => {
      return todo.id === json.id;
    });
    this.updateTodos(
      [
        ...this.state.todos.slice(0, index),
        ...this.state.todos.slice(index + 1),
      ]
    );
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

    /**
   * Callback function to replace todo with results of fetching the todo PUT endpoint
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  putTodo(json) {
    const index = this.state.todos.findIndex(todo => {
      return todo.id === json.id;
    });

    this.updateTodos(
      [
        ...this.state.todos.slice(0, index),
        json,
        ...this.state.todos.slice(index + 1),
      ]
    );
  }

//Toggle todos
 toggleTodo(todo) {
    const newTodo = Object.assign({}, todo);
    newTodo.status = todo.status === 'complete' ? 'active' : 'complete';
    newTodo.archive = false;
    api('PUT', newTodo, this.putTodo(newTodo));
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    console.log('mich TodosPage this.state', this.state);
    return (
      <div className={this.baseCls}>

        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} />

        <Summary />

        <TodoForm onSubmit={this.addTodo} />

        <Todos
          filterBy={this.state.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
          deleteTodo={this.removeTodo}
          toggleTodo={this.toggleTodo}
        />
      </div>
    );
  }
}

export default TodosPage;
