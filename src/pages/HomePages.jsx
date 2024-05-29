import Search from '../components/Search'
import Categories from '../components/Categories'
import ProductsList from '../components/ProductsList'
import { useContext, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '..';
import Loader from '../components/Loader';

export default function HomePages() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { firestore } = useContext(Context);
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [products, loading] = useCollectionData(
    firestore.collection("products").orderBy("createdAt")
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filterProductsFun = (searchText, products) => {
    if (!searchText) {
      return products
    }
    return products.filter(product =>
      product.product.title.toLowerCase().includes(searchText.toLowerCase())
    )
  };

  let filterProducts = filterProductsFun(searchTerm, products);

  if (maxPrice) {
    filterProducts = filterProducts.filter(product =>
      product.product.price <= parseInt(maxPrice)
    );
    console.log(filterProducts);
  };

  if (minPrice) {
    filterProducts = filterProducts.filter(product =>
      product.product.price >= parseInt(minPrice)
    );
  };

  if (sortBy === 'dear') {
    filterProducts.sort((a, b) => b.product.price - a.product.price);
  } else if (sortBy === 'cheap') {
    filterProducts.sort((a, b) => a.product.price - b.product.price);
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} setSortBy={setSortBy} />
      <Categories handleCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
      <ProductsList selectedCategory={selectedCategory} filterProducts={filterProducts} />
    </>
  )
}
