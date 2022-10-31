const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//MEDIA QUERY
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
  res.send('simple node server');
})



const uri = "mongodb+srv://dbuser1:GozH2WykEy0jDrew@cluster0.jj8cffr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
      const userCollection = client.db('nodeMongoCrud').collection('users');
      //this function use for test purpose
      // const user = {
      //   name:'fatema', email: 'fatema@gmail.com'
      // }
      // const result = await userCollection.insertOne(user);
      // console.log(result);

      //this function read users. mane ja user add korechi ta show korbe ui te
      app.get('/users', async(req, res) => {
          const query = {};
          const cursor = userCollection.find(query);
          const users = await cursor.toArray();
          res.send(users);
      })

      //UPDATE FUNCTION
      app.get('/users/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const user = await userCollection.findOne(query);
        res.send(user);
      })


    //this function take us to server 
      app.post('/users', async(req, res) => {
        const user = req.body;
        console.log(user);
//this function take us to server end

//this function take us to database 
     const result = await userCollection.insertOne(user);
     res.send(result);
    });
//this function take us to database 

//UPDATE FUNCTION
//this function take us to server
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const filter = {_id: ObjectId(id)};
    const user = req.body;
    console.log(user);
    //this function take us to server
//this function take us to database
  const option = {upsert: true};
  const updatedUser = {
    $set: {
      name: user.name,
      address: user.address,
      email: user.email
    }
  }
   const result = await userCollection.updateOne(filter, updatedUser, option);
    res.send(result);
    //this function take us to database

})


//DELETE FUNCTION
     app.delete('/users/:id', async(req, res) => {
        const id = req.params.id;
        //jodi ame sobgulo delete korte chai tahole evabe likhte hobe
        //const query = {};
 //kintu bises kono kichu delete korte chaole evabe code lihthe hobe
      //console.log('trying to delete', id);
      const query = {_id: ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      console.log(result);
      res.send(result);
     });

     
      
  }
  finally{

  }
}
run().catch(err => console.log(err));







app.listen(port, () => {
  console.log(`Port is running on port ${port}`);
})












































// const express = require('express');
// const app = express();
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const port = process.env.PORT || 5000;


// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('simple node server running');
// })


// const users = [
//     {name: 'Fatema', id: 1, email: 'fate@gmail.com'},
//     {name: 'Shifa', id: 2, email: 'sifa@gmail.com'},
//     {name: 'Safa', id: 3, email: 'safa@gmail.com'},
//     {name: 'Nazrul', id: 4, email: 'nazr@gmail.com'}
// ];


// //password: GozH2WykEy0jDrew
// //userName: dbuser1

// const uri = "mongodb+srv://dbuser1:GozH2WykEy0jDrew@cluster0.jj8cffr.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run(){
//   try{
//      const userCollection = client.db('simpleNode').collection('users');

//         app.get('/users', async (req, res) => {
//             const cursor = userCollection.find({});
//             const users = await cursor.toArray()
//             res.send(users);
//         })
//         //========================


//     app.post('/users', async (req, res) => {
//         console.log('Post API called');
//         //console.log( req.body);
//         const user = req.body;
//         //user.id = users.length + 1;
//     //    users.push(user);
//     //    console.log( user);
//     const result = await userCollection.insertOne(user);
//     console.log(result);
//        user.id = result.insertedId;
//        res.send(user);
//     });
//   }
//   finally{

//   }
// }

// run().catch((e) => console.log(e));

// app.listen(port, () => {
//     console.log(`simple server running on port ${port}`)
// })


