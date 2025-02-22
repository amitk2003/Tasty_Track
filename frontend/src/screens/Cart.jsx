import React from 'react'
import Delete from './delete.png'
import { useCart, useDispatchCart } from '../components/ContextReducer';
const CartUrl='https://tasty-track-lyea.vercel.app/api/OrderData';
const cart_url=CartUrl || 'http://localhost:5000/api/OrderData';
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
    return (
    <div>
        <div className='m-2 w-70 text-center fs-5'>The Cart is Empty!</div> 
    </div>
    )
}
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("UserEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    // / Debugging: Log values before sending request
    console.log("Checkout data:", data);
    console.log("User Email:", userEmail);
    console.log("Order Date:", new Date().toLocaleDateString() + new Date().toLocaleTimeString());
    let response = await fetch(cart_url, {
    method: 'POST',
    credentials:'include',
    headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
    },
    body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toLocaleDateString()+"  " + new Date().toLocaleTimeString()
    })
    });
    console.log("Order output", response)
    if (response.ok) {
    dispatch({ type: "DROP" });
    alert("order placed successfully");
    } else{
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to place order'}`);
    }
}

let totalPrice = data.reduce((total, food) => total + food.price, 0)
return (
    <div>

    {console.log(data)}
    <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
        <thead className=' text-success fs-4'>
            <tr>
            <th scope='col' >#</th>
            <th scope='col' >Name</th>
            <th scope='col' >Quantity</th>
            <th scope='col' >Option</th>
            <th scope='col' >Amount</th>
            <th scope='col' >Delete</th>
            </tr>
        </thead>
        <tbody>
            {data.map((food, index) => (
            <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.title}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
               
                <td ><button type="button" className="btn p-0"><img src={Delete} alt='delete' onClick={()=>{dispatch({type: "REMOVE", index:index})}} style={{width:"30px"}}/></button> </td></tr>
            ))}
        </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
        <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
    </div>



    </div>
)
}