import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};
/**
 * Prop Types
 * @private
 */
const propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  todos: [],
};

/**
 * Todos component
 * @returns {ReactElement}
 */

const Summary = ({todos}) => {


  /**
   * Base CSS class
   */
  const baseCls = 'summary';
  let numberOfActive = 0;
  let actives;
  console.log('mich Summary actives array:',actives)

  actives = todos.filter(function(todo) {
    return todo.status === 'active';
  })

  numberOfActive = actives.length;


  return(
    <div className={baseCls}>
      <ul className="valign-wrapper">
          <li>
            {numberOfActive} tasks remaining
          </li>
          <li>
            Complete All
          </li>
      </ul>
    </div>
  )
}

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
