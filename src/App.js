//style
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/null.scss";
import "./styles/additional.scss";
//components
import Header from './components/header/Header'
//pages
import AddProduct from "./pages/AddProduct";
import HomePages from "./pages/HomePages";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loyout } from './components/Loyout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loyout />}>
          <Route index element={<HomePages />} />
          <Route path="Add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
