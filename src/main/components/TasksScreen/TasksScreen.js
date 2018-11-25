import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
import Pagination from "react-js-pagination";

import Layout from '../../Layout';
import BriefTask from '../BriefTask/BriefTask';
import './TasksScreen.scss';

class TasksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  componentDidMount() {
    console.log('did mount');
    this.props.fetchTasks(this.props.signIn.token);
  }

  render() {
    const { token } = this.props.signIn;
    const { tasks } = this.props.tasks;
    const { totalTasks } = this.props.tasks;

    console.log('component', tasks, totalTasks);

    return (
      <Layout
        debugScreenName="Экран списка задач"
        debugAuthToken={token}
      >
        <div className="tasks-screen">
          <div className="tasks-screen__tasks">
            {tasks.map((task) => <BriefTask key={task.id} {...task} />)}
          </div>
          <div className="tasks_screen__pagination">
            <Pagination
              activePage={this.state.activePage}
              totalItemsCount={totalTasks}
              itemsCountPerPage={3}
              pageRangeDisplayed={3}
              onChange={this.handlePageChange}
            />
            <div>
              Показано задач: 3 из {totalTasks}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TasksScreen;