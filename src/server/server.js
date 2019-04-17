const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const todos = [
  { id: 1, text: 'Hello, world!' },
  { id: 2, text: 'Pick up groceries', status: 'complete' }
];

// Index
app.get('/', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });
});

//Get All
app.get('/todos', (req, res) => {
  // res.json(JSON.stringify(todos));
  res.status(200).json(todos);
});


//Get one
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id,10);
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });
  // res.json(JSON.stringify(todos[index]));
  res.status(200).json(todos[index]);
});

//Create
app.post('/todos', (req, res) => {
  const text = req.body.data.text;
  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  }

  const len = todos.length;
  const id = !len ? 1 : todos[len -1].id + 1;
  const newTodo = { id, text, status: 'active' };

  todos.push(newTodo);
  res.status(201).json(todos);
});

//Delete
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id,10);
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });
  todos.splice(index,1)
  res.status(200).json(todos);
});

  //update
 app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id,10);
  const newText = req.body.text;
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });
  todos[index].text = newText;
  res.status(200).json(todos[index]);
});


// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
