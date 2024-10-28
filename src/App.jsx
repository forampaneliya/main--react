import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Singledetail from "./Singledetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Components/Signup";
import SignIn from "./Components/Signin";
import { Navbar } from "react-bootstrap";
import Navbarr from "./Components/Navbar";
import ForgotPassword from "./Components/ForgotPassword";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Cartdetails from "./Components/Cartdetails";


function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Navbarr/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/singleProDetail/:id" element={<Singledetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/cartdetails" element={<Cartdetails/>}/>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
