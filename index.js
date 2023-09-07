const express = require('express');
const app = express();
const port = 5000;

//midleware
var cors = require('cors');
app.use(cors());
app.use(express.json());//req.body undifined solved



//const users = require('./product.json')




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shadiptomojumder:Shadipto58k@cluster0.fmco2ha.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const userCollection = client.db('All').collection('users');
        // const user = { name: 'shadipto', email: 'shadipto@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        // user get
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            //console.log(users);
            res.send(users)
        })

        // user post
        app.post('/users', async (req, res) => {
            //console.log(req.body);
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.send(result)

        })

    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World! kolim rohim')
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const searchUser = users.find(user => user.id == id)
    res.send(searchUser)
})
app.get('/users', (req, res) => {
    console.log(req.query);
    if (req.query.name) {
        const name = req.query.name
        const search = users.filter(username => username.name.toLocaleLowerCase().indexOf(name) >= 0)
        res.send(search)
    } else {
        res.send(users)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})