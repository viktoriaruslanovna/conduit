const fetcherArcticles = async () => {
  const response = await fetch(
    'https://conduit-api-realworld.herokuapp.com/api/articles',
    {
      method: 'GET',
    },
  );
  const result = response.json();
  return result;
};
fetcherArcticles();

const fetcherTags = async () => {
  const response = await fetch(
    'https://conduit-api-realworld.herokuapp.com/api/tags',
    {
      method: 'GET',
    },
  );
  const result = response.json();
  return result;
};
fetcherTags();

export { fetcherArcticles, fetcherTags };
