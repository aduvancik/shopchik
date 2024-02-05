import { Col, Container, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import "../styles/search.scss";
import { AiOutlineSearch } from "react-icons/ai";
// import {FaLocationDot} from "react-icons/fa6";
export default function Search() {
  return (
    <div className='search'>
      <form>
        <Container gap={50}>
          <Row>
            <Col xs={5}>
              <input type="text" placeholder="Що шукаєте?" className="search__input input" />
            </Col>
            <Col xs={5}>
              <input className="search__input input " type="text" placeholder="Уся Україна" />
            </Col>
            <Col xs={1}>
              <button type="submit">
                <span>Пошук</span>
                <AiOutlineSearch />
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
              <DropdownButton id="dropdown-item-button" title="Місто">
                <Dropdown.ItemText>Виберіть місто</Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item as="li">Київ</Dropdown.Item>
                <Dropdown.Item as="li">Львів</Dropdown.Item>
                <Dropdown.Item as="li">Івано-Франківськ</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <InputGroup.Text>Від</InputGroup.Text>
                <Form.Control aria-label="Dollar amount (with dot and two decimal places)" placeholder="0" />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <Form.Control aria-label="Dollar amount (with dot and two decimal places)" placeholder="100" />
                <InputGroup.Text>$</InputGroup.Text>
                <InputGroup.Text>До</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Сортувати за</option>
                <option value="1">Ціною</option>
                <option value="2">Датою</option>
              </Form.Select>
            </Col>
            <Col>
               <Form.Select aria-label="Default select example" xs={2}>
                <option>Спочатку</option>
                <option value="1">
                  {/* <Form.Select aria-label="Default select exampleEE" xs={2}>
                    <option>Спочатку</option>
                    <option value="1">новіші / дорожчі</option>
                    <option value="2">старіші / дешевші</option>
                  </Form.Select> */}
                </option>
                <option value="2">старіші / дешевші</option>
              </Form.Select> 
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  )
}
