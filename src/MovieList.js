import React, { useState, useRef, useEffect } from 'react';
import Movie from './Movie';

export default function MovieList() {
  const [movies, setMovies] = useState(() => JSON.parse(localStorage.getItem("movies")) || []);
  const inputRef = useRef();
  const ratingRef = useRef();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortType, setSortType] = useState("title");

  function addMovie(event) {
    event.preventDefault();
    if (!inputRef.current.value.trim() || ratingRef.current.value === "0") {
      alert("Please fill in all fields.");
      return;
    }
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
        return a[sortType].localeCompare(b[sortType], "sv");
      } else {
        return b[sortType].localeCompare(a[sortType], "sv");
      }
    });
    setMovies(sortedMovies);
    setSortOrder(order === "asc" ? "desc" : "asc");
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
      <div className="sort-buttons mt-4 mb-4">
        <button className="btn btn-primary" onClick={() => sortMovies(sortOrder)}>Sortera {sortOrder === "asc" ? "A-Ö" : "Ö-A"}</button>
        <button className="btn btn-primary" onClick={() => {setSortType("rating"); sortMovies(sortOrder); setSortType("title");}}>Sortera Betyg {sortOrder === "asc" ? "1-5" : "5-1"}</button>
      </div>
      <ul className="list-group">
        {movies.map((movie) => (
          <Movie key={movie.id} item={movie} deleteMovie={deleteMovie} />
        ))}
      </ul>
    </div>
  );
}