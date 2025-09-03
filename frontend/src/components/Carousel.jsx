import React from 'react'

const Carousel = () => {
  return (
    <div>
       {/* Carousel */}
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="4000">
              <img src={`${process.env.PUBLIC_URL}/assets/images/burger_op.jpg`} className="d-block w-100" alt="Burger" />
              <div className="carousel-caption d-none d-md-block" >
                <h5 >Juicy Burger</h5>
                <p>Try our classic burger today!</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src={`${process.env.PUBLIC_URL}/assets/images/pizza_umm.jpg`} className="d-block w-100" alt="Pizza" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Cheesy Pizza</h5>
                <p>Freshly baked with your favorite toppings.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src={`${process.env.PUBLIC_URL}/assets/images/panner_masala.avif`} className="d-block w-100" alt="Paneer Masala" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Paneer Masala</h5>
                <p>Spicy and flavorful delight.</p>
              </div>
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
  )
};

export default Carousel;
