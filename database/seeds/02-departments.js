
exports.seed = function(knex, Promise) {
  return knex('departments').del()
    .then(function () {
      return knex('departments').insert([
        {name: 'random', company_id: 1, department_head: 1},
        {name: 'random', company_id: 1, department_head: 2},
        {name: 'random', company_id: 1, department_head: 3}
      ]);
    });
};