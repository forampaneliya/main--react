import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import { IoIosStar } from "react-icons/io";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AddcartAction } from "./Redux/Actions/addcartAction";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function Singledetail() {
    let product = useParams()
    let usersLogin = useSelector((state) => state.userReducer.userInitialvalue)
    // console.log("f")
    let dispatch = useDispatch()

    // console.log(usersLogin);
    let [single, setSingle] = useState({})

    useEffect(() => {
        setTimeout(() => {
            singleproduct()

        }, 1000)
    }, setSingle)
    function singleproduct() {
        axios.get("https://fakestoreapi.com/products/" + product.id)
            .then((res) => {
                setSingle(res.data)
            }).catch((err) => {
                alert("error")
            })
    }

    async function addtocart(e) {
        e.preventDefault()
        console.log(e.target.quntity.value);
        console.log(product.id);
        console.log(usersLogin.id);
        let addcartdetails = {
            quntity: e.target.quntity.value,
            productId: product.id,
            userId: usersLogin.id
        }

        let checkcart = await axios.get(`http://localhost:4000/cart?productId=${product.id}&userId=${usersLogin.id}`)
        if (checkcart.data.length == 0) {
            dispatch(AddcartAction(addcartdetails))

        }
        else {
            toast.error("Product already into cart!!")
        }



    }
    return (
        <>
            {/* <Container style={{ margin:"50px",marginTop: "50px" }}> */}
            <div className="contai" >
                <div className="row" style={{ display: "flex", alignItems: "center" }}>
                    <div className="col-6">
                        <div className="single-img">
                            <img src={single.image} alt="" style={{ width: "500px", marginLeft: "90px" }} />
                        </div>
                    </div>
                    <div className="col-6" >
                        <h1 className="heading-single">{single.title}</h1>
                        <div className="para-single">
                            {single.description}
                        </div>
                        <h3 className="price-single">${single.price}</h3>
                        <div className="wrap-single">
                            <Badge bg="success single-rate">
                                {single.rating ? single.rating.rate : ""}<IoIosStar style={{ marginTop: "-5px", marginLeft: "5px" }} />
                            </Badge>
                            {single.rating ? single.rating.count > 150 ?
                                <p style={{ color: "green", fontSize: "20px", marginTop: "19px", marginLeft: "25px", fontWeight: "600" }}>Available<MdOutlineDoubleArrow style={{ color: "green" }} />
                                </p> : <p style={{ color: "red", fontSize: "20px", marginTop: "19px", marginLeft: "25px", fontWeight: "600" }}>limited stock<MdOutlineProductionQuantityLimits style={{ color: "red", marginLeft: "5px" }} />
                                </p> : ""}
                        </div>
                        <form action="" method="post" onSubmit={(e) => addtocart(e)}>
                            <div className="qntity" style={{ display: "flex" }}>
                                <span style={{ display: "flex", alignItems: "center", fontSize: "18px", marginRight: "10px" }}>Select Quntity</span>
                                <select name="quntity" id="">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                    <option value="5">Five</option>

                                </select>
                            </div>
                            <div className="button-wrap">
                                {usersLogin.username ? <div class="wrap">
                                    <button type="submit" class="button" style={{ marginRight: "20px" }}>Add To Cart</button>
                                </div> : <div class="wrap">
                                    <Link to="/signin"><button type="submit" class="button" style={{ marginRight: "20px" }}>Add To Cart</button></Link>
                                </div>}

                                <div class="wrap">
                                    <button class="button">Buy Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* </Container> */}
            <ToastContainer />

        </>
    )
}
export default Singledetail