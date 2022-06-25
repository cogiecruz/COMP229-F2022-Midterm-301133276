// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
  list.find( (err, list) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
    }
  });

});

//  GET the Movies Details page in order to add a new Movies
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     res.render("movies/details", {
      title: "Movie list",
      movies: "",

});

// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     let newMovie = list(
      {
          "title": req.body.title,
          "description": req.body.description,
          "released": req.body.released,
          "director": req.body.director,
          "genre": req.body.genre
      });
  
      list.create(newMovie, (err, list) =>
      {
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
              
              res.redirect('/Movies');
          }
      });   
  });
// GET the Movies Details page in order to edit an existing Movies
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id

movies.findById(id, (err, editMovie) =>
  {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
        res.render('movie/details', {title: 'Edit Movie', list: editMovie})
    }
  })
  
});



// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id

  let updateMovie = list({
    "_id": id,
    "title": req.body.title,
    "description": req.body.description,
    "released": req.body.released,
    "director": req.body.director,
    "genre": req.body.genre
  });

  movie.updateOne({_id: id}, updateMovie, (err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/Movies');
    }
  });

});



// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  
  let id = req.params.id;

    list.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
          res.redirect('/Movies');
        };
    });
});
})
module.exports = router;