
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {sender_id: 1, recipient_id: 2, subject: 'rowValue1', content: 'whatever you wanna say'},
        {sender_id: 1, recipient_id: 2, subject: 'rowValue2', content: 'whatever you wanna say'},
        {sender_id: 1, recipient_id: 2, subject: 'rowValue3', content: 'whatever you wanna say'}
      ]);
    });
};
