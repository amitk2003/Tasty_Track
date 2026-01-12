import express from 'express';
const router = express.Router();
// postrequest is only accessible by admin
router.post('/foodTypes', (req, res) => {
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

//  this route is only accessible by user
router.get('/foodItems', (req, res) => {
    try {
        res.send({
            foodItems: global.food_types ||[],
            foodCategory: global.food_category || []
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
// router.get('/get_foodinfo',(req,res)=>{
//     const {}
// })
export default router;
