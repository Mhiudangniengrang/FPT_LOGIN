import React from 'react';
import Button from 'react-bootstrap/Button';

function ButtonLink({ text, link, style, onClick }) {
    return (
        <Button onClick={onClick} style={style} href={link} type="submit">{text}</Button>
    )
}

export default ButtonLink;