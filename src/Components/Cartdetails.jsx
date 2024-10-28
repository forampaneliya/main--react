import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { getcartAction } from "../Redux/Actions/addcartAction";
import { toast } from "react-toastify";




function Cartdetails() {
    let [cartproduct, setcartproducts] = useState([])
    // let addcart = useSelector((state) => state.addcartRerducers.cartrecord)
    // console.log("forammmm");
    // console.log(addcart);
    useEffect(() => {
        setTimeout(() => {
            getusercartdata()
        }, 1000)

    }, [])
    let dispatch = useDispatch()

    let getusercartdata = async () => {
        let userlocal = JSON.parse(localStorage.getItem("user"))

        let cartdata = await axios.get("http://localhost:4000/cart?userId=" + userlocal.id)
        console.log(cartdata.data);


        var newarray = []
        cartdata.data.map((v, i) => {
            newarray.push(v.productId)
        })
        console.log(newarray);
        // setcartIds(newarray)

        let cartalldata = newarray.map((id) => axios.get("https://fakestoreapi.com/products/" + id))

        //    console.log(cartalldata);

        let responsee = await Promise.all(cartalldata)
        console.log(responsee);
        let result = responsee.map((res) => res.data)

        result.map((v, i) => {
            v.cartQuntity = cartdata.data[i].quntity,
                v.cartId = cartdata.data[i].id
        })

        console.log("new");
        setcartproducts(result);

    }
    let removeCart = async(cartid) => {
        console.log(cartid);
        let cartRemovepro =await axios.delete("http://localhost:4000/cart/" + cartid)
        if (cartRemovepro.data) {
            getusercartdata()
            let userlocal = JSON.parse(localStorage.getItem("user"))
            dispatch(getcartAction(userlocal.id))
        }
    }
    let incrementquntity = async(cartid, cquntity) => {
        console.log(cartid, cquntity);
        let incrementcart =await axios.patch("http://localhost:4000/cart/" + cartid, {
            quntity: cquntity
        })
        if (incrementcart.data) {
            getusercartdata()
        }
        else {
            toast.error("error")
        }
    }
    let decrementquntity = async(cartid, cquntity) => {
        let incrementcart = await axios.patch("http://localhost:4000/cart/" + cartid, {
            quntity: cquntity
        })
        if (incrementcart.data) {
            getusercartdata()
        }
        else {
            toast.error("error")
        }


    }

    return (
        <>
            <div className="section-cart" >
                <Container  >
                    <div className="row-custom" >
                        <div className="cart-main-pr" >
                            {cartproduct.map((v, i) => {
                                return (
                                    <>
                                        <div className="product-main" style={{ backgroundColor: "white", marginTop: "5px" }}>

                                            <div className="row-custom">
                                                <div className="cart-img">
                                                    <div className="cart-main-img" style={{ height: "200px", width: "200px", padding: "10px", marginTop: "30px" }}>
                                                        <img src={v.image} alt="" height={150} width={150} /></div>
                                                </div>
                                                <div className="cart-content">
                                                    <h3 style={{ fontSize: "24px", maxWidth: "550px", fontWeight: "500" }}>{v.title}</h3>

                                                    <b><h5 style={{ fontSize: "22px", fontWeight: "700" }}>${v.price}</h5></b>
                                                    <p style={{ marginTop: "12px" }}>
                                                        <button style={{ border: "none", backgroundColor: "black", borderRadius: "2px", marginRight: "7px" }} onClick={() => incrementquntity(v.cartId, ++v.cartQuntity)}><FaPlus style={{ color: "white" }} /></button>
                                                        <span style={{ fontSize: "20px" }}> {v.cartQuntity}</span>
                                                        <button style={{ border: "none", backgroundColor: "black", borderRadius: "2px", marginLeft: "8px" }} onClick={() => decrementquntity(v.cartId, --v.cartQuntity)}><FaMinus style={{ color: "white" }} /></button>
                                                    </p>
                                                    <div className="wrap-cart-dele" style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <p style={{ fontSize: "25px" }}>Sub-Total=${v.price * v.cartQuntity}</p>
                                                        <h3 style={{ marginRight: "20px" }}><button style={{ color: "red", border: "none", borderRadius: "2px" }} onClick={() => removeCart(v.cartId)}><MdDeleteForever /></button></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )
                            })}
                        </div>

                        <div className="main-total-cart" style={{ backgroundColor: "white", marginTop: "5px" }}>
                            jhbhj
                        </div>



                    </div>

                </Container >
            </div>


        </>
    )
}
export default Cartdetails;