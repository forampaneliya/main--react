import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getuserAction, removeuserAction } from '../Redux/Actions/userActions';
import { useEffect } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { getcartAction } from '../Redux/Actions/addcartAction';



function Navbarr() {

  let usersLogin = useSelector((state) => state.userReducer.userInitialvalue)
  console.log("test")
  // console.log(usersLogin);
  let addcart = useSelector((state) => state.addcartRerducers.cartrecord)
  console.log("foram");
  console.log(addcart.data);

useEffect(()=>{
  let userrData=JSON.parse(localStorage.getItem("user"))
  if(userrData){
    dispatch(getcartAction(userrData.id))

  }
  
},[])

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getuserAction())
  }, [])

  function Removedata() {
    dispatch(removeuserAction())
  }


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">

            </Form>



            {usersLogin.email ? usersLogin.email :
              <Link to="/signup"> <button className='Sign-up'>Sign Up</button></Link>
            }

            {usersLogin.email ?
              <button className='Sign-In' onClick={() => Removedata()} >Logout</button>
              :
              <Link to="signin">  <button className='Sign-In' >Sign In</button></Link>

            }
            {usersLogin.email?<Link to="/cartdetails"><div className='cart-wrap'>
              <FaShoppingCart className='cart' style={{color:"black"}} />
              <div className="count">{addcart.length}</div>
            </div></Link>:""}
            


          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}
export default Navbarr