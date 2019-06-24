
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'Dummyuser1', password: 'Dumb1111', company: 'LambdaSchool', full_name: 'J Doe', title: 'Student', department: '3'},
        {username: 'Dummyuser2', password: 'Dumb2222', company: 'LambdaSchool', full_name: 'John Doe', title: 'Student', department: '1'},
        {username: 'Dummyuser3', password: 'Dumb3333', company: 'LambdaSchool', full_name: 'Johnny Doe', title: 'Student', department: '2'}
      ]);
    });
};