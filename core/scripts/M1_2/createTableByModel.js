const Person = require('../../database/models/personModel');

(async () => {
  await Person.sync({ force: true }); 
  console.log("Tabela criada!");
})();
