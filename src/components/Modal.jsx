import React from 'react';
import "../styles/modal.scss"

export default function Modal(props) {
    const {setError, text} = props;
    const hideModal = () => {
        setError(false);
    }

    return (
        <div className="frame">
            <div className="modall">
                <div>
                    <img src="https://100dayscss.com/codepen/alert.png" width="44" height="38" alt="message" />
                    <span className="title">Ох халепа!</span>
                </div>
                <p>{text}</p>
                <div className="button" onClick={hideModal}>Зрозуміло</div>
            </div>
        </div>
    )
}
