'use strict';

const express = require('express');
const User = require('./models').User;
const Course = require('./models').Course;
const router = express.Router(); // Construct a router instance.

//return all properties and values for the currently authenticated 
Userrouter.get('/users', asyncHandler(async (req, res) => {
    let users = await User.findAll();
    res.status(201).json({ "message": "Account successfully created!" });
    res.json(users);
  }));

  // Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
    //   res.status(201).json({ "message": "Account successfully created!" });
    } catch (error) {
      console.log('ERROR: ', error.name);
  
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  }));
  
//not sure if i need this for step 6 

//   // Store errors
//   const errors = [];

//   // Validate that we have a `name` value.
//   if (!user.name) {
//     errors.push('Please provide a value for "name"');
//   }

//   // Validate that we have an `email` value.
//   if (!user.email) {
//     errors.push('Please provide a value for "email"');
//   } 

//   // Validate that we have a `password` value.
//   let password = user.password;
//   if (!password) {
//     errors.push('Please provide a value for "password"');
//   } else if (password.length < 8 || password.length > 20) {
//     errors.push('Your password should be between 8 and 20 characters');
//   } else {
//     user.password = bcrypt.hashSync(password, 10);
//   }

  // If there are any errors...
  if (errors.length > 0) {
    // Return the validation errors to the client.
    res.status(400).json({ errors });
  } else {
    // Add the user to the `users` array.
    users.push(user);

    // Set the status to 201 Created and end the response.
    res.status(201).end();
  };

module.exports = router;