import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_PROFILE,
  fetchProfileSuccess,
  fetchProfileFailure,
  FETCH_PROFILE_TASKS,
  fetchProfileTasksSuccess,
  fetchProfileTasksFailure,
  FETCH_USER,
  fetchUserSuccess,
  fetchUserFailure,
  fetchProfileUpdateSuccess,
  fetchProfileUpdateFailure,
  FETCH_PROFILE_UPDATE, FETCH_PROFILE_CHANGE_PASS, fetchProfileChangePassSuccess, fetchProfileChangePassFailure,
} from './actions';
import { signOutSuccess } from '../auth/actions';
import cookie from 'react-cookie';
import { NOCORS_URL, API_URL } from "../constants";

// Function for epics
async function getProfile(token) {
  try {
    const url = API_URL + '/api/user/profile?expand=time,status,created_at';
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('getProfile', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function getAllProfileTasks(token, workerId, page = null, perPage = null) {
  try {
    let url = API_URL + '/api/task/by-worker?worker_id=' + workerId;

    if(page != null && perPage != null){
      url = url + '&page=' + page + '&per-page=' + perPage;
    }
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    data.totalTasks = response.headers.get('X-Pagination-Total-Count');
    console.log('getProfileTasks', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function getUser(token, userId) {
  try {
    const url = API_URL + `/api/users/${userId}?expand=created_at`;
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('getUser', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function updateProfile(token, profileDetails) {
  try {
    const url = API_URL + `/api/user/update-profile`;
    const params = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(profileDetails)
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('updateProfile', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function changeProfilePassword(token, passwordDetails) {
  try {
    const url = API_URL + `/api/user/change-pass`;
    const params = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(passwordDetails)
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('change password', data);
    return data;
  } catch (e) {
    throw e;
  }
}


// Epics
function fetchProfileEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_PROFILE)
    .pipe(
      mergeMap((payload) => {
        return from(getProfile(payload.payload.token))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchProfileSuccess(response.data);
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        return fetchProfileFailure(response);
      }),
      catchError(error => {
        return of(fetchProfileFailure(error));
      })
    )
}

function fetchProfileUpdateEpic(action$) {
  console.log("profile update epic",action$);
  return action$
    .ofType(FETCH_PROFILE_UPDATE)
    .pipe(
      mergeMap((payload) => {
        return from(updateProfile(payload.payload.token, payload.payload.profileDetails))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchProfileUpdateSuccess(response);
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        return fetchProfileUpdateFailure(response);
      }),
      catchError(error => {
        return of(fetchProfileUpdateFailure(error));
      })
    )
}

function fetchProfileChangePassEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_PROFILE_CHANGE_PASS)
    .pipe(
      mergeMap((payload) => {
        return from(changeProfilePassword(payload.payload.token, payload.payload.passwordDetails))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchProfileChangePassSuccess(response);
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        return fetchProfileChangePassFailure(response);
      }),
      catchError(error => {
        return of(fetchProfileChangePassFailure(error));
      })
    )
}

function fetchUserEpic(action$) {
  return action$
    .ofType(FETCH_USER)
    .pipe(
      mergeMap((payload) => {
        return from(getUser(payload.payload.token, payload.payload.userId))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchUserSuccess(response.data);
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        return fetchUserFailure(response);
      }),
      catchError(error => {
        return of(fetchUserFailure(error));
      })
    )
}

function fetchProfileTasksEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_PROFILE_TASKS)
    .pipe(
      mergeMap((payload) => {
        return from(getAllProfileTasks(
          payload.payload.token,
          payload.payload.workerId,
          payload.payload.page,
          payload.payload.perPage
        ))
      }),
      map(response => {
        console.log(response);
        if(response.success) {
          return fetchProfileTasksSuccess(response.data, +response.totalTasks);
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        return fetchProfileFailure(response);
      }),
      catchError(error => {
        return of(fetchProfileTasksFailure(error));
      })
    )
}


export const epics = combineEpics(
  fetchProfileEpic,
  fetchUserEpic,
  fetchProfileTasksEpic,
  fetchProfileChangePassEpic,
  fetchProfileUpdateEpic
);