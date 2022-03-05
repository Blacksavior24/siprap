const boom = require('@hapi/boom');

const {models} = require('./../libs/sequelize');

class ReportService {

  constructor(){
  }

  async create(data) {
    const newReport = await models.Report.create(data);
    return newReport;
  }

  async find() {
    const Reports = await models.Report.findAll({
      include: ['category']
    });
    return Reports;
  }

  async findOne(id) {
    const Report = await models.Report.findByPk(id);
    if(!Report){
      throw boom.notFound('Informe no encontrado');
    }
    return Report;
    /*
    const Report = this.Reports.find(item => item.id === id);
    if (!Report) {
      throw boom.notFound('Report not found');
    }
    if (Report.isBlock) {
      throw boom.conflict('Report is block');
    }
    return Report;*/
  }

  async update(id, changes) {
    const Report = await this.findOne(id);
    const rta = await Report.update(changes);
    return rta;
    /*
    const index = this.Reports.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Report not found');
    }
    const Report = this.Reports[index];
    this.Reports[index] = {
      ...Report,
      ...changes
    };
    return this.Reports[index];*/
  }

  async delete(id) {
    const Report = await this.findOne(id);
    await Report.destroy();
    return { id };
    /*
    const index = this.Reports.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Report not found');
    }
    this.Reports.splice(index, 1);
    return { id };*/
  }

}

module.exports = ReportService;
