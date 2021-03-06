import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import cookie from 'react-cookie';
import {
  VERIFY_USERNAME_PASSWORD, REGISTER_NEWUSER, SIGNOUT,
  verifyUsernamePasswordSuccess, verifyUsernamePasswordFailure,
  registerNewUserSuccess, registerNewUserFailure,
  signOutSuccess, signOutFailure,
} from './actions';
import { NOCORS_URL, API_URL, COOKIE_LIFETIME } from '../constants';


// Function for epic
async function userAuth(username, password, rememberMe) {
  try {
    const url = API_URL + '/api/site/login';
    const body = {
      username,
      password,
    };
    const params = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();
    data.rememberMe = rememberMe;

    console.log('userAuth', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function userRegister(fullname, username, password, email) {
  try {
    const url = API_URL + '/api/site/signup';
    const body = {
      full_name: fullname,
      username,
      password,
      email,
    };
    const params = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('userRegister', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function userLogout(token) {
  try {
    const url = API_URL + '/api/site/logout';
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    console.log(params);

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('userLogout', data);
    return data;
  } catch (e) {
    throw e;
  }
}

// Epics
function verifyUsernamePasswordEpic(action$) {
  return action$
    .ofType(VERIFY_USERNAME_PASSWORD)
    .pipe(
      mergeMap((payload) => {
        console.log(payload);
        return from(userAuth(payload.payload.username, payload.payload.password, payload.payload.rememberMe))
      }),
      map(response => {
        if (response.success) {
          console.log('from inside epic', response);
          if (response.rememberMe) {
            cookie.save('time-exchange-signin', { id: response.data.id, token: response.data.token, username: response.data.username }, { path: '/', maxAge: COOKIE_LIFETIME });
          }
          return verifyUsernamePasswordSuccess(response.data.id, response.data.token, response.data.username);
        } else {
          return verifyUsernamePasswordFailure(response.data);
        }
      }),
      catchError(error => {
        return of(verifyUsernamePasswordFailure(error));
      })
    )
}

function registerNewUserEpic(action$) {
  console.log(action$);
  return action$
    .ofType(REGISTER_NEWUSER)
    .pipe(
      mergeMap((payload) => {
        console.log(payload);
        return from(userRegister(payload.payload.fullname, payload.payload.username, payload.payload.password, payload.payload.email))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return registerNewUserSuccess(response.data.id, response.data.token, response.data.username);
        } else {
          return registerNewUserFailure(response.data);
        }
      }),
      catchError(error => {
        return of(registerNewUserFailure(error));
      })
    )
}

function signOutEpic(action$) {
  return action$
    .ofType(SIGNOUT)
    .pipe(
      mergeMap((payload) => {
        console.log(payload);
        return from(userLogout(payload.payload.token));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
        }
        return signOutFailure(response.data);
      }),
      catchError(error => {
        return of(signOutFailure(error));
      })
    )
}

export const epics = combineEpics(
  verifyUsernamePasswordEpic,
  registerNewUserEpic,
  signOutEpic,
);
