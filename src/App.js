//style
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/null.scss";
import "./styles/global.scss";
//components
// import Header from './components/header/Header'
//pages
import AddProductPages from "./pages/AddProductPages";
import HomePages from "./pages/HomePages";
import ProductPages from "./pages/ProductPages";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loyout } from './components/Loyout';
import ProfilePages from './pages/ProfilePages';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loyout />}>
              <Route index element={<HomePages />} />
              <Route path="product/:productId" element={<ProductPages />} />
              <Route path="Add-product" element={<AddProductPages />} />
              <Route path="profile" element={<ProfilePages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
