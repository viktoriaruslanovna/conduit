import { myFetch, makeFetch } from './fetch.js';
import { createElement } from './creator.js';
import { createTag } from './tags.js';
import { createArticle } from './arcticle.js';
import {
  createMenu,
  unregisteredMenuData,
  registeredMenuData,
} from './menu.js';
import { hideContent, god, menu, logout } from '../index.js';
import { userStorage } from './userStorage.js';
import { changeStyleFeedTitle } from './changeStyle.js';

//tabs
const createStateTab = async dataType => {
  hideContent();

  if (userStorage.get().length !== 0) {
    registeredMenuData.push(userStorage.get().username);
    const needMenu = createMenu(registeredMenuData);
    menu.append(needMenu);
    registeredMenuData.pop();
  } else {
    const needMenu = createMenu(unregisteredMenuData);
    menu.append(needMenu);
  }

  const tabs = createElement('tabs');
  god.append(tabs);

  const groupBlock = createElement('home__preview');
  tabs.append(groupBlock);

  const informationContent = createElement('home__content');

  const postsGroupBlock = createElement('posts');

  const feedGroupBlock = createElement('posts__header', 'ul');

  const { title, title1, feedTitles, popularTags, firstFeed } = dataType;

  const dataTags = await myFetch.get('/tags');
  const arrDataTags = dataTags.tags;

  const dataArcticles = await myFetch.get('/articles');
  const arrDataArcticles = dataArcticles.articles;

  if (title) {
    const createdTitle = createElement('home__preview__title', 'h1', title);
    groupBlock.append(createdTitle);
  }

  if (title1) {
    let inTitle;
    if (typeof title1 === 'string') {
      inTitle = title1;
    } else {
      inTitle = title1();
    }
    const createdTitle1 = createElement('home__preview__text', 'h2', inTitle);
    groupBlock.append(createdTitle1);
  }

  if (feedTitles) {
    for (let key in feedTitles) {
      const feedTitle = document.createElement('li');
      feedTitle.className = 'posts__header__title';
      feedTitle.textContent = feedTitles[key].text;
      feedTitle.setAttribute('role', 'button');

      if (feedTitles[key].requestArcticle) {
        const needArticles =
          feedTitles[key].articles + feedTitles[key].requestArcticle();

        const dataNeedArcticles = await myFetch.get(needArticles);
        const arrDataNeedArcticles = dataNeedArcticles.articles;

        feedTitle.addEventListener('click', e => {
          changeStyleFeedTitle(e.target);
          postsGroupBlock.append(createArticle(arrDataNeedArcticles));
          const tagTitle = document.querySelector('#tag--title');
          if (tagTitle) {
            tagTitle.remove();
          }
        });
      } else {
        feedTitle.addEventListener('click', e => {
          changeStyleFeedTitle(e.target);

          postsGroupBlock.append(createArticle(arrDataArcticles));

          const tagTitle = document.querySelector('#tag--title');
          if (tagTitle) {
            tagTitle.remove();
          }
        });
      }
      if (firstFeed === feedTitles[key].text) {
        feedTitle.dispatchEvent(new Event('click'));
      }

      feedGroupBlock.append(feedTitle);
    }
  }

  if (popularTags) {
    const tagsGroupBlock = createElement('tags');

    const tagsHeader = createElement('tags__header');
    const tagsHeaderText = createElement(
      'tags__header__text',
      'a',
      'Popular Tags',
    );
    const tagsArrow = createElement('tags__header__arrow', 'span');
    const tagsList = createTag(
      'tags__list',
      'tags__list__name dark__tag',
      'a',
      arrDataTags,
      arrDataArcticles,
      tagsGroupBlock,
    );
    tagsArrow.addEventListener('click', () => {
      tagsGroupBlock.classList.toggle('_active'),
        tagsList.classList.toggle('_active');
    });

    informationContent.append(tagsGroupBlock);
    tagsHeader.append(tagsHeaderText, tagsArrow);
    tagsGroupBlock.append(tagsHeader, tagsList);
  }

  informationContent.prepend(postsGroupBlock);

  postsGroupBlock.prepend(feedGroupBlock);

  tabs.append(informationContent);
};

const createFormTab = dataType => {
  hideContent();

  if (userStorage.get().length !== 0) {
    const menuData = [...registeredMenuData, userStorage.get().username];
    const needMenu = createMenu(menuData);
    menu.append(needMenu);
  } else {
    const needMenu = createMenu(unregisteredMenuData);
    menu.append(needMenu);
  }

  const tabs = createElement('tabs');
  god.append(tabs);

  const groupBlock = createElement('form__tabs');
  groupBlock.id = 'sign__in__tab';
  tabs.append(groupBlock);

  const { title, phrase, inputs, addBtn, secondBtn, defineTab } = dataType;

  if (title) {
    const createdTitle = createElement('form__tabs__title', 'h1', title);

    groupBlock.append(createdTitle);
  }

  if (phrase) {
    const createdPhrase = createElement('form__tabs__phrase', 'a', phrase);
    createdPhrase.setAttribute('role', 'button');
    createdPhrase.addEventListener('click', defineTab);
    groupBlock.append(createdPhrase);
  }

  const form = createElement('form', 'form');
  form.addEventListener('submit', e => makeFetch(e, addBtn.method, addBtn.url));
  groupBlock.append(form);

  if (inputs) {
    for (let key in inputs) {
      const input = createElement('form__input', 'input');
      input.placeholder = inputs[key];
      input.name = key;
      if (userStorage.get()[key]) {
        input.value = userStorage.get()[key];
      }
      if (key === 'email' || key === 'password') {
        input.type = key;
      }
      form.append(input);
    }
  }

  if (addBtn) {
    const btnGroupblock = createElement('form__wrapper');
    const btn = createElement('form__wrapper__btn', 'input');
    btn.type = 'submit';
    btn.value = addBtn.text;
    btnGroupblock.append(btn);
    form.append(btnGroupblock);
  }

  if (secondBtn) {
    const btnGroupblock = createElement('wrapper__logout');
    const btn = createElement('wrapper__logout__btn', 'btn', secondBtn);
    btn.addEventListener('click', logout);

    btnGroupblock.append(btn);
    groupBlock.append(btnGroupblock);
  }
};

export { createStateTab, createFormTab };
