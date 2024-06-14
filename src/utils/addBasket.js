export const addBasket = async (event, product, setBasket, user, firestore, setError) => {
  event.stopPropagation();

  if (!user) {
    setError(true);
    return;
  }

  try {
    const userCartRef = firestore.collection("carts").doc(user.uid);
    const userCartDoc = await userCartRef.get();

    const productRef = firestore.collection("products").doc(product.uid);
    const productDoc = await productRef.get();

    if (!userCartDoc.exists) {
      await userCartRef.set({ products: [product.uid] });
      setBasket(true);

      let productBasket = [];
      if (productDoc.exists) {
        productBasket = Array.isArray(productDoc.data().basket) ? productDoc.data().basket : [];
      }
      productBasket.push(user.uid);
      await productRef.update({ basket: productBasket });
    } else {
      const cartData = userCartDoc.data();
      const updatedProducts = cartData.products.includes(product.uid)
        ? cartData.products.filter((productId) => productId !== product.uid)
        : [...cartData.products, product.uid];

      await userCartRef.update({ products: updatedProducts });
      setBasket(!cartData.products.includes(product.uid));

      let productBasket = Array.isArray(productDoc.data().basket) ? productDoc.data().basket : [];

      if (cartData.products.includes(product.uid)) {
        productBasket = productBasket.filter((uid) => uid !== user.uid);
      } else {
        productBasket.push(user.uid);
      }
      await productRef.update({ basket: productBasket });
    }
  } catch (error) {
    setError(true);
  }
};
