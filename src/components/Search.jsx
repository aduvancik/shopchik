import { useEffect, useState } from "react";
import "../styles/search.scss";
import { AiOutlineSearch } from "react-icons/ai";
export default function Search(props) {
  const { setSearchTerm, setMaxPrice, setMinPrice, setSortBy } = props;
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const categoryArr = ["не сортувати", "дешевші", "дорожчі"];

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (event) => {
    if (!event.target.closest('.dropdown')) {
      setShowDropDown(false);
    }
  };

  const showMenu = () => {
    setShowDropDown(!showDropDown);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === categoryArr[1]) {
      setSortBy("cheap");
    } else if (category === categoryArr[2]) {
      setSortBy("dear");
    } else {
      setSelectedCategory("");
    }
    setShowDropDown(false);
  }

  const submit = (e) => {
    e.preventDefault();
    setSearchTerm(title);
    const targetElement = document.getElementById("productsList");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }


  return (
    <div className="search">
      <form autoComplete="on">
        <div>
          <div className="search__container">
            <input
              type="text"
              placeholder="Що шукаєте?"
              className="search__input input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="search__input input "
              type="text"
              placeholder="Уся Україна"
            />
            <button type="submit" onClick={(e) => submit(e)} className="search__button_search button">
              <span>Пошук</span>
              <AiOutlineSearch />
            </button>
          </div>
          <div className="search__container">
            <p>ціна: </p>
            <input className="input search__price" type="number" placeholder="від:" onChange={(e) => setMinPrice(e.target.value)} />
            <input className="input search__price" type="number" placeholder="до:" onChange={(e) => setMaxPrice(e.target.value)} />
            <div className="dropdown">
              <button type='button' className="button" onClick={showMenu}>
                {selectedCategory ? selectedCategory : "показувати спочатку"}
              </button>
              <div className={`dropdown-content ${showDropDown ? "dropdown-content-click" : ""}`}>
                {categoryArr.map((category) =>
                  category.alt !== "all" ? (
                    <li key={category} onClick={() => handleCategorySelect(category)}>
                      {category}
                    </li>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
