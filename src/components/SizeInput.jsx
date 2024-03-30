import React from 'react'
import "../styles/sizeInput.scss";

export default function SizeInput(props) {
    const { sizeTitle, maxSize, minSize, inputFocused } = props;

    return (
        <p className='sizeInput'>
            <span className={(inputFocused && sizeTitle < minSize)?"red" : ""}>Введіть щонайменше {minSize} символів</span>
            <span className={(inputFocused && sizeTitle > maxSize)?"red" : ""}>{sizeTitle}/{maxSize}</span>
        </p>
    )
}
