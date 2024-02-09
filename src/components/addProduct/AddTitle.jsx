import React from "react";

export default function AddTitle() {
  return (
    <>
      <div className="addProduct__group">
        <label htmlFor="title">Вкажіть назву*</label>
        <input
          type="text"
          id="title"
          placeholder="Наприклад, Лабрадор‐ретривер цуценятка"
          className="input"
        />
      </div>
      <div className="addProduct__group">
        <label htmlFor="category">Виберіть категорію*</label>
        <select name="cars" id="category">
          <optgroup label="Категорія:">
            {categoriesArr.map((category) =>
              category.alt !== "all" ? (
                <option value={category.alt} key={category.alt}>
                  {category.title}
                </option>
              ) : null
            )}
          </optgroup>
        </select>
      </div>
    </>
  );
}
