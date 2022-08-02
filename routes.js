'use strict';

const express = require('express');
const { restart } = require('nodemon');
// const Courses = require('./models/Courses');
// const User = require('./models').User;
// const Course = require('./models').Course;
const router = express.Router(); // Construct a router instance.
const {User, Course} = require('./models');

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

//route returns all properties and values for the currently authenticated user
router.get('/users', asyncHandler(async (req, res) => {
    const user = req.currentUser; // Store the user on the Request object
    res.status(200).json({ 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
     });
    res.json(user);
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
//source for attributes: https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#fetching-all-associated-elements
router.get('/courses', asyncHandler(async(req, res) =>{
    const courses = await Course.findAll({
        include: [ 
            {
              model: User,
              as: 'userId', //courses and user associated with the course
              //do not include created at and updated at for users
              through: {
                attributes: ['firstName', 'lastName', 'email']
              }
            },
          ],through: {
            attributes: ['title', 'description'] //don't include created at and updated at for courses    
          }
        });
        // Set the status to 201 Created and end the response.
        res.status(200).json({courses});
    }  
));

///api/courses/:id GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
router.get('/courses/:id', asyncHandler(async(req,res) =>{
    const courses = await Course.findByPk(req.params.id);
    res.status(200).json({courses});
  } // return one instead of all
))



///api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
router.post('/courses/:id'), asyncHandler(async(req,res) =>{
    try {
        let courses = await Course.create(req.body);
        res.redirect("/");
      } catch (error) {
        if(error.name === "SequelizeValidationError") {
           courses = await Courses.build(req.body);
        //   res.render({ Courses, error: error.errors})
        } else {
          throw error;
        }  
}})
//api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
router.put('/courses/:id'), asyncHandler(async(req,res) =>{
// add a try catch -- using a find by pk, course.update 
const course = await Course.findByPk(req.params.id); //async call
    try {
        if (course) {
            if(req.currentUser.id === course.userId) {
                await course.update(req.body);
                res.redirect("/");
                res.status(204).json({message: "Course has been updated"}).end();
            } else {
                res.sendStatus(404);
            }
        } else {
        res.sendStatus(404);
        }
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            // const course = await Course.build(req.body);
            course.id = req.body.id; // make sure correct course gets updated  
            res.status(400);
        } else{
            throw error;
        }
}})

//api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
router.delete('/courses/:id'), asyncHandler(async(req,res) =>{ // use from project 
    const course = await Course.findByPk(req.params.id);
    if (course) {
      if (req.currentUser.id === course.userId){
        await course.destroy();
        res.redirect("/");
        res.status(204).json({message: "Course has been deleted"}).end();
      } else {
        res.status(400).json({message: "Course can't be deleted"})
      }
    } else {
      res.sendStatus(404);
    }})

 module.exports = router;
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
//   if (errors.length > 0) {
//     // Return the validation errors to the client.
//     res.status(400).json({ errors });
//   } else {
//     // Add the user to the `users` array.
//     users.push(user);

//     // Set the status to 201 Created and end the response.
//     res.status(201).end();
//   };

