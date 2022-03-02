import { changeTab, body } from '../index.js';
import { createElement } from './creator.js';

const createMenu = arrDataMenu => {
  const menuGroup = createElement('header__menu__group');
  const menuList = createElement('menu__list', 'nav');
  const iconGroup = createElement('menu__burger');
  const icon = createElement('menu__burger__icon', 'img');

  if (body.classList.contains('_lock')) {
    body.classList.toggle('_lock');
  }

  icon.src = 'media/burger.svg';
  icon.addEventListener('click', () => {
    menuList.classList.toggle('_active');
    body.classList.toggle('_lock');
  });

  arrDataMenu.forEach(element => {
    const menuTitle = createElement(
      'menu__list__title color__grey',
      'li',
      element,
    );

    menuTitle.setAttribute('role', 'button');
    menuTitle.addEventListener('click', () => changeTab(menuTitle.textContent));

    menuList.append(menuTitle);
    iconGroup.append(icon);
    menuGroup.append(iconGroup);
    menuGroup.append(menuList);
  });
  return menuGroup;
};

const unregisteredMenuData = ['Home', 'Sign In', 'Sign Up'];

const registeredMenuData = ['Home', 'New Post', 'Settings'];

export { createMenu, unregisteredMenuData, registeredMenuData };
