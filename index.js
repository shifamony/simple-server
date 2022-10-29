const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('simple node server running');
})


const users = [
    {name: 'Fatema', id: 1, email: 'fate@gmail.com'},
    {name: 'Shifa', id: 2, email: 'sifa@gmail.com'},
    {name: 'Safa', id: 3, email: 'safa@gmail.com'},
    {name: 'Nazrul', id: 4, email: 'nazr@gmail.com'}
];


//password: GozH2WykEy0jDrew
//userName: dbuser1

const uri = "mongodb+srv://dbuser1:GozH2WykEy0jDrew@cluster0.jj8cffr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
     const userCollection = client.db('simpleNode').collection('users');
     //const user = {name: 'Salman Sha',email:'salman@gmail.com'}
    //  const result = await userCollection.insertOne(user);
    //  console.log(result);
        //============================
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray()
            res.send(users);
        })
        //========================


    app.post('/users', async (req, res) => {
        console.log('Post API called');
        //console.log( req.body);
        const user = req.body;
        //user.id = users.length + 1;
    //    users.push(user);
    //    console.log( user);
    const result = await userCollection.insertOne(user);
    console.log(result);
       user.id = result.insertedId;
       res.send(user);
    });
  }
  finally{

  }
}

run().catch((e) => console.log(e));


// app.get('/users', (req, res) => {
//     if(req.query.name){
//     //filter users by query
//     const search = req.query.name;
//     const filtered = users.filter(usr => usr.name.toLocaleLowerCase().indexOf(search) >= 0)
//     res.send(filtered)
//     }else{
//         res.send(users);
//     }
  
// });


// app.post('/users', (req, res) => {
//     console.log('Post API called');
//     //console.log( req.body);
//     const user = req.body;
//     user.id = users.length + 1;
//    users.push(user);
//    console.log( user);
//    res.send(user);
// });


app.listen(port, () => {
    console.log(`simple server running on port ${port}`)
})


