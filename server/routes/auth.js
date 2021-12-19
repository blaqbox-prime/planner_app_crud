const router = require('express').Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Validation -------------------------------------------------
const Joi = require('joi');
const signInSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
})

const signUpSchema = Joi.object({
    id: Joi.string().max(36).min(36).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    accountType: Joi.string().required(),
})

// Routes ----------------------------------------------------
router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    // console.log(req.body);

    const validation = signInSchema.validate(req.body);
    // check for validation errors
    if(validation.error){return res.status(400).json({"error": "true","message" : validation.error.details[0].message})}


    // check if email exists
    db.query('SELECT * FROM users where email = ?', email, async (err, result) => {
        if(err) {console.log(err)}
        if(result.length === 0) //a record is found  
        {
          return  res.json({"error": "true","message" : "email or password is incorrect"})
        } else{
            const user = result[0];
            
            // Validate password
            const validPass = await bcrypt.compare(password,user.password);
            if(!validPass) return res.status(400).json({"error": "true","message" : "email or password is incorrect"});
           
            // create + assign web token
            // const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
            // res.header('auth-token',token).send(token);
            console.log(user);
            res.json({user});
        }
    })
})

router.post('/signup', async (req, res) => {
    const {firstName, email,lastName, accountType, id, password} = req.body;
    const validation = signUpSchema.validate(req.body);
    if(validation.error){return res.status(400).json({"error": "true","message" : validation.error.details[0].message})}

    // check if email exists
    db.query('SELECT * FROM users where email = ?', email, async (err, result) => {
        if(err) {console.log(err)}
        if(result.length > 0) //a record is found  
        {
          return  res.json({"error" : "true","message" : "email already exists"})
        } else{

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            db.query('INSERT INTO users (id, first_name, last_name, account_type, password, email) VALUES (?, ?, ?, ?, ?, ?)',[id,firstName,lastName, accountType, hashPassword, email], (err, result) => {
                if(err) return res.send({"error": "true","message" : "failed to create user", "error": err});
                console.log(result);
                res.send(result);
            });
        }
    })

})

module.exports = router;