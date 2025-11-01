const ensureAuthenticated = require('../middlewares/Auth');

const router = require('express').Router();

router.get('/',ensureAuthenticated, (req,res)=>{
    console.log('------------Useer is', req.user);
    res.status(200).json([
        {
            name:"Mobile",
            price:1000
        },
        {
            name:"tv",
            price:2000
        }
    ])
});

module.exports = router;