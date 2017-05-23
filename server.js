var mysql = require('mysql');
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var con = mysql.createConnection({ // to establish connection with db

    host: "localhost",
    user: "root",
    password: "neha2310",
    database: "bluelagoon"
});

con.connect(function(err) {
    if (!err) {
        console.log('connected');
        console.log('Live at port 6060');
    } else
        console.log('not connected');
});

app.use(bodyParser.json());
app.use(express.static('public')); // static files

app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //nehu this s for jade

//UI
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/sea', function(req, res) {
    res.render('sea');

});

app.get('/mv', function(req, res) {
    res.render('mv');

});

app.get('/team', function(req, res) {
    res.render('team');

});

app.get('/chef', function(req, res) {
    res.render('chef');

});

app.get('/menu', function(req, res) {
    res.render('menu');

});

app.get('/food', function(req, res) {
    res.render('food');

});

app.get('/fbform', function(req, res) {
    res.render('fbform');

});

app.get('/maps', function(req, res) {
    res.render('maps');

});

app.get('/dir', function(req, res) {
    res.render('dir');

});

app.get('/login', function(req, res) {
    res.render('login');

});

app.post('/staff', urlencodedParser, function(req, res) {
    var username = "zohra";
    var passwd = "123";
    var psw = [req.body.psw];
    var uname = [req.body.uname];

    if ((psw == passwd) && (uname == username)) {
        res.render('staff');
    } else {
        res.sendFile(__dirname + "/" + "p.htm");
        console.log("wrong password");
    }

});


//to insert into customer table , place order
app.get('/order', function(req, res) {

    var value = {
        c_id: req.query.c_id,
        first_name: req.query.firstname,
        last_name: req.query.lastname,
        Delivery_address: req.query.Address,
        contact_no: req.query.contact_no,
        Order_date: req.query.date,
        Items: req.query.items,
        Quantity: req.query.quan
    };

    con.query("insert into customer set ?", value, function(err, result) {
        if (!err)
            console.log('inserted');
        else
            console.log('error');
    });

    res.sendFile(__dirname + "/" + "or.htm");
    console.log('Order placed');
});


//to insert into survey table , feedback form
app.get('/feed', function(req, res) {

    var value = {
        c_name: req.query.name,
        contact_no: req.query.contact,
        Survey_date: req.query.date,
        Emp_performance: req.query.emp,
        food_quality: req.query.quality,
        customer_satisfaction: req.query.satisfac,
        overall_rating: req.query.overall

    };


    con.query("insert into survey set ?", value, function(err, result) {
        if (!err)
            console.log('inserted');
        else
            console.log('error');
    });

    res.sendFile(__dirname + "/" + "fb.htm");
    console.log('feedback submitted');
});


// to add staff details
app.get('/xyz', function(req, res) {
    var value = {
        s_id: req.query.s_id,
        name: req.query.name,
        contact_no: req.query.contact_no,
        dob: req.query.date,
        gender: req.query.gender,
        address: req.query.Address,
        post: req.query.post,
        salary: req.query.salary
    };

    con.query("insert into staff set ?", value, function(err, result) {
        if (!err)
            console.log('inserted');
        else
            console.log('error');
    });

    res.sendFile(__dirname + "/" + "s.htm");
    console.log("inserted");
});


//on click staff button
app.get('/stf', function(req, res) {

    con.query("select * from staff", function(err, rows, fields) {

        if (!err) {
            console.log(rows);
            res.render('stf', { title: 'Staff status', userresults: rows });
        } else
            console.log('error');

    });
});

//on click add details
app.get('/st', function(req, res) {
    res.render('st');
    console.log('fill form');
});


//to delete staff details
app.get('/delete', function(req, res) {

    con.query("delete from staff where s_id=?", [req.query.id], function(req, res) {
        if (!err)
            console.log('deleted');
        else
            console('error');
    });

    res.sendFile(__dirname + "/" + "d.htm");
    console.log("Deleted");

});



//to display order details
app.get('/od', function(req, res) {

    con.query("select * from customer", function(err, rows, fields) {
        if (!err) {
            console.log(rows);
            res.render('od', { title: 'order', userresults: rows });

        } else
            console.log('error');
    });
});


// to display feedback details
app.get('/fb', function(req, res) {
    con.query("select * from survey", function(err, rows, fields) {
        if (!err) {
            console.log(rows);
            res.render('fb', { title: 'Feedback', userresults: rows });
        } else
            console.log('error');

    });
});


// @ this port
app.listen(6060);