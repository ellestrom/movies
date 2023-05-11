import React from 'react';
import star from "./star.png";
import del from "./delete.png";

export default function Movie(props) {
  const rating = props.item.rating;
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<img key={i} className="img-fluid" src={star} alt="star" />);
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.item.title}
      <div>
        {stars}
        <img
          className="img-fluid"
          src={del}
          alt="delete"
          onClick={() => {
            props.deleteMovie(props.item.id);
          }}
        />
      </div>
    </li>
  );
}
