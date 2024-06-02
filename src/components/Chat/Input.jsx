import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { MdAddPhotoAlternate } from 'react-icons/md';
import '../../styles/chat/input.scss';

export default function Input({ currentUserUid, combinedId, db, storage, userUid, chat }) {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const handleSend = async () => {
        if (!text.trim() && !img) return;

        if (!combinedId) {
            return;
        }

        const message = {
            id: uuid(),
            text,
            senderId: currentUserUid,
            recipientName: chat.displayName,
            recipientPhoto: chat.photoURL,
            date: Timestamp.now()
          };

        const chatDocRef = doc(db, 'chats', combinedId);

        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                'state_changed',
                (snapshot) => { },
                (error) => console.error(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    message.img = downloadURL;

                    await updateDoc(chatDocRef, {
                        messages: arrayUnion(message)
                    });
                }
            );
        } else {
            await updateDoc(chatDocRef, {
                messages: arrayUnion(message)
            });
        }

        setText("");
        setImg(null);
    };

    return (
        <div className="inputComponent">
            <p className='red'>{userUid}</p>
            <input
                type="text"
                placeholder="Type something..."
                className='input inputComponent__input'
                onChange={e => setText(e.target.value)}
                value={text || ""}
            />
            <div className="inputComponent__send">
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={e => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <MdAddPhotoAlternate className="inputComponent__icon" />
                </label>
                <button onClick={handleSend} className='button'>Надіслати</button>
            </div>
        </div>
    );
}

