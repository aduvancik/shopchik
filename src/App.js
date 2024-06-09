//style
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/null.scss";
import "./styles/global.scss";
import "./styles/animation.scss";
//
import { BrowserRouter, } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useContext } from 'react';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
// import Loader from './components/Loader';


function App() {
  const { auth } = useContext(Context);
  const [loading] = useAuthState(auth);


  if (loading) {
    // return <Loader />
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
