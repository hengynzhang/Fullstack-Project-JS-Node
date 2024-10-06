const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
            logger.error('Email and password are required.')
            return res.status(400).json({message: 'Email and password are required.'});
        }

        const existingUser = await collection.findOne({email: email});
        if (existingUser) {
            logger.error('Email already exists.');
            return res.status(400).json({message: 'Email already exists.'});
        }

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
        res.status(201).json({authtoken, email});
        
    } catch (err) {
        logger.error(err)
        res.status(500).send('Internal server error');
    }
})

router.post('/login', async(req, res) => {
    try {
        const db= await connectToDatabase();
        const collection = db.collection('users');
        const {email, password} = req.body;
        if (!email || !password) {
            logger.error('Email or password absent')
            return res.status(400).json({message: 'Email and password are required.'});
        }

        const user = await collection.findOne({email});
        const result = await bcryptjs.compare(password, user.password);
        if (!user || !result) {
            logger.error('Invalid credentials')
            return res.status(400).json({error: 'Invalid credentials'});
        }

        const userName = user.firstName;
        const userEmail = user.email;
        let payload = {
            user: {
                id: user._id.toString()
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User logged in successfully!')
        res.status(200).json({authtoken, userName, userEmail});
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router;