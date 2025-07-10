# Challenge – Create a Sign‑In & Sign‑Up System  *(Movie Search Application)*

- The challenge is to create a movie search application using external APIs and advanced JavaScript functionalities. The application will allow users to search for movies and display information about them. To create the application, developers can use APIs such as the OMDB API, which provides movie information such as title, year, plot, and ratings.

## Application Pages&nbsp;*(build order)*

- **Home**
-  **Movie Details**

## Technologies Used

- **HTML**  
- **SCSS** – variables, mixins, nesting, `@extend`  
- **BEM**‑structured class naming method
- **JavaScript (ES6)** – For API integration and handling user interactions
- **Fetch API** – For making HTTP requests to the server

## Challenge Requirements

- Create a movie search app that matches the given design
- Allow users to enter a movie name in the search input.
- Display a movie or Movie not found text if there is no movie that matches the searched text.
- Ensure the page is responsive on different screen sizes.

## Design Reference

<https://react-query-movies-app.netlify.app/>

## API

| Purpose | Endpoint / Link |
|---------|-----------------|
| **Search movies** | ```https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=MOVIE_NAME``` |
| **Get an API key** | <https://www.omdbapi.com/apikey.aspx> |

> **Tip:** Replace `YOUR_API_KEY` with the key you receive from OMDb before making requests.
