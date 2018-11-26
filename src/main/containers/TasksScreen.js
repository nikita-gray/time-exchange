import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TasksScreen from '../components/TasksScreen/TasksScreen';
import { signOut } from '../../auth/actions';
import { fetchTasks } from '../actions';

function mapStateToProps(state) {
  return {
    ...state.auth,
    ...state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signOut,
      fetchTasks,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksScreen);