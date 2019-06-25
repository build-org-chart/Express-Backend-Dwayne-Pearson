const db = require('../dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}

async function add(user) {
    const [id] = await db('users')
    .insert(user);

    return findById(id);
}

function find() {
    return db('users')
    .select('id', 'username', 'full_name', 'title', 'company', 'department');
}

function findBy(filter) {
    return db('users')
    .where(filter);
}

function findById(id) {
    return db('users')
    .where({ id })
    .first();
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                return findById(id);
            } else {
                return null;
            }
        });
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}