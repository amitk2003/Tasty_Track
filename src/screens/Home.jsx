import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import './crousel.css';
import './Home.css';
import searchItem from './search.png';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    console.log(searchTerm)
    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/foodTypes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setFoodItem(data.foodItems || []);
                setFoodCat(data.foodCategory || []);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };
        loadData();
    }, []);

    // Handle search submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            alert('Please enter a search term');
            return;
        }

        try {
            console.log("searching for search item", searchTerm);
            const response = await fetch('http://localhost:5000/api/foodTypes/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ SearchTerm: searchTerm }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data = await response.json();
            console.log('search Results: ',data);
            setFilteredFoodItems(data.foodVareity || []);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    // Debug logs for monitoring state
    useEffect(() => {
        console.log('Current filtered items:', filteredFoodItems);
    }, [filteredFoodItems]);

    return (
        <>
            <Navbar />
            <div>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </div>
                    <div className="carousel-caption" style={{ zIndex: "10", bottom: "-20px" }}>
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-center">
                                <input 
                                    className="form-control me-2" 
                                    type="search" 
                                    placeholder="Search" 
                                    aria-label="Search" 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                />
                                <button type="submit">
                                    <img src={searchItem} style={{width:'30px'}} alt="search" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-item active">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/burger.avif`} className="d-block w-100" alt="Burger" style={{ filter: "brightness(40%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/pastery.jpg`} className="d-block w-100" alt="Chicken Biryani" style={{ filter: "brightness(40%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/panner_masala.avif`} className="d-block w-100" alt="Paneer Masala" style={{ filter: "brightness(50%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/pizza.avif`} className="d-block w-100" alt="Pizza" style={{ filter: "brightness(40%)" }} />
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

            <div className="container">
                {foodCat.length > 0 ? (
                    foodCat.map((category) => {
                        const categoryItems = searchTerm
                            ? filteredFoodItems.filter((item) => item.categoryName === category.categoryName)
                            : foodItem.filter((item) => item.categoryName === category.categoryName);

                        return (
                            <section key={category._id} className="category-section">
                                <h2 className="fs-1" style={{color:"aqua",textAlign:"center"}}>{category.categoryName}</h2>
                                <hr style={{maxWidth:"2000px"}}/>
                                <div className="row gx-4 gy-3" style={{marginTop:"-70px"}}>
                                    {categoryItems.length > 0 ? (
                                        categoryItems.map((filterItem) => (
                                            <div
                                                key={filterItem._id}
                                                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column card-spacing"
                                            >
                                                <Card
                                                    // title={filterItem.title}
                                                    // imgSrc={filterItem.img}
                                                    foodData={filterItem}
                                                    options={filterItem.options[0]}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted text-center">
                                            No items found for this category.
                                        </p>
                                    )}
                                </div>
                            </section>
                        );
                    })
                ) : (
                    <p className="text-muted text-center">No items found.</p>
                )}
            </div>
            <Footer className='footer' />
        </>
    );
}