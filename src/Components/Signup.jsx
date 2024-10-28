import { useState } from "react";
import Navbarr from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    let [user, setUser] = useState({})
    let [error, seterror] = useState({})

    let ChangeInput = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value })

    }
    console.log(user);

    function validation() {
        let errs = {}
        let emailvalid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!user.username) {
            errs.name = "please enter username"
        }
        if (!user.email) {
            errs.email = "please enter email"
        }
        else if (!emailvalid.test(user.email)) {
            errs.email = "@ and gmail.com is required"
        }
        if (!user.password) {
            errs.password = "Password is required"
        }
        if (!user.cpass) {
            errs.cpass = "Confirm password is required"
        }
        return errs

    }

    let submitData = async (e) => {
        e.preventDefault()

        let signuperr = validation()
        if (Object.keys(signuperr).length > 0) {
            seterror(signuperr)
        }
        else{
            try {
                console.log(user);
                let list = await axios.get("http://localhost:4000/user?email="+user.email);
                console.log(list.data)
                if (list.data.length == 0){
                    if (user.password == user.cpass) {
                        let newrecord = await axios.post("http://localhost:4000/user",user)
                        if (newrecord) {
                            toast.success("You are Registerd sucesssfully")
                            seterror({})
                            setUser({})
                        }
                        else {
                            toast.error("something wrong")
                        }
                    }
                    else {
                        console.log("error");
                        toast.error("password & confirm password doesn't match")
                    }
                }
                else {
                    console.log("email is already exist");
                    toast.error("email is already exist")
                }
            } catch (err) {
                console.log(err);
                toast.error("error")
            }
            
           
        }
       
    }

    return (
        <>
            <form action="" method="post" style={{ padding: "80px" }} onSubmit={(e) => submitData(e)}>
                <table align="center" className="table-sign-up">
                    <h3 style={{ textAlign: "center", marginBottom: "-20px", marginTop: "20px" }}>SignUp</h3>
                    <div style={{ paddingTop: "20px", textAlign: "center", padding: "50px 70px" }}>
                        <tr className="label-sign-up">Username</tr>
                        <tr><input type="text" className="sign-up-input" name="username" onChange={(e) => ChangeInput(e)} value={user.username ? user.username : ""} /></tr>
                        {error.name && <span style={{ color: "red" }}>{error.name}</span>}

                        <tr className="label-sign-up">Email</tr>
                        <tr><input type="text" className="sign-up-input" name="email" onChange={(e) => ChangeInput(e)} value={user.email ? user.email : ""} /></tr>
                        {error.email && <span style={{ color: "red" }}>{error.email}</span>}


                        <tr className="label-sign-up">Password</tr>
                        <tr><input type="password" className="sign-up-input" name="password" onChange={(e) => ChangeInput(e)} value={user.password ? user.password : ""} /></tr>
                        {error.password && <span style={{ color: "red" }}>{error.password}</span>}


                        <tr className="label-sign-up">Confirm Password</tr>
                        <tr><input type="password" className="sign-up-input" name="cpass" onChange={(e) => ChangeInput(e)} value={user.cpass ? user.cpass : ""} /></tr>
                        {error.cpass && <span style={{ color: "red" }}>{error.cpass}</span>}


                        <tr><input type="submit" value={"SignUp"} className="sign-Up-main" /></tr>



                    </div>
                </table>
            </form>
            <ToastContainer />


        </>
    )
}
export default Signup;