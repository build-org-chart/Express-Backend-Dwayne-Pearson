
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {sender_id: 1, recipient_id: 2, subject: 'My 1st request', content: 'Can you please give me a passing grade on this assignment'},
        {sender_id: 1, recipient_id: 2, subject: 'My 2nd request', content: 'follow my 1st request'},
        {sender_id: 1, recipient_id: 2, subject: 'My 3rd request', content: 'How many requests do I get, are you some kind of genie?'}
      ]);
    });
};
