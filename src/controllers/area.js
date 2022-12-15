const commonHelper = require('../helpers/commonHelper');
const areaConfig = require('../../assets/area.json');
const validationHelper = require('../helpers/validationHelper');

const Boom = require('boom');

exports.getProvinces = async (request, res) => {
  try {
    const getProvinces = areaConfig.provinces;
    res.send({
      statusCode: '200',
      status: 'success',
      data: getProvinces,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getCities = async (request, res) => {
  try {
    const { error } = validationHelper.getCities(request.query);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    const searchParams = request.query.province;
    const getData = areaConfig.cities;
    let data = [];
    getData.filter((item) => {
      if (item.province.toLowerCase().indexOf(searchParams.toLowerCase()) !== -1) {
        data.push(item);
      }
      return data.sort();
    });
    res.send({
      statusCode: '200',
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
