'use strict';
import { createStateTab, createFormTab } from './modules/tabs.js';
import { formTabData, stateTabData } from './modules/data.js';
import { userStorage } from './modules/userStorage.js';

//selectors
const body = document.querySelector('.body');
const god = document.querySelector('.god');
const logoBtn = document.querySelector('.header__logo__text');
const menu = document.querySelector('.header');

//utils
const changeTab = page => {
  if (page === 'conduit') createStateTab(stateTabData.homeTab);
  if (page === 'Home') createStateTab(stateTabData.homeTab);
  if (page === 'Sign In') createFormTab(formTabData.signIn);
  if (page === 'Sign Up') createFormTab(formTabData.signUp);
  if (page === userStorage.get().username)
    createStateTab(stateTabData.userPage);
  if (page === 'Settings') createFormTab(formTabData.settings);
  if (page === 'New Post') createFormTab(formTabData.newPost);
};

const hideContent = () => {
  const allTabGroupContentblock = document.querySelector('.tabs');
  allTabGroupContentblock?.remove();
  const menuGroup = document.querySelector('.header__menu__group');
  menuGroup?.remove();
};

const logout = () => {
  localStorage.clear('userStorage');
  createStateTab(stateTabData.homeTab);
};

//events
const init = () => {
  logoBtn.addEventListener('click', e => changeTab(e.target.textContent));
  createStateTab(stateTabData.homeTab);
};

init();

// export
export { hideContent, god, menu, logout, changeTab, body };
