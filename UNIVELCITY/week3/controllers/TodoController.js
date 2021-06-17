const fs = require('fs');
const path = require('path');

/**
 * Fetch all todos
 */
const getAllTodos = (req, res) => {
    
    // Import the json file
    var todos = fs.readFileSync(path.join(__dirname, '..', 'data', 'todos.json'));
    todos = JSON.parse(todos);

    // Send response
    res.json({
        data: {
            todos
        }
    })
}

const createTodo = (req, res) => {

    // Import the json file
    var todos = fs.readFileSync(path.join(__dirname, '..', 'data', 'todos.json'));
    todos = JSON.parse(todos);

    // Get request body
    const { title, details } = req.body;

    // Small validation
    if (title) {

        // Proceed
        var todo = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            title,
            details,
            completed: false,
        };

        // Add to the array
        todos.push(todo);
        
        // Persist
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'todos.json'), JSON.stringify(todos));
        res.send({
            data: {
                todo,
                message: "Todos fetched successfully",
            }
        });
    } else {

        // Send error message
        res.json({
            error: "Please enter the title"
        })
    }
};

const getSingleTodo = (req, res) => {

    // Import the json file
    var todos = fs.readFileSync(path.join(__dirname, '..', 'data', 'todos.json'));
    todos = JSON.parse(todos);

    // Get id
    const { id } = req.params;

    // Get todo by id
    todos.forEach((todo) => {
        if (todo.id.toString() === id) {
            res.json({
                data: {
                    todo,
                    message: "Todo fetched successfully"
                }
            })
        }
    }) 
};

const updateTodo = (req, res) => {

    // Import the json file
    var todos = fs.readFileSync(path.join(__dirname, '..', 'data', 'todos.json'));
    todos = JSON.parse(todos);

    // Get id
    const { id } = req.params;

    // Get todo by id
    todos.forEach((todo) => {
        if (todo.id.toString() === id) {
            todo.completed = !todo.completed;
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'todos.json'), JSON.stringify(todos));
            res.json({
                data: {
                    todo,
                    message: "Todo updated successfully"
                }
            })
        }
    })
};

const deleteTodo = (req, res) => {
    // Import the json file
    var todos = fs.readFileSync(path.join(__dirname, '..', 'data', 'todos.json'));
    todos = JSON.parse(todos);

    // Get id
    const { id } = req.params;

    // Get todo by id
    todos.forEach((todo, index) => {
        if (todo.id.toString() === id) {
            todos.splice(index, 1);
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'todos.json'), JSON.stringify(todos));
            res.json({
                data: {
                    todo,
                    message: "Todo deleted successfully"
                }
            })
        }
    })
};

module.exports = {
    getAllTodos,
    createTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo
};