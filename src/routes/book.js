const express = require('express');
const router = express.Router();
const booksSchema = require('../models/book');
const { default: mongoose, Types } = require('mongoose');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

/**
 * @openapi
 * /api/token:
 *   get:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */


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

/**
 * @openapi
 * /api/book:
 *   get:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

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


/**
 * @openapi
 * /api/book:
 *   post:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

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

/**
 * @openapi
 * /api/book/:id:
 *   get:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

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

/**
 * @openapi
 * /api/book/:id:
 *   patch:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

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

/**
 * @openapi
 * /api/book/:id:
 *   delete:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */


router.delete('/book/:id', async (req, res) => {
  try {
    const { bookId } = req.params;

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    if (!decoded.roles.includes('admin') || Date.now() > decoded.exp) {
      return res.status(401).send({ error: "token no autorizado o expirado" });
    }

    const deletedBook = await booksSchema.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).send({ message: "libro no encontrado" });
    }

    res.status(200).json({ message: "libro borrado satisfactoriamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;