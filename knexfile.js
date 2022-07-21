// Update with your config settings.

module.exports = {

  development: {
    client: "pg",
    connection: {
      database: "todo_app",
      user: "postgres",
      password: "sqlpassword",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "pg",
    connection: {
      database: "todo_app",
      user: "postgres",
      password: "sqlpassword",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "pg",
    connection: {
      database: "todo_app",
      user: "postgres",
      password: "sqlpassword",
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};