const ProductManager = require('./product-manager.js')
const express = require('express')
const manager = new ProductManager('./src/productos.json')


const PORT = 8080
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    try {
        const arrayProducts = await manager.readFilesMio()
        let limit = parseInt(req.query.limit)
        if (limit) {
            const arraylimit = arrayProducts.slice(0, limit)
            return res.send(arraylimit)
        } else {
            return res.send(arrayProducts)
        }
    } catch (error) {
        console.log(error)
        return res.send('Error al procesar el pedido')
    }
})
{
    app.get('/products/:pid', async (req, res) => {
        try {
            let pid = parseInt(req.params.pid)
            const sought = await manager.getProductById(pid)
            if (pid) {
                return res.send(sought)
            } else {
                console.log('Producto no encontrado')
            }
        } catch (error) {
            console.log(error)
            return res.send('Error al procesar el pedido de buscar x ID')
        }
    })
}
app.get('/Bienvenida', (req, res) => {
    const respuesta = 'Bienvenidos a la página principal'
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
        console.error('Error al leer el archivo de productos:', error)
        return res.status(500).send('Error interno del servidor')
    }

    let productos = JSON.parse(data);

    if (limit) {
        productos = productos.slice(0, limit);
    }

    res.json(productos);
}

// const ProductManager = require('./ProductManager.js')

app.listen(PORT, () => {
    console.log(`Servidor running on  ${PORT}`)
})
