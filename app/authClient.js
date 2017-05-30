import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK} from 'admin-on-rest';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const {username, password} = params;
    const request = new Request('http://localhost:3000/Login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const getToken = new Request('http://localhost:3000/Token', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300 && response.status != 521) {
          throw new Error(response.statusText);
        }
        else if (response.status == 521) {

          throw new Error("Wrong username or password");

        }

        return response.json();
      })
      .then(response => {

        localStorage.setItem('userID', response[0].ID);
        fetch(getToken)
          .then(response => {
            return response.json()
          })
          .then(response => {
            localStorage.setItem('userToken', response.token.access_token)
          })
      })

  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('userID');
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('userID') ? Promise.resolve() : Promise.reject();
  }
  return Promise.reject('Unkown method');
}
