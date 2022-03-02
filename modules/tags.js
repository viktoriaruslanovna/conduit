import { createElement } from './creator.js';
import { myFetch } from './fetch.js';
import { createArticle } from './arcticle.js';
import { body } from '../index.js';

const findTag = async (e, arrDataArcticles) => {
  const text = e.textContent;

  const tagTitle = document.querySelector('#tag--title');
  if (tagTitle) {
    tagTitle.remove();
  }

  const postsHeader = document.querySelector('.posts__header');
  const postsGroupBlock = document.querySelector('.posts');
  if (postsHeader) {
    const findTitle = createElement('posts__header__title', 'li', '#' + text);
    findTitle.id = 'tag--title';
    postsHeader.append(findTitle);
  }

  const needTag = '/articles?tag=' + text;
  const dataArcticles = await myFetch.get(needTag);
  arrDataArcticles = dataArcticles.articles;
  if (postsGroupBlock) {
    const findArcticles = createArticle(arrDataArcticles);
    postsGroupBlock.append(findArcticles);
  }
};

const createTag = (
  tagsGroupClassName,
  tagClassName,
  elementName,
  arrDataTags,
  arrDataArcticles,
  parent,
) => {
  const tagsGroup = createElement(tagsGroupClassName);

  arrDataTags.forEach(element => {
    const tag = createElement(tagClassName, elementName, element);
    tag.addEventListener('click', e => {
      findTag(e.target, arrDataArcticles),
        tagsGroup.classList.toggle('_active'),
        parent.classList.toggle('_active');
    });
    tagsGroup.append(tag);
  });
  return tagsGroup;
};

export { createTag, findTag };
