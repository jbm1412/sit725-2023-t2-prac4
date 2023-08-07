let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.lksq6p7.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Foods');
        console.log('Connected Successfully');
    } catch (ex) {
        console.error(ex);
    }
}


app.get('/', function (request, response) {
    response.render('index.html');
});


app.get('/api/foods', (request,response) => {
    getAllFoods((error, result) => {
        if (!error) {
            response.json({statusCode:200, data:result, message: 'All Foods Successful'})
        }
    });
})

app.post('/api/food', (request, response) => {
    let food = request.body;
    postFood(food, (error, result) => {
        if (!error){
            response.json({statusCode:201, data:result, message:'success'});
        }
    });
})

function postFood(food, callback) {
    collection.insertOne(food, callback);
}

function getAllFoods(callback){
    collection.find({}).toArray(callback);
}


app.listen(port, () => {
    console.log("Web server running at: http://localhost:3000");
    console.log("Type Ctrl+C to shut down the web server");
    runDBConnection();
});