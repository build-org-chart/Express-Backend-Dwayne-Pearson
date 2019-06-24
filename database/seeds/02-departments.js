
exports.seed = function(knex, Promise) {
  return knex('departments').del()
    .then(function () {
      return knex('departments').insert([
        {department_head: 'rowValue1', manager: 1},
        {department_head: 'rowValue2', manager: 2},
        {department_head: 'rowValue3', manager: 3}
      ]);
    });
};