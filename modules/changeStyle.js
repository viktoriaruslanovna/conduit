const changeStyleFeedTitle = e => {
  const titles = document.querySelectorAll('.posts__header__title');
  titles.forEach(element => {
    element.className = 'posts__header__title';
  });
  e.className = 'posts__header__title click__header__title';
};

export { changeStyleFeedTitle };
