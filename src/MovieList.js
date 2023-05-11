import React, { useState, useRef, useEffect } from 'react';
import Movie from './Movie';

export default function MovieList() {
  const [movies, setMovies] = useState(() => JSON.parse(localStorage.getItem("movies")) || []);
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

  function sortMovies(order) {
    const sortedMovies = [...movies].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title, "sv");
      } else {
        return b.title.localeCompare(a.title, "sv");
      }
    });
    setMovies(sortedMovies);
  }

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  return (
    <div>
      <form onSubmit={addMovie}>
        <fieldset>

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

          <button type="submit" className="btn btn-success mt-3">Spara film</button>
        </fieldset>
      </form>
      <div className="sort-buttons mt-3">
        <button className="btn btn-primary" onClick={() => sortMovies("asc")}>Sortera A-Ö</button>
        <button className="btn btn-primary" onClick={() => sortMovies("desc")}>Sortera Ö-A</button>
      </div>
      <ul className="list-group">
        {movies.map((movie) => (
          <Movie key={movie.id} item={movie} deleteMovie={deleteMovie} />
        ))}
      </ul>
    </div>
  );
}
