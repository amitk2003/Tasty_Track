import React,{useEffect, useRef, useState} from 'react';
import cart from './Addcart.png'
import { useCart, useDispatchCart } from './ContextReducer';
export default function Card(props) {
  let dispatch=useDispatchCart();
  let data=useCart();
  let options=props.options;
  const priceRef= useRef();
  let priceOptions=Object.keys(options);
  let [qty,setQty]=useState(1);
  let [size,setSize]=useState("");
  const handleAddToCart=async()=>{
        let food=[];
        for(const item of data){
          if(item.id===props.foodData._id){
            food=item;
            
            break;
          }

          
        }
        console.log(food);
        if(food!=[]){
          if(food.size===size){
            await dispatch({ type: "UPDATE", id: props.foodData._id,title:props.foodData.title,price:finalPrice,qty:qty,size:size})
            return;
          }
          else if(food.size!==size){
            await dispatch({type: "ADD", id:props.foodData._id,title:props.foodData.title,price:finalPrice,qty:qty,size:size,img:props.foodData.img});
            return;
          }
          return;
        }
        await dispatch({type: "ADD", id:props.foodData._id,title:props.foodData.title,price:finalPrice,qty:qty,size:size,img:props.foodData.img});
        
      
  }
  let finalPrice =qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])
  return (
    <div className="col-md-2"> {/* Ensures each card occupies its column */}
      <div
        className="card mt-3"
        style={{
          width: '23rem',
          maxHeight: '31rem',
          margin: '0px',
          color: 'white',
          backgroundColor: '#333', // Background for better contrast
          borderRadius: '8px', // Rounded corners
          top:'20px',
          gap:'10px'
          

        }}
      >
        <img
          src={props.foodData.img}
          className="card-img-top"
          style={{
            width: '100%', // Ensures the image spans the full width of the card
            top:'10px',
            height: '16rem',
            objectFit: 'cover', // Prevents 
          }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: '2rem', fontWeight: 'lighter' ,textAlign:'center'}}>{props.foodData.title}</h5>
          {/* <p className="card-text" style={{ fontSize: '12px', marginTop: '10px', color: '#ddd' }}>
            {props.foodData.description}
          </p> */}
          <div className="container w-100 mt-1" >
            <div className="d-flex align-items-center justify-content-between">
              {/* Quantity Dropdown */}
              <select
                className="form-select bg-success text-white"
                style={{
                  width: '30%',
                  border: 'none',
                  borderRadius: '4px',
                }}
                onChange={(e)=>setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Size Dropdown */}
              <select
                className="form-select bg-success text-white"
                style={{
                  width: '70%',
                  border: 'none',
                  borderRadius: '4px',
                  margin:'10px'
                }}
                onChange={(e)=>setSize(e.target.value)}
                ref={priceRef}
              >
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>

                })}
              </select>

              {/* Price Display */}
              <div
                className="text-white fw-bold"
                style={{
                  fontSize: '1rem',
                  marginLeft: '10px',
                  color: '#eee',
                }}
              >
                ₹{finalPrice}/-
              </div>
              <hr/>
              <button className='btn bg-white text-success mx-3'  style={{width:"150px",height:"40px" }} onClick={handleAddToCart}><img src={cart} alt="invalid item" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
