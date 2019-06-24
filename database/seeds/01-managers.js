exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('managers').del()
    .then(function () {
      // Inserts seed entries
      return knex('managers').insert([
        {manager_name: 'Value1'},
        {manager_name: 'Value2'},
        {manager_name: 'Value3'}
      ]);
    });
};
