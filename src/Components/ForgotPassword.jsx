import Navbarr from "./Navbar";

function ForgotPassword()
{
    return(
        <>
                    <form action="" method="post" style={{ padding: "80px" }}>
                <table align="center" className="table-sign-up">
                    <h3 style={{textAlign:"center",marginBottom:"-20px",marginTop:"20px"}}>Forgot Password</h3>
                    <div style={{ paddingTop: "20px", textAlign: "center", padding: "50px 70px"  }}>


                        <tr className="label-sign-up">New Password</tr>
                        <tr><input type="password" className="sign-up-input" /></tr>

                        <tr className="label-sign-up">Confirm Password</tr>
                        <tr><input type="password" className="sign-up-input" /></tr>

                        <tr><input type="submit" value={"Submit"} className="sign-Up-main" /></tr>



                    </div>
                </table>
            </form>
        
        </>
    )
}
export default ForgotPassword;