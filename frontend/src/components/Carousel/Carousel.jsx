import React from "react";
import "./Carousel.css";

const Carousel = () => {
  return (
    <div
      id="heroCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4500"
    >
      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/burger_op.jpg`}
            className="d-block w-100 hero-img"
            alt="Burger"
          />
          <div className="hero-overlay" />
          <div className="carousel-caption hero-caption">
            <h1>Juicy Burgers</h1>
            <p>Fresh • Hot • Delicious</p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/pizza_umm.jpg`}
            className="d-block w-100 hero-img"
            alt="Pizza"
          />
          <div className="hero-overlay" />
          <div className="carousel-caption hero-caption">
            <h1>Cheesy Pizzas</h1>
            <p>Baked to perfection</p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/panner_masala.avif`}
            className="d-block w-100 hero-img"
            alt="Paneer Masala"
          />
          <div className="hero-overlay" />
          <div className="carousel-caption hero-caption">
            <h1>Paneer Specials</h1>
            <p>Rich • Spicy • Authentic</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Carousel;
