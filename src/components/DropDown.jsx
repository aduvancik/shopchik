import React, { useEffect, useState } from 'react';
import "../styles/dropDown.scss";
import { categoriesArr } from '../listProducts';

export default function DropDown(props) {
    const { setProductData, productData } = props;
    const [showDropDown, setShowDropDown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
    }, [productData]);

    const handleDocumentClick = (event) => {
        if (!event.target.closest('.dropdown')) {
            setShowDropDown(false);
        }
    }

    const showMenu = () => {
        setShowDropDown(!showDropDown);
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setProductData(prevData => ({
            ...prevData,
            category: category,
        }));
        setShowDropDown(false);
    }
    return (
        <div className="dropdown">
            <button type='button' className="button" onClick={showMenu}>
                {selectedCategory ? selectedCategory.title : "Виберіть категорію"}
            </button>
            <div className={`dropdown-content ${showDropDown ? "dropdown-content-click" : ""}`}>
                {categoriesArr.map((category) =>
                    category.alt !== "all" ? (
                        <li key={category.alt} onClick={() => handleCategorySelect(category)}>
                            {category.title}
                        </li>
                    ) : null
                )}
            </div>
        </div>
    )
}
