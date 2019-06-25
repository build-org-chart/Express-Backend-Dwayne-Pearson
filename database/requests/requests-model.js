const db = require('../dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}

async function add(request) {
    const [id] = await db('requests')
    .insert(request);

    return findById(id);
}

function find() {
    return db('requests')
    .select('*');
}

function findBy(filter) {
    return db('requests')
    .where(filter);
}

function findById(id) {
    return db('requests')
    .where({ id })
    .first();
}

function update(id, changes) {
    return db('requests')
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
    return db('requests')
        .where({ id })
        .del();
}