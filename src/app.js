const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 8080;
app.get('/Bienvenida', (req, res) => {
    const respuesta = 'Bienvenidos a la página principal';
    res.send(respuesta);
})
app.get('/usuario', (req, res) => {
    const user = {
        nombre: 'Ruben',
        email: 'Gutierrez@hotmail.com',
    }
    res.json(user)
})
fs.readFile('productmanager.js'), (error, data) => {
    if (error) {
        console.error('Error al leer el archivo de productos:', error);
        return res.status(500).send('Error interno del servidor');
    }

    let productos = JSON.parse(data);

    if (limit) {
        productos = productos.slice(0, limit);
    }

    res.json(productos);
}

const ProductManager = require('./ProductManager.js')

app.listen(PORT, () => {
    console.log(`Servidor running on  ${PORT}`);
})
