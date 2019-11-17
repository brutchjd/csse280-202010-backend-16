const express = require("express"),
    router = express.Router(),
    mongoose = require('mongoose'),
    Car = new require("../models/car.js");


const logger = require('morgan');
router.use(logger('dev'));

const methodOverride = require("method-override");
router.use(methodOverride((req, res) => {
    if(req.body && typeof req.body === "object" && "_method" in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

function handleError(err, res, msg) {
    err.message = `$(err.message) $(msg)`;
    err.status = res.statusCode;
    res.json(err);
}

router.route('/')
    // Get ALL cars from the database
    .get((req, res) => {
        Car.find({}, (err, cars) => {
            if(err) {
                handleError(err, res, "Could not find any cars");
                return;
            } else {
                res.status(200);
                res.json(cars);
            }
        });
    })
    // POST new car to db
    .post((req, res) => {
        Car.create({
            vin: req.body.vin,
            make: req.body.make,
            model: req.body.model,
            details: {
                year: req.body.details.year,
                price: req.body.details.price,
                color: req.body.details.color,
                miles: req.body.details.miles,
                mpg: req.body.details.mpg,
            },
            images: {
                main1: req.body.images.main1,
                main2: req.body.images.main2  
            }
        }, (err, car) => {
            if(err) {
                handleError(err, res, "Error Creating Car");
                return;
            } else {
                res.status(201);
                res.json(car);
            }
        });
    });

// const containsId = function(req, res, next) {
//     const validId = mongoose.Types.ObjectId.isValid(req.params.id);
//     if(!req.params || !res.params.id || !validId) {
//         res.status(404);
//         handleError(new Error(), res, "Invalid id passed");
//     } else {
//         req.id = req.params.id;
//         next();
//     }
// };


router.route("/:id")
    .get( (req, res) => {
        Car.findById(req.params.id, (err, car) => {
            if(err) {
                res.status(400);
                handleError(err, res, "GET error, problem retrivieving car data by id");
            } else {
                res.status(200);
                res.json(car);
            }
        });
    })
    .put( (req, res) => {
        Car.findOneAndUpdate(
            {_id: req.id},
            {$set: {
                vin: req.body.vin,
                make: req.body.make,
                model: req.body.model,
                details: {
                    year: req.body.details.year,
                    price: req.body.details.price,
                    color: req.body.details.color,
                    miles: req.body.details.miles,
                    mpg: req.body.details.mpg,
                },
                images: {
                    main1: req.body.images.main1,
                    main2: req.body.images.main2  
                }
            }},
            {multi: true, new:true}
        )
            .exec((err, car) => {
                if(err) {
                    res.status(404);
                    handleError(err, res, "Problem updating car information");
                } else {
                    res.status(200);
                    res.json(car);
                }
            });
    })
    .delete( (req, res) => {
        Car.findByIdAndRemove(req.params.id)
            .exec((err) => {
                if(err) {
                    res.status(404);
                    handleError(err, res, "Problem deleting car");
                } else {
                    res.status(204);
                    res.json(null);
                }
            });
    });


module.exports = router;