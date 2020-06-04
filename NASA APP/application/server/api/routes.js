// use the express router to create endpoints in our server
const express = require('express');
const router = express.Router();

// require in the custom node module previously built
const Custom_Nasa= require('Custom_Nasa');


let page_num=2

router.get('/show', async (req, res) => {
    page_num=page_num+2;
   

    try {
      
        const randomimg = await Custom_Nasa.fetch_pic(page_num);
        const clearList = randomimg.filter(img => img.media_type ==='image')
        res.json(clearList);
    } catch (err) {
        res.json({ err });
    }
});


router.post('/search_pic', async (req, res) => {

    const{searck_key}=req.query;   
        try {
      
        const userOption = await Custom_Nasa.search_pic(searck_key);
        let clearList = userOption.filter(img => img.media_type ==='image')

        res.json(clearList);
    } catch (err) {
        res.json({ err });
    }    
});


module.exports = router;
