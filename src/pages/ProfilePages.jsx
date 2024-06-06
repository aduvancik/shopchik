import React, { useContext, useEffect, useState } from 'react';
import "../styles/profilePages.scss";
import Product from '../components/Product';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../components/Loader';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { FaPenAlt } from "react-icons/fa";

export default function ProfilePages() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [updating, setUpdating] = useState(false);
  const [showDisplayName, setShowDisplayName] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const productsRef = firestore.collection("users").doc(user.uid).collection("products");
          const productsSnapshot = await productsRef.get();
          const productsList = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          const cartRef = firestore.collection("carts").doc(user.uid);
          const cartSnapshot = await cartRef.get();
          const cartData = cartSnapshot.data();
          const cartItemsList = cartData ? cartData.products : [];

          const cartProducts = await Promise.all(cartItemsList.map(async (productId) => {
            const productDoc = await firestore.collection("products").doc(productId).get();
            return { id: productDoc.id, ...productDoc.data() };
          }));

          setProducts(productsList);
          setCartItems(cartProducts);
          setDisplayName(user.displayName);
          setPhotoURL(user.photoURL);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user, firestore]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        let photoURLToUpdate = photoURL;

        if (file) {
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(`profilePictures/${currentUser.uid}/${file.name}`);
          await fileRef.put(file);
          photoURLToUpdate = await fileRef.getDownloadURL();
        }

        await currentUser.updateProfile({
          displayName,
          photoURL: photoURLToUpdate,
        });

        await firestore.collection('users').doc(currentUser.uid).set({
          displayName,
          photoURL: photoURLToUpdate,
        }, { merge: true });

        setLoading(false);
        setPreviewURL('');
        setFile(null);
        setUpdating(false);
        setShowDisplayName(true);


      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      setUpdating(false);
      setShowDisplayName(true);

    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const handleCancel = () => {
    setDisplayName(user.displayName);
    setPhotoURL(user.photoURL);
    setPreviewURL('');
    setFile(null);
    setShowDisplayName(true);
  };

  return (
    <div className='profilePages'>
      <div className='profilePages__title'>
        <form className='profilePages__form' onSubmit={handleUpdateProfile}>
          <div className='profilePages__inputs'>

            <div className='profilePages__formContainer'>
              <label htmlFor="displayName"><FaPenAlt className='profilePages__icon' onClick={() => setShowDisplayName(!showDisplayName)} /></label>
              {showDisplayName ?
                <h1>{displayName}</h1>
                : <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className='input'
                />
              }


            </div>
            <div className='profilePages__formContainer'>
              <label htmlFor="photoFile"><FaPenAlt className='profilePages__icon' /></label>
              <img src={previewURL || photoURL} alt="avatar" className='profilePages__avatar' />
              <input
                type="file"
                id="photoFile"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {updating && <Loader />}
          <div className="profilePages__buttons">
            <button type="submit" className='button' disabled={updating}>Зберегти зміни</button>
            <button type="button" className='button' onClick={handleCancel}>Скасувати зміни</button>
          </div>

        </form>
        <div className='productsList' id="productsList">
          <div className="productsList__container">
            <h1 className="productsList__title">Корзина</h1>
            {cartItems.length > 0 ? (
              <ul className="productsList__products">
                {cartItems.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                  />
                ))}
              </ul>
            ) : (
              <h2 className='productsList__title-h2 title-h2'>Корзина порожня</h2>
            )}
          </div>
          <div className="productsList__container">
            <h1 className="productsList__title">Ваші оголошення</h1>
            {products.length > 0 ? (
              <ul className="productsList__products">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                  />
                ))}
              </ul>
            ) : (
              <h2 className='productsList__title-h2 title-h2'>Оголошень не знайдено</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
