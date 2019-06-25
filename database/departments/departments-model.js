const db = require('../dbConfig');

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('departments');
}

function findBy(filter) {
    return db('departments')
    .where(filter);
}

function findById(id) {
    return db('departments')
        .where({ id })
        .first();
}

async function add(department) {
    const [id] = await db('departments')
    .insert(department);

    return findById(id);
}

function update(id, changes) {
    return db('departments')
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
    return db('departments')
        .where({ id })
        .del();
}