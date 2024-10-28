import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Categoryy(props) {
    return (
        <>
            <Container style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
            <div className="sort-wrap">
                <select name="sorting" id="" onChange={(e) => props.sorting(e)}>
                    <option value="">--Select Price--</option>
                    <option value="asc">Low to high</option>
                    <option value="dsc">High to Low</option>
                </select>
            </div>
                <Button variant="success" style={{ fontSize: "20px", marginLeft: "20px" }} onClick={()=>props.catpro("All")}>All Products</Button>{' '}

                {
                   props.cat.map((v, i) => {
                        return (
                            <>
                                <Button variant="success" style={{ fontSize: "20px", marginLeft: "20px" }} onClick={() => props.catpro(v)}>{v}</Button>{' '}


                            </>
                        )
                    })
                }
                 

            </Container>
            
        </>
    )
}
export default Categoryy;