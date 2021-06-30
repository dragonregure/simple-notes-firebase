import React from 'react';
import './cards.scss';

const Card = (props) => {
    return (
        <div className="card">
            <p className="card-title">{props.data.title}</p>
            <p className="card-subtitle">{(new Date(props.data.subtitle)).toLocaleDateString()}</p>
            <p className="card-content">{props.data.content}</p>
        </div>
    );
}

Card.defaultProps = {
    data: {
        title: 'Title',
        subtitle: 'Subtitle',
        content: 'Content'
    }
}

export default Card;