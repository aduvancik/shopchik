import React from 'react'

export default function Contacts() {
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
            />
            <label htmlFor="telephone">Номер телефону</label>
            <input
                type="number"
                id="telephone"
                placeholder=""
                className="input"
            />

        </div>
    )
}
