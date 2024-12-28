import express from 'express';
const DisplayRoute = express.Router();
DisplayRoute.post('/foodTypes', (req, res) => {
    try {
        res.send({
            foodItems: global.food_types,
            foodCategory: global.food_category
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
export default DisplayRoute;
