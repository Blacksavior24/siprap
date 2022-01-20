const boom = require('@hapi/boom');

const {models} = require('./../libs/sequelize');

class InventoryService {

  constructor(){
  }

  async create(data) {
    const newInventory = await models.Inventory.create(data);
    return newInventory;
  }

  async find() {
    const inventory = await models.Inventory.findAll({
      include: ['category']
    });
    return inventory;
  }

  async findOne(id) {
    const inventory = this.inventory.find(item => item.id === id);
    if (!inventory) {
      throw boom.notFound('inventory not found');
    }
    if (inventory.isBlock) {
      throw boom.conflict('inventory is block');
    }
    return inventory;
  }

  async update(id, changes) {
    const index = this.inventory.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('inventory not found');
    }
    const inventory = this.inventory[index];
    this.inventory[index] = {
      ...inventory,
      ...changes
    };
    return this.inventory[index];
  }

  async delete(id) {
    const index = this.inventory.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('inventory not found');
    }
    this.inventory.splice(index, 1);
    return { id };
  }

}

module.exports = InventoryService;
