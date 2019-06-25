exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(function () {
      // Inserts seed entries
      return knex('companies').insert([
        {name: 'Company1'},
        {name: 'Company2'},
        {name: 'Company3'}
      ]);
    });
};
