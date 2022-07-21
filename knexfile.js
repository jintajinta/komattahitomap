// Update with your config settings.

module.exports = {

  development: {
    client: "pg",
    connection: {
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      database: "der4stj3obe9fd",
      user: "cjlhzqazlofral",
      password: "    e3323848f28cc0ca658ef68c53a95fd27be6d88c86e0f0cb6ffbae5c3e90c8a9",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "pg",
    connection: {
      url: process.env.DATABASE_URL,
      database: "der4stj3obe9fd",
      user: "cjlhzqazlofral",
      password: "e3323848f28cc0ca658ef68c53a95fd27be6d88c86e0f0cb6ffbae5c3e90c8a9",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "pg",
    connection: {
      url: process.env.DATABASE_URL,
      database: "der4stj3obe9fd",
      user: "cjlhzqazlofral",
      password: "e3323848f28cc0ca658ef68c53a95fd27be6d88c86e0f0cb6ffbae5c3e90c8a9",
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};