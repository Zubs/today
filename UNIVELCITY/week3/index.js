const express = require('express');
const bodyParser = require('body-parser');

app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const { getAllTodos, createTodo, getSingleTodo, updateTodo, deleteTodo } = require('./controllers/TodoController')

// Routes
/*
    See all todos
    See single todo
    Create new todo
    Edit a todo
    Delete a todo
*/
app.get('/', getAllTodos);

app.post('/', createTodo);

app.get('/:id', getSingleTodo);

app.post('/:id', updateTodo);

app.delete('/:id', deleteTodo);


app.listen(3000);
