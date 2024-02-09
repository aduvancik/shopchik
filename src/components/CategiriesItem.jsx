export default function CategiriesItem({ title, alt, handleCategoryClick }) {
  return (
    <div
      className="categories__item"
      onClick={() => {
        handleCategoryClick(alt);
      }}
    >
      <img
        className="categories__img"
        src={require(`../img/categories/${alt}.jpg`)}
        alt={alt}
      />
      <p className="categories__text">{title}</p>
    </div>
  );
}
