
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'Dummyuser1', password: 'Dumb1111', company_id: 3, manager_id: null, full_name: 'J Doe', title: 'Student', department_id: 3, email: 'some1@some.com', account_type: 0},
        {username: 'Dummyuser2', password: 'Dumb2222', company_id: 3, manager_id: null, full_name: 'John Doe', title: 'Student', department_id: 1, email: 'some2@some.com', account_type: 0},
        {username: 'Dummyuser3', password: 'Dumb3333', company_id: 3, manager_id: null, full_name: 'Johnny Doe', title: 'Student', department_id: 2, email: 'some3@some.com', account_type: 0}
      ]);
    });
};