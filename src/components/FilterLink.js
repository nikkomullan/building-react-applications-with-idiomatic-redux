import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === 'all' ? '/' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </Link>
)

FilterLink.propTypes = {
  filter: PropTypes.string,
  children: PropTypes.string,
}

export default FilterLink
