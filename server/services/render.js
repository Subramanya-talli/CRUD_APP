const axios = require("axios");
const { param } = require("../routes/router");


exports.homeRoutes = (req,res)=> {
    //Make get req for /api/users
    axios.get('http://localhost:3000/api/users')
      .then(function(response){
        res.render('index', {users : response.data});
      })
      .catch(err => {
        res.send(err)
      })
    
}

exports.userRoute = (req,res)=>{
    res.render('add_user');
}

exports.updateUserRoute = (req,res)=>{
  axios.get('http://localhost:3000/api/users',{ params: {id: req.query.id}})
  .then(function(userdata)
{
  res.render("update_user", {user:userdata.data})
})
.catch(error =>{
  res.send(error);
})
}