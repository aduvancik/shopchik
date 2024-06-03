import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firestore } from '../firebase'; // замініть на ваш файл конфігурації firebase
import { Context } from '../..';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const cartDoc = await firestore.collection("carts").doc(user.uid).get();
          if (cartDoc.exists) {
            const cartData = cartDoc.data().products;
            setBasket(cartData);
          }
        } catch (error) {
          console.error("Error fetching cart data: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const addToBasket = async (productId) => {
    if (!user) return;

    try {
      const userCartRef = firestore.collection("carts").doc(user.uid);
      const userCartDoc = await userCartRef.get();

      let updatedProducts = [];
      if (!userCartDoc.exists) {
        updatedProducts = [productId];
        await userCartRef.set({ products: updatedProducts });
      } else {
        const cartData = userCartDoc.data().products;
        updatedProducts = cartData.includes(productId)
          ? cartData.filter((id) => id !== productId)
          : [...cartData, productId];
        await userCartRef.update({ products: updatedProducts });
      }

      setBasket(updatedProducts);
    } catch (error) {
      console.error("Error updating cart: ", error);
    }
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, loading }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};
