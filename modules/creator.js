const createElement = (className = '', element = 'div', text = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.textContent = text;
  return e;
};

export { createElement };
