const { name } = require('ejs');
const UserDB = require('../model/model.js');

//create and save new user
const createUser = (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    //new user
    const user = new UserDB({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in DB
    user 
      .save(user)
      .then(data => {
        // res.send(data)
        res.redirect('/add-user')

      })
      .catch(error =>{
        res.status(500).send({
            message: error.message || "Some error occured while creating a create operation"
        });
      });
}

const getUsers = (req,res) => {
  if (req.query.id) {
    const id = req.query.id
    UserDB.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({message : "Not Found user with id" + id})
        }
        else
        {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({message : err.message})
      })
  }
  else
  {
    UserDB.find()
    .then(user => {
      res.send(user)
    })
    .catch(err =>{
      res.status(500).send({message: err.message || "Error occured while retetriving the user information"})
    })
  } 
}


const updateUser = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update cannot be empty" });
  }

  const Id = req.params.id;
  UserDB.findByIdAndUpdate(Id, req.body, { useFindAndModify: false, new: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: `Cannot update user with ID ${Id}. Maybe user not found.` });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating user information" });
    });
};


const deleteUser = (req,res) => {
  const id = req.params.id;

  UserDB.findByIdAndDelete(id)
  .then(data => {
    if (!data) {
      res.status(404).send({message : `Cannot Delete with id ${id} may be id is wrong `})
    }
    else
    {
      res.send(
        {
          message : "User was deleted Successfully"
        })
    }
  })
  .catch(
    err => {
      res.status(500).send({
        message: err.message
      });
    });

}


module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}