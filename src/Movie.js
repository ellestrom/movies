import React from 'react';

export default function Movie(props) {
    return (
        <li className="list-group-item">
            {props.item.title}
            <button className="btn btn-sm btn-danger float-end" onClick={() => {props.deleteMovie(props.item.id)}}>X</button>
        </li>
    );
}
