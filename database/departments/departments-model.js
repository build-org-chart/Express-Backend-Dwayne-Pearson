const db = require('../dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('departments');
}

function findById(id) {
    return db('departments')
        .where({ id })
        .first();
}

function add(department) {
    return db('departments')
        .insert(department, 'id')
        .then(([id]) => {
            return findById(id);
        });
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