import express from 'express';
const app = express();
app.use(express.json());

let users = [
    { id: 1, name: "Pushpendra", email: "pushpendra@example.com" },
    { id: 2, name: "Vansh", email: "vansh@example.com" }
];

// GET: fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST: create a new user
app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(user);
    res.json(user);
});

// PUT: update a user by id
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).send('User not found');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.json(user);
});

// DELETE: delete a user by id
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId);
    res.send('User deleted successfully');
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});