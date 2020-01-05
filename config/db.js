if(process.env.NODE_ENV == 'production'){
  module.exports = {mongoURI: 'mongodb://LucasLks:fr0nt3nd2019@cluster0-qsqrm.mongodb.net/test?retryWrites=true&w=majority'}
}else{
  module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}
