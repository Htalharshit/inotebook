const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'hello';

// Route 1: Creating a user. no login required 
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({ error: 'Email already exists' });
          }
        console.error(error);
        res.status(500).json({ error: 'Some error occured' });
    }
});

// Route 2:Authenticate a user . No login required

router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Incorrect login credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Incorrect login credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Some error occured' });
    }
})

// Route 3: Get details of a user . Login required
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user =await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Some error occured' });
    }
});

module.exports = router