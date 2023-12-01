import "../styles/productsList.scss"; 
//components
import Product from './Product';

export default function ProductsList() {
    return (
        <div className='productsList'>
            <div className="productsList__container">
                <h1 className="productsList__title">Оголошення</h1>
                    <ul className="productsList__products">
                        <Product />  
                        <Product />  
                        <Product />  
                        <Product />  
                        <Product />  
                        <Product />  
                        <Product />  
                        <Product />  
                        <Product />  
                    </ul>
            </div>
        </div>
    )
}
