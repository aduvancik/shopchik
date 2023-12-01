// import Header from '../components/header/Header'
import Search from '../components/Search'
import Categories from '../components/Categories'
import ProductsList from '../components/ProductsList'

export default function HomePages() {
  return (
      <>
    {/* <Header /> */}
    <div style={{maxWidth: "1200px",margin: "0px auto"}}>
    <Search />
    <Categories />
    <ProductsList />
    </div>
    </>
  )
}
