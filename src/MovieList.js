import React, { useState, useRef } from 'react';
import Movie from './Movie';

export default function MovieList() {
  const [movies, setMovies] = useState([
    { id: 1, title: "First Movie", rating: 3 },
  ]);

  const inputRef = useRef();
  const ratingRef = useRef();

  function addMovie(event) {
    event.preventDefault();
    const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
    const newMovie = {
      id: newId,
      title: inputRef.current.value,
      rating: ratingRef.current.value,
    };
    setMovies([...movies, newMovie]);
    inputRef.current.value = "";
    ratingRef.current.value = "0";
  }

  function deleteMovie(id) {
    setMovies(movies.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h1>Min filmlista</h1>
      <form onSubmit={addMovie}>
        <fieldset>
          <legend>Lägg till en film</legend>

          <label htmlFor="title-field">Titel:</label>
          <input type="text" id="title-field" className="form-control" ref={inputRef} />

          <label htmlFor="rating-field">Betyg:</label>
          <select id="rating-field" className="form-control" ref={ratingRef}>
            <option value="0">Välj betyg här...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" className="btn btn-success mt-3" value="Spara film" />
        </fieldset>
      </form>
      <ul className="list-group">
        {movies.map((movie) => (
          <Movie key={movie.id} item={movie} deleteMovie={deleteMovie} />
        ))}
      </ul>
    </div>
  );
}
