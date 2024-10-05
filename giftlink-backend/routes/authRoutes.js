const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
require('dotenv').config();
const pino = require('pino');
const logger = pino();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({message: 'Email and password are required.'});
        }

        const existingUser = await collection.findOne({email: email});
        if (!existingUser) {
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(password, salt);
            const newUser = await collection.insertOne({
                email, 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                createdAt: new Date()
            });

            const payload = {
                user: {
                    id: newUser.insertedId
                }
            }
            const authtoken = jwt.sign(payload, JWT_SECRET);
            logger.info('User registered successfully!');
            res.json({authtoken, email});
        } else {
            res.status(400).json({message: 'Email already exists.'})
        } 
    } catch (error) {
            res.status(500).send('Internal server error');
    }
})

module.exports = router;