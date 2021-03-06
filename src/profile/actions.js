const MODULE_NAME = 'PROFILE';

export const FETCH_PROFILE = `${MODULE_NAME}/FETCH_PROFILE`;
export const FETCH_PROFILE_SUCCESS = `${MODULE_NAME}/FETCH_PROFILE_SUCCESS`;
export const FETCH_PROFILE_FAILURE = `${MODULE_NAME}/FETCH_PROFILE_FAILURE`;

export const FETCH_PROFILE_TASKS = `${MODULE_NAME}/FETCH_PROFILE_TASKS`;
export const FETCH_PROFILE_TASKS_SUCCESS = `${MODULE_NAME}/FETCH_PROFILE_TASKS_SUCCESS`;
export const FETCH_PROFILE_TASKS_FAILURE = `${MODULE_NAME}/FETCH_PROFILE_TASKS_FAILURE`;

export const FETCH_PROFILE_UPDATE = `${MODULE_NAME}/FETCH_PROFILE_UPDATE`;
export const FETCH_PROFILE_UPDATE_SUCCESS = `${MODULE_NAME}/FETCH_PROFILE_UPDATE_SUCCESS`;
export const FETCH_PROFILE_UPDATE_FAILURE = `${MODULE_NAME}/FETCH_PROFILE_UPDATE_FAILURE`;

export const FETCH_PROFILE_CHANGE_PASS = `${MODULE_NAME}/FETCH_PROFILE_CHANGE_PASS`;
export const FETCH_PROFILE_CHANGE_PASS_SUCCESS = `${MODULE_NAME}/FETCH_PROFILE_CHANGE_PASS_SUCCESS`;
export const FETCH_PROFILE_CHANGE_PASS_FAILURE = `${MODULE_NAME}/FETCH_PROFILE_CHANGE_PASS_FAILURE`;

export const FETCH_USER = `${MODULE_NAME}/FETCH_PROFILE`;
export const FETCH_USER_SUCCESS = `${MODULE_NAME}/FETCH_USER_SUCCESS`;
export const FETCH_USER_FAILURE = `${MODULE_NAME}/FETCH_USER_FAILURE`;



// actions profile info
export function fetchProfile(token) {
  return {
    type: FETCH_PROFILE,
    payload: { token },
  };
}

export function fetchProfileSuccess(profile) {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: { profile },
  };
}

export function fetchProfileFailure(response) {
  return {
    type: FETCH_PROFILE_FAILURE,
    payload: { status: response },
  };
}

// actions profile update
export function fetchProfileUpdate(token, profileDetails) {
  return {
    type: FETCH_PROFILE_UPDATE,
    payload: { token , profileDetails },
  };
}

export function fetchProfileUpdateSuccess( response ) {
  return {
    type: FETCH_PROFILE_UPDATE_SUCCESS,
    payload: { result: response, profile: response.data },
  };
}

export function fetchProfileUpdateFailure(response) {
  return {
    type: FETCH_PROFILE_UPDATE_FAILURE,
    payload: { result: response },
  };
}

// actions profile change password
export function fetchProfileChangePass(token, passwordDetails) {

  return {
    type: FETCH_PROFILE_CHANGE_PASS,
    payload: { token, passwordDetails },
  };
}

export function fetchProfileChangePassSuccess(response) {
  return {
    type: FETCH_PROFILE_CHANGE_PASS_SUCCESS,
    payload: { result: response },
  };
}

export function fetchProfileChangePassFailure(response) {
  return {
    type: FETCH_PROFILE_CHANGE_PASS_FAILURE,
    payload: { result: response },
  };
}

//actions profile tasks
export function fetchProfileTasks(token, workerId, page, perPage) {
  return {
    type: FETCH_PROFILE_TASKS,
    payload: { token, workerId, page, perPage },
  };
}

export function fetchProfileTasksSuccess(profileTasks, totalTasks) {
  return {
    type: FETCH_PROFILE_TASKS_SUCCESS,
    payload: { profileTasks, totalTasks },
  };
}

export function fetchProfileTasksFailure(response) {
  return {
    type: FETCH_PROFILE_TASKS_FAILURE,
    payload: { status: response },
  };
}

// actions user info
export function fetchUser(token, userId) {
  return {
    type: FETCH_USER,
    payload: { token, userId },
  };
}

export function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { user },
  };
}

export function fetchUserFailure(response) {
  return {
    type: FETCH_USER_FAILURE,
    payload: { status: response },
  };
}


