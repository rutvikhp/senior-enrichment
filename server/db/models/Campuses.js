const db = require('../index');
const Sequelize = require('sequelize');
const Campuses = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'luna.jpeg',
  },
  description: {
    type: Sequelize.TEXT,
  },
});
module.exports = Campuses;
