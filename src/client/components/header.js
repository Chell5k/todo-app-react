import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header';

  return (
    <div className={baseCls + " valign-wrapper flow-text"}>
        <Link to="/">MyTodos</Link>
    </div>
  )
};

export default Header;
