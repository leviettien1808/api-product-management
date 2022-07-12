const { v4: uuidv4 } = require('uuid');

const data = [
  {
    id: uuidv4(),
    name: '',
    description: '',
    price: 0,
    status: 'active',
    createdDate: new Date(),
  },
  {
    id: uuidv4(),
    name: '',
    description: '',
    price: 0,
    status: 'inactive',
    createdDate: new Date(),
  },
];

module.exports = data;
