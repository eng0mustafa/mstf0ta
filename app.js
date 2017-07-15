let express = require('express')
let app = express()
let bodyParser = require('body-parser')
mongoose = require('mongoose')

//connect to db
let dbhost = "mongodb://eng:eng@ds157112.mlab.com:57112/practice_api"
mongoose.connect(dbhost, {
    useMongoClient: true
})

//create schema
let userSchema = mongoose.Schema({
	name: String,
	username: String,
	password: String
})

// schema model
let Users = mongoose.model('users', userSchema)

//body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// show all books
app.get('/api/userlist', (req, res)=>{
    Users.find({}, (err, result)=>{
        if(err) throw err;
        res.status(200).json(result)   
    })
})

//user registeration
app.post('/api/reg', (req, res) => {
	let user = new Users({
        name: req.body.name,
	username: req.body.username,
	password: req.body.password
    })
 
    user.save((err, result)=>{
        if (err) throw err;
        res.status(200).json(result)   
    })
})


// user login
app.post('/api/login', (req, res)=>{

	var username = req.body.username
	var password = req.body.password

    Users.findOne({username: username}, (err, result)=>{

        if (err) 
        	{throw err;}

        if (!result)
        	{res.status(200).json('User not found !')}


	      else{

	        	Users.findOne({username: username , password: password}, (err, result)=>{

			        if (err) 
			        	{throw err;}

			        if (!result)
			        	{res.status(200).json('password Error !')}
						
					res.status(200).json(`user is found and info is : ${result} `)
					})
	          }	
        
    	})
})



let listner = app.listen(process.env.PORT || 3000, function () {
    console.log(`your app is running on port ${listner.address().port}`)
})