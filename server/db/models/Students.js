const db = require('../index');
const Sequelize = require('sequelize');
const Students = db.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0,
    validate: {
      min: 0.0,
      max: 4.0
    }
  }
},
{
  getterMethods: {
    name(){
      return this.firstName + ' ' + this.lastName;
    }
  }
})
module.exports = Students;
