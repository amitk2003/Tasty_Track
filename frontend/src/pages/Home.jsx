import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Use for category links if using React Router
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import './crousel.css'; // Updated carousel styles
import './Home.css'; // Updated home styles
import searchItem from './search.png';
import Carousel from '../components/Carousel';

const FOOD_ITEMS_URL = 'http://localhost:5000/api/foodItems';
const FOOD_TYPES_URL = 'http://localhost:5000/api/foodTypes';
const SEARCH_URL = 'http://localhost:5000/api/foodTypes/search';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);

  // Load categories and food items
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(FOOD_TYPES_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setFoodCat(data.foodCategory || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchFoodItems = async () => {
      try {
        const response = await fetch(FOOD_ITEMS_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setFoodItem(data.foodItems || []);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchCategories();
    fetchFoodItems();
  }, []);

  // Handle search submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    try {
      console.log('searching for search item', searchTerm);
  const response = await fetch(SEARCH_URL, {
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
      setFilteredFoodItems(data.foodVareity || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <Carousel />

        {/* Search Bar */}
        <section className="search-section py-4">
          <form onSubmit={handleSubmit} className="d-flex justify-content-center">
            <input
              className="form-control w-50 rounded-start"
              type="search"
              placeholder="Search by food or category..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary rounded-end" type="submit">
              <img src={searchItem} style={{ width: '20px' }} alt="Search" />
            </button>
          </form>
        </section>

        {/* Category Section */}
        <section className="category-section py-4">
          <h2 className="text-center mb-3">Explore Categories</h2>
          <div className="d-flex overflow-auto gap-3">
            {foodCat.length > 0 ? (
              foodCat.map((category) => (
                <Link
                  to={`/category/${category.categoryName.toLowerCase()}`}
                  key={category._id}
                  className="category-card text-decoration-none text-center p-3 bg-light rounded"
                >
                  {category.categoryName}
                </Link>
              ))
            ) : (
              <p className="text-muted text-center">No categories available.</p>
            )}
          </div>
        </section>

        {/* Featured Items or Search Results */}
        <section className="items-section py-4">
          <h2 className="text-center mb-3">{searchTerm ? 'Search Results' : 'Popular Dishes'}</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {(searchTerm ? filteredFoodItems : foodItem.slice(0, 4)).map((item) => (
              <div key={item._id} className="col">
                <Card foodData={item} options={item.options[0]} />
              </div>
            ))}
            {searchTerm && filteredFoodItems.length === 0 && (
              <p className="text-muted text-center">No items found.</p>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}