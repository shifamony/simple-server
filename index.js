const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

app.get('/', (req,res) => {
   res.send('simple server running');
});

const users = [
    {name: 'Fatema', id: 1, email: 'fate@gmail.com'},
    {name: 'Shifa', id: 2, email: 'sifa@gmail.com'},
    {name: 'Safa', id: 3, email: 'safa@gmail.com'},
    {name: 'Nazrul', id: 4, email: 'nazr@gmail.com'}
];

app.get('/users', (req,res) => {
   res.send(users);
})

app.listen(port, () => {
    console.log(`simple server running on port ${port}`)
})