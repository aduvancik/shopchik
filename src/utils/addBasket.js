import firebase from 'firebase/compat/app';

export const addBasket = async (event, product, setBasket, basket, user, firestore, setError) => {
  event.stopPropagation();

  if (!user) {
    setError(true);
    console.error("Користувач не ввійшов у систему.");
    return;
  }

  try {
    const userCartRef = firestore.collection("carts").doc(user.uid);
    const userCartDoc = await userCartRef.get();

    if (!userCartDoc.exists) {
      await userCartRef.set({ products: [product.uid] });
      setBasket(true);
      console.log("Продукт додано до кошика.");
    } else {
      const cartData = userCartDoc.data();
      const updatedProducts = cartData.products.includes(product.uid)
        ? cartData.products.filter((productId) => productId !== product.uid)
        : [...cartData.products, product.uid];

      await userCartRef.update({ products: updatedProducts });
      setBasket(!basket);

      if (!cartData.products.includes(product.uid)) {
        const productRef = firestore.collection("products").doc(product.uid);
        await productRef.update({ basket: 1 });
        console.log("Продукт оновлено.");
      }
    }
  } catch (error) {
    setError(true);
    console.error("Помилка оновлення кошика користувача:", error);
  }
};