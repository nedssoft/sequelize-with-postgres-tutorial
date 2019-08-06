module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jon Doe',
        email: 'jondoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
