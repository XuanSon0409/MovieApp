const params = new URLSearchParams(window.location.search);
const imdbID = params.get('imdbID');
if (imdbID) {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=a603582e`)
    .then(res => res.json())
    .then(data => renderMovieDetail(data))
    .catch(err => console.error('Error:', err));
}
function renderMovieDetail(data) {
  const container = document.querySelector('.movie-detail');
  container.innerHTML = '';
  container.innerHTML = `
    <div class="movie-detail__poster">
      <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450'}" alt="${data.Title} Poster">
    </div>
    <div class="movie-detail__info">
      <div class="movie-detail__container">
        <div class="movie-detail__title">${data.Title}</div>
        <div class="movie-detail__rating">
          <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" viewBox="0 0 24 24" color="#e4bb24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
          <div>
            <div class="movie-detail__rating-container">${data.imdbRating}<i>/10</i></div>
            <div class="movie-detail__votes">${data.imdbVotes}</div>
          </div>
        </div>
      </div>
      <div class="movie-detail__subinfo">
        <div>${data.Year}</div>
        <div>${data.Rated}</div>
        <div>${data.Released}</div>
        <div>${data.Runtime}</div>
      </div>
      <div class="movie-detail__description"><p>${data.Plot}</p></div>
      <hr class="movie-detail__divider">
      ${renderMeta('Genre', data.Genre)}
      ${renderMeta('Director', data.Director)}
      ${renderMeta('Writer', data.Writer)}
      ${renderMeta('Actors', data.Actors)}
      ${renderMeta('Language', data.Language)}
      ${renderMeta('Country', data.Country)}
      ${renderMeta('Awards', data.Awards)}
      ${renderMeta('Production', data.Production)}
    </div>
  `;
}
function renderMeta(title, value) {
  return `
    <div class="movie-detail__medata">
      <div class="movie-detail__medata-title"><p>${title} :</p></div>
      <div class="movie-detail__medata-value"><p>${value}</p></div>
    </div>
  `;
}
document.querySelector('.navbar-detail__arrow').addEventListener('click', () => {
  window.location.href = 'index.html';
});
document.querySelector('.navbar-detail__logo').addEventListener('click', () => {
  window.location.href = 'index.html';
});