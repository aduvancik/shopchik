import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
// import { Context } from '..';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBasket = async () => {
      if (user && typeof user.uid === 'string') {
        try {
          const cartDoc = await firestore.collection('carts').doc(user.uid).get();
          if (cartDoc.exists) {
            const cartData = cartDoc.data().products;
            setBasket(cartData);
          }
        } catch (error) {
          console.error('Error fetching cart data: ', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadBasket();
  }, [user, firestore]);

  const addToBasket = async (product) => {
    if (!user || typeof user.uid !== 'string') return;

    try {
      const userCartRef = firestore.collection('carts').doc(user.uid);
      const userCartDoc = await userCartRef.get();

      let updatedProducts = [];
      if (!userCartDoc.exists) {
        updatedProducts = [product];
        await userCartRef.set({ products: updatedProducts });
      } else {
        const cartData = userCartDoc.data().products;
        const productIndex = cartData.findIndex((item) => item.id === product.id);
        updatedProducts = productIndex > -1
          ? cartData.filter((item) => item.id !== product.id)
          : [...cartData, product];
        await userCartRef.update({ products: updatedProducts });
      }

      setBasket(updatedProducts);
    } catch (error) {
      console.error('Error updating cart: ', error);
    }
  };

  const removeFromBasket = async (productId) => {
    if (!user || typeof user.uid !== 'string') return;

    try {
      const userCartRef = firestore.collection('carts').doc(user.uid);
      const userCartDoc = await userCartRef.get();

      if (userCartDoc.exists) {
        const cartData = userCartDoc.data().products;
        const updatedProducts = cartData.filter((item) => item.id !== productId);
        await userCartRef.update({ products: updatedProducts });
        setBasket(updatedProducts);
      }
    } catch (error) {
      console.error('Error removing from cart: ', error);
    }
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, loading }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};
