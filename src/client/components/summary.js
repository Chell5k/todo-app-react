import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

const Summary = (props) => {
  /**
   * Base CSS class
   */
  const baseCls = 'summary';


  return(
    <div className={baseCls}>
      <ul className="valign-wrapper">
          <li>
            0 tasks remaining
          </li>
          <li>
            Complete All
          </li>
      </ul>
    </div>
  )
}

export default Summary;
