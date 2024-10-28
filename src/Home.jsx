import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import "/Home.css"
import Navbarr from './Components/Navbar';
import Categoryy from './Components/Category';
import Productt from './Components/Product';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';





function Home() {
    let [list, setList] = useState([])
    let [product, setProduct] = useState([])
    let [ser, setser] = useState("")
    let [perPage, setPerPage] = useState(6)
    let [current, setCurrent] = useState(1)
    let [ArrayPages, setArrayPages] = useState([])
    useEffect(() => {
        // Pagination()

        setTimeout(() => {
            fetchData()
            productData()

        }, 1000)


    }, [setList, setProduct, current])

    let Pagination = (getPro) => {
        let allPages = Math.ceil(getPro.length / perPage)
        let page = []
        for (let i = 1; i <= allPages; i++) {
            page.push(i)
        }
        console.log(page);
        setArrayPages(page ? page : [])


        let lastIndex = perPage * current;
        let firstIndex = lastIndex - perPage;
        let allpro = getPro.slice(firstIndex, lastIndex);
        // let arr=newArray?newArray:[]
        setProduct(allpro)
        // console.log(product);


    }

    let fetchData = () => {
        axios.get("https://fakestoreapi.com/products/categories")
            .then((res) => {
                let alldata = res.data;
                setList(alldata ? alldata : [])
            }).catch((err) => {
                alert("something wrong")
            })
    }
    let productData = () => {
        axios.get("https://fakestoreapi.com/products/")
            .then((res) => {
                let product = res.data;
                setProduct(product ? product : [])
                Pagination(res.data)

            }).catch((err) => {
                console.log(err);

            })
    }

    function changeCatagory(cat) {
        if (cat == "All") {
            productData()
        }
        else {
            axios.get("https://fakestoreapi.com/products/category/" + cat)
                .then((res) => {
                    let product = res.data;
                    setProduct(product ? product : [])

                }).catch((err) => {
                    console.log(err);

                })
        }
    }

    function serchingData(e) {
        // e.preventDefault()
        let newdata = e.target.value;
        setser(newdata)
    }

    function sortByPrice(e) {
        let sortPrice = e.target.value;
        console.log(sortPrice);
        let newpro = [...product]
        if (sortPrice == "asc") {
            newpro.sort((a, b) => a.price - b.price)
        }
        else if (sortPrice == "dsc") {
            newpro.sort((a, b) => b.price - a.price)
        }
        setProduct(newpro)

    }
   
    

    return (
        <>
            <form style={{textAlign:"center",marginTop:"20px",marginBottom:"-20px"}}>
             <input type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>serchingData(e)}/>
           
            </form>

            <Categoryy cat={list} catpro={changeCatagory} sorting={sortByPrice} />
            <Productt pro={product} search={ser} />
            <div style={{display:"flex",justifyContent:"center",marginBottom:"50px"}}>
                {
                    ArrayPages.map((v, i) => {
                        return (<>
                            <button onClick={() => setCurrent(v)} className='Page'>{v}</button>
                        </>)
                    })
                }
            </div>
        </>
    )
}

export default Home
