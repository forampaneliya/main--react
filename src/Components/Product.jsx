
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import {Link} from "react-router-dom"
import { FaStar } from "react-icons/fa6";

function Productt(props)
{
    return(
        <>
         <Container >
                <div className="row-custom" style={{marginLeft:"65px"}}>
                    {
                       props.pro.filter((v, i) => {
                            
                                if(props.search=="")
                                {
                                    return v
                                }
                                else if(v.title.toLocaleLowerCase().match(props.search))
                                {
                                    return v
                                }

                                
                        })
                            .map((v, i) => {
                                return (
                                    <>
                                        <div className="col-3-custom">
                                            <Card style={{ width: '22rem', marginTop: "30px", height: "550px",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",marginBottom:"50px" }}>
                                                
                                              <Link to={"/singleProDetail/"+v.id}>  <img src={v.image} alt="" width={280} height={300} style={{ padding: "40px", paddingLeft: "90px" }} /></Link>
                                                <Card.Body>
                                                    <Card.Title style={{ maxWidth: "400px" }}>{v.title}</Card.Title>
                                                    <p style={{ fontSize: "32px", fontWeight: "600" }}>$
                                                        {v.price}</p>

                                                    <Badge pill bg="success" style={{ fontSize: "18px" }}>
                                                        {v.rating.rate}<FaStar style={{ color: "white", marginLeft: "5px", marginTop: "-5px" }} />

                                                    </Badge>

                                                </Card.Body>
                                            </Card>

                                        </div>

                                    </>
                                )
                            })
                    }
                </div>

            </Container>
        </>
    )
}
export default Productt;