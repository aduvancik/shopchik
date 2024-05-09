export const addBasket = async (event,product,setBasket,basket,user,firestore,setError) => {
    event.stopPropagation();
    try {
      const userCartRef = firestore.collection("carts").doc(user.uid);
      const userCartDoc = await userCartRef.get();
      if (!userCartDoc.exists) {
        await userCartRef.set({ products: [product.uid] });
        setBasket(true);
      } else {
        const cartData = userCartDoc.data();
        const updatedProducts = cartData.products.includes(product.uid)
          ? cartData.products.filter((productId) => productId !== product.uid)
          : [...cartData.products, product.uid];
        await userCartRef.update({ products: updatedProducts });
        setBasket(!basket);
      }
    } catch (error) {
      setError(true);
    }
  };