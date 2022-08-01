'use strict';

const express = require('express');
const Courses = require('./models/Courses');
const User = require('./models').User;
const Course = require('./models').Course;
const router = express.Router(); // Construct a router instance.

// Handler function to wrap each route.
function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        // Forward error to the global error handler
        next(error);
      }
    }
  }

//return all properties and values for the currently authenticated 
router.get('/users', asyncHandler(async (req, res) => {
    const users = await User.findAll({
        // res.json({
        //     firstName: users.firstName,
        //     lastName: users.lastName,
        //     email: users.email,
        //     password: users.password
        include: [
          {
            model: users,
            as: 'director',
          },
        ],
      });
    res.status(200).json({ "message": "Account successfully created!" });
    res.json(users);
  }));



  // Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.redirect("/");
      res.status(201).json({ "message": "Account successfully created!" });
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

//app/courses/GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
//source: https://teamtreehouse.com/library/data-relationships-with-sql-and-sequelize-2/retrieve-related-data-in-sequelize-queries/retrieve-data-with-findall
router.get('/courses', asyncHandler(async(req, res) =>{
    const courses = await Course.findAll({
        include: [
            {
              model: User,
              as: user,
            },
          ],     
        });
        // Set the status to 201 Created and end the response.
        res.status(200).end();
    }  
));

///api/courses/:id GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
router.get('/courses/:id', asyncHandler(async(req,res) =>{
    const courses = await Course.findByPk(req.params.id);
    res.status(200).json();
  }
))



///api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
router.post('/courses/:id'), asyncHandler(async(req,res) =>{
    try {
        let course = await Course.create(req.body);
        res.redirect("/");
      } catch (error) {
        if(error.name === "SequelizeValidationError") {
          book = await Courses.build(req.body);
          res.render({ Courses, error: error.errors})
        } else {
          throw error;
        }  
}})
//api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
router.put('/courses/:id'), asyncHandler(async(req,res) =>{

})
//api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
router.delete('/courses/:id'), asyncHandler(async(req,res) =>{
    try{
        const courses = await records.getCourse(req.params.id)
        await records.deleteCourse(courses);
        res.json(204).end();
    } catch (err){
        res.status(400).json({message: err.message})
    }
})
//not sure if i need this for project

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