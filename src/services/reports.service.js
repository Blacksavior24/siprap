const boom = require('@hapi/boom');

const {models} = require('./../libs/sequelize');

class ReportsService {

  constructor(){
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category']
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if(!product){
      throw boom.notFound('product no encontrado');
    }
    return product;
    /*
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;*/
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
    /*
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];*/
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
    /*
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };*/
  }

}

module.exports = ReportsService;
