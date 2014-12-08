var mongo = require("../models/user.js")

//find specific user
exports.getUser = function(req, res) {
  var user = '';
  user = {};
  mongo.find( "userInfo", 
    user,
    function(model) {
     res.render('userview', { obj: model });
   }
   );
}

exports.loadUserEdit = function(req, res) {
  var requesteduser = {
    username: req.params.username,
    password: req.params.password,
    firstname: req.params.firstname,
    lastname: req.params.lastname
  };
  return res.render('edituser', {user: requesteduser});
}

//update an user
exports.postUser = function(req, res) {
  var user = {
    username:req.params.username, 
    password:req.params.password,
    firstname:req.params.firstname,
    lastname:req.params.lastname
  };
  console.log(user);
  mongo.update( req.params.collection, 
    user,
    function(model) {
      res.end('Successful Update');
    }
    );
}

//create a new user
exports.putUser = function(req, res) {
  console.log('Im putting a user');
  var user = {username:req.params.username,
    password:req.params.password,
    firstname:req.params.firstname,
    lastname:req.params.lastname
  };
  console.log('heres the user'+JSON.stringify(user));
  mongo.insert( req.params.collection, 
    user,
    function(model) {
      console.log("adding person");
      res.render('home');
    }
    );
}

//delete an user
exports.deleteUser = function(req, res) {
  console.log('deleting a user');
  var user = {username:req.params.username};
  console.log(user);
    mongo.delete( req.params.collection, 
     user,
     function(model) {
        res.render('home');
      }
    );
  }

