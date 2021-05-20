
/*
module.exports={
    mysql,
    con: mysql.createConnection({
        host:"db-mysq-synapse-do-user-9070131-0.b.db.ondigitalocean.com",
        user: "doadmin",
        password: "izu7cjjbopy523db",
        database: `defaultdb`
    })
} 
*/

module.exports = {
    HOST: "db-mysq-synapse-do-user-9070131-0.b.db.ondigitalocean.com",
    USERNAME: "doadmin",
    PASSWORD: "izu7cjjbopy523db",
    PORT:'25060',
    DB: "defaultdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  };