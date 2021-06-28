import React from 'react';

const Button = (props) => {
    return (
        <button className={props.active ? 'btn' : 'btn disabled'} onClick={props.onClick}>{props.title}</button>
    )
}

export default  Button;