import React, { Component } from 'react';
import {
  Row,
  Col, CardHeader, CardBody, Card,
} from "reactstrap";

import Layout from '../../../main/containers/Layout/Layout';
import './ProfileScreen.scss';
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import LoadingAnimation from "../../../global/components/LoadingAnimation/LoadingAnimation";
import BriefTask from "../../../main/components/BriefTask/BriefTask";
import TEPagination from "../../../global/components/TEPagination/TEPagination";
import {fetchProfileChangePass, fetchProfileUpdate} from "../../actions";


class ProfileScreen extends Component {

  constructor(props) {
    super(props);

    this.defaultPage = 1;
    this.defaultTaskPerPage = 5;

    this.state = {
      activePage: this.defaultPage,
    };
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
    this.props.fetchProfileTasks(this.props.signIn.token, this.props.signIn.id, pageNumber, this.defaultTaskPerPage);
  };

  handleProfileUpdate = (profileDetails) => {
    console.log('update profile');
    this.props.fetchProfileUpdate(this.props.signIn.token, profileDetails)
  };

  handleChangePassword = (passwordDetails) => {
    console.log('change pass');
    this.props.fetchProfileChangePass(this.props.signIn.token, passwordDetails);
  };


  componentDidMount() {
    this.props.fetchProfile(this.props.signIn.token);
    this.handlePageChange(this.defaultPage);
  }

  render() {

    const { token } = this.props.signIn;

    const profile = this.props.profile;

    const tasks = this.props.profileTasks.profileTasks;

    const totalTasks = this.props.profileTasks.totalTasks;

    return (
      <Layout
        debugScreenName="Экран профиля пользователя"
        debugAuthToken={token}
      >

        <div className="profile-screen">
          <Row>
          <Col md="4">
            {this.props.profile.fetching ?
              <LoadingAnimation/> :
              <ProfileInfo onProfileUpdate={this.handleProfileUpdate}
                           onChangePassword={this.handleChangePassword}
                           {...profile}/>}
          </Col>
            <Col md="8">
              <Card className="profile-screen__portfolio m-2">
                <CardHeader>Выполненные задачи</CardHeader>
                <CardBody>
                {this.props.profileTasks.fetching ? <LoadingAnimation/> : tasks.map((task) => <BriefTask key={task.id} {...task} />)}
                </CardBody>
              </Card>
              <div className="profile-screen__pagination">
                <div className="profile-screen__pagination_pages">
                  {this.props.profileTasks.fetching ?
                    null
                    :
                    <TEPagination
                      activePage={this.state.activePage}
                      totalItemsCount={totalTasks}
                      itemsCountPerPage={this.defaultTaskPerPage}
                      pageRangeDisplayed={3}
                      onChange={this.handlePageChange}
                    />}
                </div>
                <div className="profile-screen__pagination_totals">

                  {totalTasks ? 'Показана страница: ' + this.state.activePage + ' из ' + Math.ceil(totalTasks / this.defaultTaskPerPage) : null}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default ProfileScreen;