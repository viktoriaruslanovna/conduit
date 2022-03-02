import { userStorage } from './userStorage.js';
import { changeTab } from '../index.js';
import { createElement } from './creator.js';

const baseUrl = 'https://conduit-api-realworld.herokuapp.com/api';

//не меняется email при patch
//get
const makeFetch = async (e, method, url) => {
  e.preventDefault();
  const values = Object.fromEntries(new FormData(e.target).entries());

  let body = {};
  const token = userStorage.get().token;
  const { image, bio, email, password, username } = values;

  if (!email) {
    const { title, description, bodyArticle, tagList } = values;
    body = {
      article: {
        title: title,
        token: token,
        description: description,
        body: bodyArticle,
        tagList: [tagList],
      },
    };
  } else
    body = {
      user: {
        token: token,
        bio: bio,
        image: image,
        email: email,
        password: password,
        username: username,
      },
    };
  const result = await method(url, body);
  if ('errors' in result) {
    const lastError = document.querySelectorAll('.errors');
    if (lastError.length > 0) {
      lastError[0].remove();
    }
    const errors = createElement('errors', 'li');
    errors.textContent = result.errors.body;
    document.querySelector('.form').prepend(errors);
  } else {
    console.log('registered');
    if (result.user) {
      userStorage.set(result.user);
    } else {
      if (result.username) {
        userStorage.set(result);
      }
    }
    changeTab(userStorage.get().username);
  }
};

const fetcher = (method, url, body) => {
  const token = userStorage.get().token;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (method !== 'GET') {
    config.body = JSON.stringify(body);
  }
  config.headers.Authorization = 'Token ' + token;
  // if (method === 'PATCH') {
  //   config.headers.Authorization = 'Token ' + token;
  //   console.log(config.headers);
  // }
  return fetch(baseUrl + url, config).then(async result => {
    const code = Number(result.status);
    result = await result.json();
    // if (code >= 299) {
    //   throw res;
    // }
    // return res;
    // console.log(result);
    return result;
  });
};

export const myFetch = {
  get: url => fetcher('GET', url),
  post: (url, body) => fetcher('POST', url, body),
  delete: (url, body) => fetcher('DELETE', url, body),
  put: (url, body) => fetcher('PATCH', url, body),
};
export { makeFetch };
