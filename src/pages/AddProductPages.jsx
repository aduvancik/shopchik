//styles
import "../styles/addProduct.scss";
//variable
import { categoriesArr } from "../listProducts";
import AddTitle from "../components/addProduct/AddTitle";
//components

export default function AddProduct() {
  return (
    <div className="addProduct">
      <h1 className="addProduct__title title">Створити оголошення</h1>
      <div div className="addProduct__container">
        <h2 className="title-h2">Опишіть у подробицях</h2>
        <form>
          <AddTitle />
          <h2 className="title-h2">Фото</h2>
          <div className="addProduct__containerPhoto">
            <div className="addProduct__Photo">add photo</div>
          </div>
        </form>
      </div>
    </div>
  );
}
