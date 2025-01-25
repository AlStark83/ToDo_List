const {getDb} = require('../mongodb');

const db = getDb('task_manager');


console.log('db', db);
