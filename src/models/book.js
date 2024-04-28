const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anioPublicacion: { type: Number, required: true },
  estado: { type: String, enum: ['disponible', 'reservado'], default: 'disponible' },
}, {
  versionKey: false
});


module.exports = mongoose.model('Books', booksSchema);
