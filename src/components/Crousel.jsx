import React from 'react';
import './crousel.css'

export default function Crousel() {
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-caption" style={{zIndex:"10",bottom:"-20px"}}>
        <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success text-white bg-info" type="submit">Search</button>
      </form>
        </div>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-item active">
            <img src={`${process.env.PUBLIC_URL}/assets/images/burger.avif`} className="d-block w-100 " alt="Burger" style={{filter:"brightness(40%)"}} />
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/assets/images/pastery.jpg`} className="d-block w-100" alt="Chicken Biryani" style={{filter:"brightness(40%)"}} />
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/assets/images/panner_masala.avif`} className="d-block w-100" alt="Paneer Masala" style={{filter:"brightness(50%)"}} />
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/assets/images/pizza.avif`} className="d-block w-100" alt="Pizza" style={{filter:"brightness(40%)"}} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
