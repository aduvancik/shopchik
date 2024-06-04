import React, { useContext, useEffect, useState } from 'react';
import "../styles/profilePages.scss";
import Product from '../components/Product';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../components/Loader';

export default function ProfilePages() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          // Fetch user products
          const productsRef = firestore.collection("users").doc(user.uid).collection("products");
          const productsSnapshot = await productsRef.get();
          const productsList = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Fetch user cart items
          const cartRef = firestore.collection("carts").doc(user.uid);
          const cartSnapshot = await cartRef.get();
          const cartData = cartSnapshot.data();
          const cartItemsList = cartData ? cartData.products : [];

          // Fetch product details for each cart item
          const cartProducts = await Promise.all(cartItemsList.map(async (productId) => {
            const productDoc = await firestore.collection("products").doc(productId).get();
            return { id: productDoc.id, ...productDoc.data() };
          }));

          setProducts(productsList);
          setCartItems(cartProducts);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user, firestore]);

  if (loading) {
    return <Loader />
  }

  return (
    <div className='profilePages'>
      <div className='profilePages__ti'>
        <h1 className='profilePages__title'>{user.displayName}</h1>
        <img src={user.photoURL} alt="avatar" />
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
