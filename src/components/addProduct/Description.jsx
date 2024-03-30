import React, { useState } from 'react';
import "../../styles/description.scss"
import SizeInput from '../SizeInput';

export default function Description() {
    const [sizeTitle, setSizeTitle] = useState(0);
    const [inputFocused, setInputFocused] = useState(false);


    const handleTitle = (event) => {
        const str = event.target.value;
        setSizeTitle(str.length);
    }

    const handleInputFocus = () => {
        setInputFocused(true);
    }

    return (
        <div className='description'>
            <p>Опис*</p>
            <textarea
                type="text"
                className="description__input input"
                placeholder="Придумайте, що ви хотіли би дізнатись з оголошення"
                maxlength="3000"
                onChange={handleTitle}
                rows={10}
                cols={3}
                onFocus={handleInputFocus}
                required
            />
            <SizeInput sizeTitle={sizeTitle} maxSize={3000} minSize={40} inputFocused={inputFocused} />
        </div>
    )
}
