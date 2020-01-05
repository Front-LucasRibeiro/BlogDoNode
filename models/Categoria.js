const mongoose = require('mongoose'),
Schema = mongoose.Schema,

Categoria = new Schema({
  nome: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('categorias', Categoria)