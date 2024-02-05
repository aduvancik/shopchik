import Search from '../components/Search'
import Categories from '../components/Categories'
import ProductsList from '../components/ProductsList'
import { useState } from 'react';

export default function HomePages() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
};

  return (
      <>
    <Search />
    <Categories handleCategoryClick={handleCategoryClick}/>
    <ProductsList selectedCategory={selectedCategory}/>
    </>
  )
}
