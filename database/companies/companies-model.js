const db = require('../dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}

async function add(company) {
    const [id] = await db('companies')
    .insert(company);

    return findById(id);
}

function find() {
    return db('companies')
    .select('*');
}

function findBy(filter) {
    return db('companies')
    .where(filter);
}

function findById(id) {
    return db('companies')
    .where({ id })
    .first();
}

function update(id, changes) {
    return db('companies')
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
    return db('companies')
        .where({ id })
        .del();
}