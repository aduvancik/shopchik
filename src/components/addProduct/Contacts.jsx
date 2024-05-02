import React from 'react';

export default function Contacts({ setProductData }) {
    const handleNameChange = (event) => {
        const name = event.target.value;
        setProductData(prevData => ({
            ...prevData,
            contactPerson: name,
        }));
    };

    const handleTelephoneChange = (event) => {
        const telephone = event.target.value;
        setProductData(prevData => ({
            ...prevData,
            telephone: telephone,
        }));
    };


    return (
        <div>
            <h2 className="title-h2">Ваші контактні дані</h2>
            <label htmlFor="Name">Контактна особа*</label>
            <input
                type="text"
                id="Name"
                placeholder="Як до вас звертатись"
                className="input"
                required
                onChange={handleNameChange}
                value={"oleg"}
                maxLength={20}
            />
            <label htmlFor="telephone">Номер телефону</label>
            <input
                type="number"
                id="telephone"
                placeholder="Введіть телефон у форматі (0XX) XXX-XXXX"
                value={'0663904077'}
                className="input"
                onChange={handleTelephoneChange}
                pattern="[0]-[0-9]{2}-[0-9]{3}-[0-9]{4}"
            />
        </div>
    );
}

