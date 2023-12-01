
  export default function CategiriesItem({title,alt}) {
    return (
      <div className="categories__item">
                  <img className="categories__img" src={require(`../img/categories/${alt}.jpg`)} alt={alt} />
                  <p className='categories__text'>{title}</p>
              </div>
    )
  }
