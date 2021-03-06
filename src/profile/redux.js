import { combineReducers } from 'redux';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_TASKS,
  FETCH_PROFILE_TASKS_SUCCESS,
  FETCH_PROFILE_TASKS_FAILURE,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_PROFILE_UPDATE,
  FETCH_PROFILE_UPDATE_SUCCESS,
  FETCH_PROFILE_UPDATE_FAILURE,
  FETCH_PROFILE_CHANGE_PASS,
  FETCH_PROFILE_CHANGE_PASS_SUCCESS, FETCH_PROFILE_CHANGE_PASS_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultProfileState = {
  profile: '',
  updateProfile: false,
  changePass: false,
  fetching: false,
  result: null
};

const defaultProfileTasks = {
  profileTasks: [],
  fetching: false,
};



const defaultUserState = {
  user: '',
  fetching: false,
};




function profile(state = defaultProfileState, action) {
  switch(action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        fetching: true,
        result: null
      };

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        fetching: false,
      };

    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case FETCH_PROFILE_UPDATE:
      return {
        ...state,
        updateProfile: true,
        result: null
      };
    case FETCH_PROFILE_UPDATE_SUCCESS:
      return{
        ...state,
        profile: action.payload.profile,
        updateProfile: false,
        result: action.payload.result
      };
    case FETCH_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        updateProfile: false,
        result: action.payload.result,
      };

    case FETCH_PROFILE_CHANGE_PASS:
      return {
        ...state,
        changePass: true,
        result: null
      };
    case FETCH_PROFILE_CHANGE_PASS_SUCCESS:
      return {
        ...state,
        changePass: false,
        successChangePass: true,
        result: action.payload.result
      };
    case FETCH_PROFILE_CHANGE_PASS_FAILURE:
      return {
        ...state,
        changePass: false,
        successChangePass: false,
        result: action.payload.result,
      };


    default:
      return state;
  }
}

function user(state = defaultUserState, action) {
  switch(action.type) {
    case FETCH_USER:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_USER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        fetching: false,
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}

function profileTasks(state = defaultProfileTasks, action) {
  switch (action.type) {
    case FETCH_PROFILE_TASKS:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_PROFILE_TASKS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        profileTasks: action.payload.profileTasks,
        totalTasks: action.payload.totalTasks,
        fetching: false,
      }

    case FETCH_PROFILE_TASKS_FAILURE:
      return {
        ...state,
        fetching: false,
      }

    default:
      return state;
  }
}




export const reducer = combineReducers({
  profile,
  profileTasks,
  user
});
