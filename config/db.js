const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://LucasLks:fr0nt3nd2019@cluster0-qsqrm.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

if(process.env.NODE_ENV == 'production'){
  module.exports = {mongoURI: uri}
}else{
  module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}

