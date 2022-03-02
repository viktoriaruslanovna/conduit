import { createFormTab } from './tabs.js';
import { myFetch } from './fetch.js';
import { userStorage } from './userStorage.js';

const formTabData = {
  signIn: {
    title: 'Sign in',
    phrase: 'Need an account?',
    inputs: { email: 'Email', password: 'Password' },
    addBtn: { text: 'Sign in', method: myFetch.post, url: '/users/login' },
    defineTab: () => createFormTab(formTabData.signUp),
    //createinformationcontent
  },

  signUp: {
    title: 'Sign up',
    phrase: 'Have an account?',
    inputs: { username: 'Username', email: 'Email', password: 'Password' },
    addBtn: { text: 'Sign up', method: myFetch.post, url: '/users' },
    defineTab: () => createFormTab(formTabData.signIn),
  },

  settings: {
    title: 'Your settings',
    inputs: {
      image: 'URL of profile img',
      username: 'Username',
      bio: 'Short biography',
      email: 'Email',
      password: 'Password',
    },
    addBtn: {
      text: 'Update settings',
      method: myFetch.put,
      url: '/user',
    },
    secondBtn: 'Logout',
  },

  newPost: {
    inputs: {
      title: 'Article title',
      description: 'What is this arcticle about?',
      bodyArticle: 'Write your arcticle in (in markdown)',
      tagList: [],
    },
    addBtn: {
      text: 'Publish Arcticle',
      method: myFetch.post,
      url: '/articles',
    },
  },
};

//stateTypeData
const stateTabData = {
  homeTab: {
    title: 'conduit',
    title1: 'A place to share your knowledge.',
    feedTitles: {
      yourFeed: {
        text: 'Your Feed',
        articles: '/articles',
      },
      feed: {
        text: 'Global Feed',
        articles: '/articles',
      },
    },
    firstFeed: 'Global Feed',
    popularTags: 'tags',
  },
  userPage: {
    title1: () => userStorage.get().username,
    feedTitles: {
      userPosts: {
        text: 'User Posts',
        articles: '/articles?author=',
        requestArcticle: () => userStorage.get().username,
      },
      favoritePosts: {
        text: 'Favorite Posts',
        articles: '/articles',
      },
    },
    firstFeed: 'User Posts',
  },
};

export { formTabData, stateTabData };
