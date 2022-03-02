import { createElement } from './creator.js';
import { createTag } from './tags.js';
import { hideContent, god, menu } from '../index.js';
import { myFetch } from './fetch.js';
import { userStorage } from './userStorage.js';
import {} from './data.js';
import {
  createMenu,
  unregisteredMenuData,
  registeredMenuData,
} from './menu.js';

//понравившиеся не работают
const addFavouriteArticle = async (e, arrDataArcticles) => {
  const article = arrDataArcticles[e];
  const slug = article.slug;
  const url = '/articles/' + slug + '/favorite';
  const result = await myFetch.get(url);
  console.log(result);
};

const createArticle = arrDataArcticles => {
  const all = document.querySelector('.arcticles__wrapper');
  if (all) {
    all.remove();
  }
  const allArcticles = createElement('arcticles__wrapper');
  arrDataArcticles.forEach(element => {
    const { createdAt: date, title, description, tagList } = element;
    const username = element.author.username;
    const index = arrDataArcticles.findIndex(e => e.createdAt === date);

    const arcticle = createElement('arcticle');
    const arcticleInfo = createElement('arcticle__info');

    const authorGroup = createElement('arcticle__info__author__group');
    const createUsername = createElement(
      'arcticle__info__name author__underline',
      'a',
      username,
    );
    const authorDate = createElement('arcticle__info__date', 'p', date);
    const icon = createElement('arcticle__info__like');
    const iconImg = createElement('arcticle__info__like__img', 'img');
    iconImg.src = 'media/heart.svg';
    iconImg.id = index;
    iconImg.addEventListener('click', e =>
      addFavouriteArticle(e.target.id, arrDataArcticles),
    );

    const arcticleBody = createElement('arcticle__body');
    const postGroup = createElement('arcticle__body__wrapper');
    const createTitle = createElement('arcticle__body__title', 'h1', title);
    const createDescription = createElement(
      'arcticle__body__description',
      'p',
      description,
    );
    const more = createElement(
      'arcticle__body__more arcticle__info__date',
      'p',
      'Read more...',
    );
    more.id = index;
    more.addEventListener('click', e =>
      createArcticlePage(e.target.id, arrDataArcticles),
    );
    const arcticleTags = createTag(
      'arcticle__tags__list',
      'arcticle__tags__list__item',
      'p',
      tagList,
      arrDataArcticles,
      arcticle,
    );

    icon.append(iconImg);
    authorGroup.append(createUsername, authorDate);
    arcticleInfo.append(authorGroup, icon);

    postGroup.append(createTitle, createDescription, more);
    arcticleBody.append(postGroup);

    arcticle.append(arcticleInfo, arcticleBody, arcticleTags);

    allArcticles.append(arcticle);
  });
  return allArcticles;
};

const createArcticlePage = (e, arrData) => {
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
  const arcticlePage = createElement('arcticle__page');
  tabs.append(arcticlePage);
  const needObj = arrData[e];

  const { createdAt, title, body, tagList } = needObj;
  const username = needObj.author.username;

  const arcticleInfo = createElement('arcticle__page__info');
  const createTitle = createElement('arcticle__page__info__title', 'h1', title);
  const createUsername = createElement('', 'p', username);
  const authorDate = createElement('', 'p', createdAt);

  const arcticleBody = createElement('arcticle__page__body');
  const createText = createElement('arcticle__page__body__text', 'a', body);
  const tagGroup = createTag(
    'arcticle__tags__list',
    'arcticle__tags__list__item',
    'p',
    tagList,
  );

  arcticleInfo.append(createTitle, createUsername, authorDate);
  arcticleBody.append(createText, tagGroup);

  arcticlePage.append(arcticleInfo, arcticleBody);

  return arcticlePage;
};

export { createArticle };
