
exports.seed = function(knex, Promise) {
  return knex('departments').del()
    .then(function () {
      return knex('departments').insert([
        {name: 'Sporting goods', company_id: 1, department_head: 1},
        {name: 'Electronics', company_id: 1, department_head: 2},
        {name: 'Jewelry', company_id: 1, department_head: 3}
      ]);
    });
};