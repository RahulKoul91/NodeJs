//The task this class needs to perform is as below
// Provide a list of tasks /todo
// Add a task   /todo/add
// Delete a task with given ID /todo/delete/:id 
// we need to use cookies session for storing the session info and then we need to use post to add to /todo/add
var expressvar = require('express');
var session = require('cookie-session'); //Loads the piece of middleware for session
var bodyparser = require('body-parser'); // Loads the piece of middleware for settings
var urlencodedParser = bodyparser.urlencoded({extended: false});
var app = expressvar();

/* Use session*/
app.use(session({secret: 'todotopsecret'})) // this secret setting allows cookies to be secure. We can send value of cookie session, by default it's as long the browser is open


/* Route management info*/
// If there is no to-do list, it creates one with empty array before adding the new one. ( This is middleware)
app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

//This is for the to do list and form to disply on 
app.get('/todo', function(req, res) { 
    res.render('TodoList.ejs', {todolist: req.session.todolist});
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})


/* Redirects to the to do list if the page requested is not found */
app.use(function(req, res, next){
    res.redirect('/todo');
})

app.listen(8080);