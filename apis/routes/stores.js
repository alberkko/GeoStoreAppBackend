const express = require('express');
const router = express.Router();

const Store = require('../models/store');
const mongoose = require('mongoose');

//url routes to all stores


//get request to ip/stores
router.get('/', (req, res, next) => {
    Store.find().exec().then(
        docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
});


//post request
//add a store with address, latitude and longitude to ip/stores
router.post('/', (req, res, next) => {

    const store = new Store({
        _id: new mongoose.Types.ObjectId(),
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    store.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /stores',
            createdStore: result
        });
    })
});


//get specific stores by ID
router.get('/:storeID', (req, res, next) => {
    const id = req.params.storeID;
    Store.findById(id).exec().then(
        doc => {
            console.log("From db", doc);
            res.status(200).json(doc)
        }
    )

});

/*  edit and delete not requested

router.patch('/:storeID', (req, res, next) => {
    const id = req.params.storeID;
    Store.update(_id: id )
});
*/
/*
//delete a store by id
router.delete('/:storeID', (req, res, next) => {
    const id = req.params.storeID;
    Store.remove({ _id: id }).exec().then(
        result => {
            res.status(200).json(result);
        })
});
*/

module.exports = router;