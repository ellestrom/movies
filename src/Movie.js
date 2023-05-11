import React from 'react';
import star from "./star.png";
import del from "./delete.png";

export default function Movie(props) {
  const rating = props.item.rating;
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<img key={i} src={star} alt="star" />);
  }

  return (
    <li className="list-group-item">
      {props.item.title}
      {stars}
      <img
        className="float-end"
        src={del}
        alt="delete"
        onClick={() => {
          props.deleteMovie(props.item.id);
        }}
      />
    </li>
  );
}
