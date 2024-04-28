const express = require('express');
const router = express.Router();
const booksSchema = require('../models/book');
const { default: mongoose, Types } = require('mongoose');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// get a token
router.post('/token', (req, res) => {
  //variables temporales para validar un token y hagan match y asi hacer que este devuelva el nuevo token solicitado
  const { id: sub, name } = { id: "diegom", name: "DiegoMartinez" };

  const token = jwt.sign({
    sub,
    name,
    exp: Date.now() + 60 * 1000
  }, secret)
  res.send({ token })
})

router.get('/book', (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if (Date.now() > payload.exp) {
      return res.status(401).send({ error: "token expiro" })
    }
    booksSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
});


router.post('/book', (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if (Date.now() > payload.exp) {
      return res.status(401).send({ error: "token expiro" })
    }
    const book = booksSchema(req.body);
    book
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {

  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if (Date.now() > payload.exp) {
      return res.status(401).send({ error: "token expiro" })
    }
    const id = req.params.id;
    const resultado = await booksSchema.findById(id);
    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error interno del servidor');
  }
});


router.patch('/book/:id', async (req, res) => {
  try {

    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if (Date.now() > payload.exp) {
      return res.status(401).send({ error: "token expiro" })
    }

    const booksSchema = await book.findOne({ id: req.params.id });

    if (!booksSchema) {
      res.status(404).json({ message: 'No se encontraron libros para este id, se ha creado uno nuevo' });
    }
    const newBook = req.body;
    cases.Array.push(newBook);
    await booksSchema.save();
    res.status(201).json('Creado con exito');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

module.exports = router;