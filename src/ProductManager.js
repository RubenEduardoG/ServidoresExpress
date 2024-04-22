const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.products = [];
        this.nextId = 1;
        this.path = path;
    }

    async readFilesMio() {
        try {
            const res = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(res);
        } catch (error) {
            console.log('Error al leer el archivo', error);
        }
    }

    async saveFilesMio(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log('Error al guardar el archivo', error);
        }
    }

    async addProduct(product) {
        if (!this.isProductValid(product)) {
            console.log("Error: El producto no es válido");
            return;
        }

        if (this.isCodeDuplicate(product.code)) {
            console.log("Error: El código del producto ya está en uso");
            return;
        }

        product.id = this.nextId++;
        this.products.push(product);
        await this.saveFilesMio(this.products);
    }

    async upDateProduct(id, productUpdate) {
        try {
            const arrayProducts = await this.readFilesMio();
            const index = arrayProducts.findIndex(item => item.id === id);
            if (index !== -1) {
                arrayProducts.splice(index, 1, productUpdate);
                await this.saveFilesMio(arrayProducts);
            } else {
                console.log('No se encontró el producto a actualizar');
            }
        } catch (error) {
            console.log('Error, no se pudo actualizar el producto', error);
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.readFilesMio();
            const deleteUpDate = arrayProducts.filter(item => item.id != id);
            await this.saveFilesMio(deleteUpDate);
        } catch (error) {
            console.log('No se pudo borrar el producto', error);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            return product;
        } else {
            console.log("Error: Producto no encontrado");
        }
    }

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        );
    }

    isCodeDuplicate(code) {
        return this.products.some(p => p.code === code);
    }
}

async function testBuscadoPorId(id) {
    const encontrado = await manager.getProductById(id)
    console.log(encontrado)
}

const productManager = new ProductManager("./nuevos_productos.json");
productManager.addProduct({
    title: "Loros Barranqueros Titular",
    description: "Camiseta Titular 2024",
    price: 30.99,
    thumbnail: 'ruta/imagenA.jpg',
    code: 'P001',
    stock: 6
})



productManager.addProduct({
    title: "Loros Barranqueros Suplente",
    description: "Camiseta Suplente 2024",
    price: 20.99,
    thumbnail: 'ruta/imagenB.jpg',
    code: 'P002',
    stock: 12
})



module.exports = productManager