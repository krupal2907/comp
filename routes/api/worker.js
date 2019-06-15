const router = require("express").Router();
const Worker = require("../../models/Worker");
const {
    check,
    validationResult
} = require("express-validator/check");

// @route worker/
// @desc This is to get all the workers in company
// @access PRIVATE
router.get("/", async (req, res) => {
    try {
        const Workers = await Worker.find().select('name');
        res.json(Workers);
    } catch (error) {
        handleError(error, res);
    }
});

// @route worker/new-worker
// @desc To Add a new worker in a company
// @access PRIVATE
router.post(
    "/new-worker",
    [
        check("name", "Name is required!")
        .not()
        .isEmpty(),
        check("email", "Name is required!")
        .isEmail(),
        check('number')
        .isNumeric()
        .not()
        .isEmpty(),
        check('dailyfullwage')
        .isNumeric()
        .not()
        .isEmpty(),

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const newWorker = new Worker(req.body);

        try {
            const newAddedWorker = await newWorker.save();
            res.json(newAddedWorker);
        } catch (error) {
            handleError(error, res);
        }
    }
);

// @route worker/borrowed/id
// @desc To add woker borrowed money
// @access PRIVATE
router.put('/borrowed/:id', [
    check('ammount', 'Ammount is required!')
    .isNumeric()
    .not()
    .isEmpty()
], async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const workerBorrowedObject = await Worker.findById(id).select('Borrowed');

        // @desc Init the inital borrowed amount as req.body.ammount
        // @res Total borrowed money by worker
        let borrowedMoney = req.body.ammount;
        workerBorrowedObject.Borrowed.forEach(element => {
            borrowedMoney = element.ammount + borrowedMoney;
        });


        // @desc Pushes the changes
        workerBorrowedObject.Borrowed.unshift(req.body);
        await workerBorrowedObject.save();

        // @desc sends responce as object contains follows
        res.json({
            workerBorrowedObject,
            totalBorrowed: borrowedMoney
        });

    } catch (error) {
        handleError(error, res);
    }
});

//Handling Server unknown errors and known errors
function handleError(error, res) {
    if (error.type = 'ObjectId') {
        return res.status(400).json({
            msg: 'Invalid tokem'
        });
    }
    if (error.code === 11000) {
        return res.status(400).json({
            msg: 'Email ,Already Taken!'
        });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
}

module.exports = router;