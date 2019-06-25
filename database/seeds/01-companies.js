exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(function () {
      // Inserts seed entries
      return knex('companies').insert([
        {name: 'Value1'},
        {name: 'Value2'},
        {name: 'Value3'}
      ]);
    });
};
