import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const todos = [
    {id: 1,task: 'Buy milk', completed: true}, 
    {id: 2, task: 'Write code', completed: false},
    {id: 3, task: 'Read Book', completed: true},
    {id: 4, task: 'Go for a walk', completed: false},
    {id: 5, task: 'Buy groceries', completed: false}
];

app.get('/', (req, res) => {
  // console.log(todos);
  res.render('index', { title: 'Todo List', todos })
})

app.post('/add-todo', (req, res) => {
    // Add a new todo item (ignore empty submissions)
    // console.log(req.body);
    const newTodo = (req.body['new-todo'] || '').toString().trim();
    if (newTodo) {
        todos.push({id: todos[todos.length - 1].id + 1, task: newTodo, completed: false});
    }
    res.redirect('/');
})

app.post('/completed-todo', (req, res) => {
    // console.log(req.body);
    const id = parseInt(req.body.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
    }
    res.redirect('/');
})

app.post('/delete-todo', (req, res) => {
    // Delete a todo item
    const id = parseInt(req.body.id); 
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    res.redirect('/');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})