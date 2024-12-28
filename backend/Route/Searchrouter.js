import express from 'express';
const Searchrouter = express.Router();

// Search endpoint using global variables
Searchrouter.post('/search', async (req, res) => {
    try {
        const { SearchTerm } = req.body;
        console.log('Received search term:', SearchTerm);

        if (!SearchTerm || SearchTerm.trim() === '') {
            return res.status(400).json({ message: 'Search term is required' });
        }

        // Get food items from global variable
        const foodItems = global.food_types || [];
        
        // Case-insensitive search across multiple fields
        const searchResults = foodItems.filter(item => {
            const searchRegex = new RegExp(SearchTerm, 'i');
            return (
                searchRegex.test(item.title) ||
                searchRegex.test(item.categoryName) ||
                searchRegex.test(item.description)
            );
        });

        console.log('Search results:', searchResults);
        res.json({ foodVareity: searchResults });

    } catch (error) {
        console.error('Error searching food items:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Route to get all food items
Searchrouter.get('/all', (req, res) => {
    try {
        const foodItems = global.food_types || [];
        const foodCategory = global.food_category || [];
        
        res.json({
            foodItems: foodItems,
            foodCategory: foodCategory
        });
    } catch (error) {
        console.error('Error fetching all items:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Route to get initial data for the home page
Searchrouter.post('/', (req, res) => {
    try {
        res.json({
            foodItems: global.food_types || [],
            foodCategory: global.food_category || []
        });
    } catch (error) {
        console.error('Error fetching food types:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

export default Searchrouter;