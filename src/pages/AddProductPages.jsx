import { Form } from "react-bootstrap";
import "../styles/addProduct.scss";

export default function AddProduct() {
    return (
        <div className='addProduct'>
            <h1 className="addProduct__title title">Створити оголошення</h1>
            <div className="addProduct__container">
                <h2 className="title-h2">Опишіть у подробицях</h2>
                <Form>
                    <label for="title">Вкажіть назву*</label>
                    <input type="text" id="title" placeholder="Наприклад, Лабрадор‐ретривер цуценятка" className="input" />
                    <Form.Group className="mb-6" controlId="exampleForm.ControlTextarea1">
                        <label>Опис*</label>
                        <Form.Control as="textarea" className="input" rows={10} placeholder="Подумайте, що ви хотіли би дізнатися з оголошення. І додайте це в опис" />
                    </Form.Group>
                    <label for="price">Ціна за 1 шт.*</label>
                    <input type="number" id="price" placeholder="Ціна" className="input" />
                </Form>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>

            </div>
        </div>
    )
}
