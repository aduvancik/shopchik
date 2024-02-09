//styled
import "../styles/categories.scss";
//components
import CategiriesItem from './CategiriesItem';
//variable
import { categoriesArr } from '../listProducts';

export default function Categories({handleCategoryClick }) {
  return (
    <div className='categories'>
      <p className="categories__title">Категорії</p>
      <div className="categories__items">
        {categoriesArr.map((category) => (
          <CategiriesItem
            key={category.title}
            alt={category.alt}
            title={category.title}
            handleCategoryClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  )
}

