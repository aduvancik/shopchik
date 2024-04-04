import React, { useState } from 'react';
import "../../styles/description.scss"
import SizeInput from '../SizeInput';

export default function Description(props) {
    const { setProductData } = props;
    const [sizeDescription, setSizeDescription] = useState(0);
    const [inputFocused, setInputFocused] = useState(false);


    const handleTitle = (event) => {
        const str = event.target.value;
        setSizeDescription(str.length);
        if (str.length >= 40 && str.length <= 3000) {
            setProductData(prevData => ({
                ...prevData,
                description: str,
            }));
        } else {
            setProductData(prevData => ({
                ...prevData,
                description: "",
            }));
        }
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
                maxLength="3000"
                onChange={handleTitle}
                rows={10}
                cols={3}
                onFocus={handleInputFocus}
                required
            />
            <SizeInput sizeTitle={sizeDescription} maxSize={3000} minSize={40} inputFocused={inputFocused} />
        </div>
    )
}
