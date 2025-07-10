const apiKey = import.meta.env.VITE_API_KEY;
const keywords = ['man', 'woman', 'science', 'love', 'squid', 'gun', 'family', 'sea', 'forest', 'friend', ' apocalypse'];
const root = document.querySelector('.movie-list');
const searchInput = document.querySelector('#input');
const searchButton = document.querySelector('.search__button');
let keywordIndex = 0;
let isLoading = false;
let isCustomSearch = false;
function showSkeletons(count = 4) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'skeleton-row');
  for (let i = 0; i < count; i++) {
    const skeletonCard = `
            <div class="movie-list__card skeleton">
                <div class="movie-list__poster">
                    <div class="skeleton-box skeleton-img"></div>
                </div>
                <div class="movie-list__title">
                    <div class="skeleton-box skeleton-text"></div>
                </div>
                <div class="movie-list__footer">
                    <div class="skeleton-box skeleton-icon"></div>
                    <div class="skeleton-box skeleton-icon"></div>
                </div>
            </div>
        `;
    rowDiv.insertAdjacentHTML('beforeend', skeletonCard);
  }
  root.appendChild(rowDiv);
}
function removeSkeletons() {
  document.querySelectorAll('.skeleton-row').forEach((row) => row.remove());
}
async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
async function fetchMovies(keyword, isNewSearch = false) {
  if (!keyword) return;
  if (isNewSearch) {
    root.innerHTML = '';
  }
  showSkeletons();
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(keyword)}`;
  try {
    const data = await getData(apiUrl);
    removeSkeletons();
    if (data.Response === 'True') {
      data.Search.forEach((movie) => {
        if (
          root.lastElementChild == null ||
          root.lastElementChild.children.length >= 4
        ) {
          const rowDiv = document.createElement('div');
          rowDiv.classList.add('row');
          root.appendChild(rowDiv);
        }
        const currentList = root.lastElementChild;
        const movieCard = `
                    <div class="movie-list__card">
                        <div class="movie-list__poster" data-imdbid="${movie.imdbID}">
                            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
                            <div class="movie-list__title">
                                <h2>${movie.Title}</h2>
                            </div>
                        </div>
                        <div class="movie-list__footer">
                            <div class="movie-list__release-year">
                                <i class="fa-regular fa-calendar"></i>
                                <span>${movie.Year}</span>
                            </div>
                            <div class="movie-list__rating">🤍</div>
                        </div>
                    </div>
                `;
        currentList.insertAdjacentHTML('beforeend', movieCard);
      });
    } else if (isNewSearch) {
      root.innerHTML = `<p class="error-message">"Movie not found!"</p>`;
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    removeSkeletons();
  }
}
async function loadNextKeyword() {
  if (keywordIndex >= keywords.length) return;
  isLoading = true;
  await fetchMovies(keywords[keywordIndex], false);
  isLoading = false;
  keywordIndex++;
}
window.addEventListener('DOMContentLoaded', () => {
  isCustomSearch = false;
  loadNextKeyword();
});
window.addEventListener('scroll', async () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom && !isLoading && !isCustomSearch) {
    await loadNextKeyword();
  }
});
searchButton.addEventListener('click', async () => {
  const keyword = searchInput.value.trim();
  if (keyword) {
    keywordIndex = 0;
    isCustomSearch = true;
    await fetchMovies(keyword, true);
  }
});
let previousValue = searchInput.value.trim();
searchInput.addEventListener('input', () => {
  const currentValue = searchInput.value.trim();
  if (currentValue === '' && previousValue !== '') {
    isCustomSearch = false;
    keywordIndex = 0;
    root.innerHTML = '';
    loadNextKeyword();
  }
  previousValue = currentValue;
});
root.addEventListener('click', (event) => {
  const card = event.target.closest('.movie-list__poster');
  if (card) {
    const imdbId = card.getAttribute('data-imdbid');
    if (imdbId) {
      window.location.href = `detail.html?imdbID=${imdbId}`;
    }
  }
});
