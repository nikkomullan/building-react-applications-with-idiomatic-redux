import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../actions'
import { getVisibleTodos, getIsFetching } from '../reducers'
import TodoList from './TodoList'

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData() {
    const { filter, fetchTodos, requestTodos } = this.props
    requestTodos(filter)
    fetchTodos(filter)
  }

  render() {
    const { toggleTodo, isFetching, todos } = this.props
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.string,
  requestTodos: PropTypes.func,
  fetchTodos: PropTypes.func,
  toggleTodo: PropTypes.func,
  isFetching: PropTypes.bool,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter,
    isFetching: getIsFetching(state, filter),
  }
}

VisibleTodoList = withRouter(connect(mapStateToProps, actions)(VisibleTodoList))

export default VisibleTodoList
