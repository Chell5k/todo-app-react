import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  console.log('mich Navbar activeLinkCls:',activeLinkCls);
  console.log('mich Navbar completedLinkCls:',completedLinkCls);

  return (
    <div className={baseCls}>
      <ul className="valign-wrapper">
        <li>
          <NavLink
            to="/"
            activeClassName={`${baseCls}__item--active`}
            className={`${baseCls}__item`}
            onClick={() => onClickFilter('')}
          >
            All
          </NavLink>
        </li>
        <li>
          <span
            className={activeLinkCls}
            onClick={() => onClickFilter('active')}
          >
            Active
          </span>
        </li>
        <li>
          <span
            className={completedLinkCls}
            onClick={() => onClickFilter('completed')}
          >
            Completed
          </span>
        </li>
      </ul>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
