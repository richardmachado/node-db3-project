const db = require('../data/db-config.js')

module.exports = {
     find,
     findById,
     findSteps,
     add,
     update,
     remove
}

//* GET all schemes */
function find(){
     return db('schemes');
}

//* GET scheme by ID */
function findById(id){
     return db('schemes')
     .where({id})
     .first();
}

//* GET steps by scheme ID */
function findSteps(id){
     return db.select('steps.id', 'schemes.scheme_name','steps.step_number', 'steps.instructions')
     .from('schemes')
     .join('steps', 'schemes.id', '=', 'steps.scheme_id')
}

//* POST new scheme */

function add(scheme){
     return db('schemes')
     .insert(scheme)
     .then(ids => {
          return findById(ids[0])
     })
}


// returns an id 
function update(changes, id){
     return db('schemes')
     .where({id})
     .update(changes)
     .then(response => findById(id))
}


function remove(id){
     return db('schemes')
     .where({id})
     .del()
}