const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//morgan is used to see logs 
const logger = require('morgan')
//const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // req.body
app.use(logger('dev'))

//routes

// create a todo
app.post("/crud",async(req,res) => {
    try {
        // const {rname} = req.body.rname;
        // const{remail} = req.body.rname;
        // const{rcontact} = req.body.rcontact;
        // const{raddress} = req.body.raddress;
        const { first,last,email,phone,location,hobby } = req.body
        const newTodo = await pool.query("insert into testtable1 (first,last,email,phone,location,hobby) values($1 ,$2,$3,$4,$5,$6) returning *",
        [first,last,email,phone,location,hobby]
        );

        //send response with the status and a message in json format so the the frontend receices a proper response
        res.status(200).json({msg:"success",result:newTodo.rows[0]});

    } catch (err) {
        console.error(err.message);
        //similar for error messages
        res.status(500).json({msg:"Error",result:err})
    }
});



//get all todo

app.get("/crud" , async(req,res) => {
    try {
        const allTodos = await pool.query
        ("select * from testtable1");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo

app.get("/crud/:id" , async(req,res) => {
try {
    
    const {id} = req.params;
    const testtable1 = await pool.query("select * from testtable1 where id =$1" ,
    [id])
   
    console.log(req.params);
    res.json(todo.rows[0]);
} catch (err) {
    console.error(err.message);
}


});

//update a todo

app.put("/crud/:id" , async(req,res) => {
    try {
        const{ id } = req.params;
        const { first,last,email,phone,location,hobby } = req.body
        const updateTodo = await pool.query("update testtable1 set first= $1 ,last= $2,email=$3,phone=$4,location=$5,hobby=$6 where id=$7",
        [first,last,email,phone,location,hobby,id]
        );
        res.json("Table was updated");
    
    } catch (err) {
        console.error(err.message);
    }
    
    
    });

//delete a todo

app.delete("/crud/:id" , async(req,res) => {
try {
    const {id} = req.params;
    const deleteTodo = await pool.query("delete from testtable1 where id =$1",
    [id]
    );
    res.json("Deleted");
} catch (err) {
    console.error(err.message);
}


});





app.listen(3000 , () => {
    console.log("server has started on port 3000");
});
