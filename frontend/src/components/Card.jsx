import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "./Addcart.png";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {

  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options;
  const priceRef = useRef();
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); // Default size

  let finalPrice = qty * (options[size] ? parseInt(options[size]) : 0); // Prevents NaN errors

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let existingFood = data.find((item) => item.id === props.foodData._id && item.size === size);

    if (existingFood) {
      await dispatch({
        type: "UPDATE",
        id: props.foodData._id,
        title: props.foodData.title,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodData._id,
        title: props.foodData.title,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodData.img,
      });
    }

    
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4"> {/* Improved spacing */}
      <div
        className="card mt-4 shadow-lg"
        style={{
          width: "18rem",
          height:"30rem",
          color: "white",
          backgroundColor: "#333",
          borderRadius: "8px",
        }}
      >
        <img
          src={props.foodData.img}
          className="card-img-top"
          alt="Food item"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize:"2rem"}}>{props.foodData.title}</h5>

          <div className="d-flex justify-content-between align-items-center mt-2">
            {/* Quantity Dropdown */}
            <select
              className="form-select bg-success text-white"
              style={{ width: "40%" }}
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size Dropdown */}
            <select
              className="form-select bg-success text-white"
              style={{ width: "50%" }}
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="text-white fw-bold mt-2 text-center">₹{finalPrice}/-</div>

          {/* Add to Cart Button */}
          <button
            className="btn bg-white text-success w-100 mt-3"
            onClick={handleAddToCart}
          >
            <img src={cart} alt="Add to cart" style={{fontFamily:"cursive",height:"60px",width:"70px", fontSize:"4rem", padding:"5px"}} />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
