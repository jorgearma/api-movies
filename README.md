# Movie API

This repository contains a basic API for querying movie information. It provides functionalities such as movie search, genre retrieval, and access to popular listings.

## Project Intent

The primary goal of this project is to understand:
- How to consume and interact with an API effectively.
- Best practices for securing API endpoints and data transmission.
- Implementation of basic frontend-backend interactions using JavaScript.

Through this project, I aim to enhance my skills in web development, particularly in handling APIs securely and efficiently.

## Project Structure

The project is organized as follows:

- `bundle.css`, `bundle.css.map`: Compiled style files.
- `bundle.js`, `bundle.js.map`: Compiled JavaScript files.
- `sass/`: Directory containing Sass files for styles.
- `src/`: Directory containing source files for the API.
- `index.html`: Main HTML page for interacting with the API.
- `package.json`, `package-lock.json`: Node.js configuration files.
- `rollup.config.js`: Configuration for JavaScript bundling.

## Main Files

- `cargargeneros.js`: Script to load movie genres.
- `cargartitulos.js`: Script to load movie titles.
- `fetchbusqueda.js`: Script to perform movie searches.
- `fetchgeneros.js`: Script to fetch available movie genres.
- `fetchitem.js`: Script to fetch details of a specific movie.
- `fetchpopulares.js`: Script to fetch popular movies.
- `index.js`: Main entry point of the project.
- Other files like `lisenerbuscar.js`, `lisenercerrar.js`, etc., handle specific front-end events.

## Setup and Usage

1. **Installation:**
   ```bash
   npm install
Build:

bash
```npm run build```

This will compile Sass and JavaScript files using Rollup.

## Run:

Open index.html in your browser to interact with the movie API.
The API is designed to be consumed from the front-end using the provided scripts.
