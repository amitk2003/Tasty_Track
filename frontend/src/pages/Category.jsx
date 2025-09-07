import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FOOD_ITEMS_URL = 'http://localhost:5000/api/foodItems';

export default function Category() {
  const { category } = useParams();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(FOOD_ITEMS_URL, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        });
        const data = await response.json();
        setFoodItems(
          (data.foodItems || []).filter(
            (item) => item.categoryName && item.categoryName.toLowerCase() === category.toLowerCase()
          )
        );
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };
    if (category) loadData();
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h2 className="text-center mb-3">{category}</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {foodItems.length > 0 ? (
            foodItems.map((item) => (
              <div key={item._id} className="col">
                <Card foodData={item} options={item.options[0]} />
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No items found in this category.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}