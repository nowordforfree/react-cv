module.exports = {
  db: {
    name: 'cvs',
    username: 'postgres',
    password: 'postgres',
    options: {
      dialect: 'postgres',
      host: '172.18.0.22',
      logging: console.log,
      port: 5432
    }
  },
  api: {
    host: 'ozzy',
    port: 8090
  },
  app: {
    host: 'ozzy',
    https: false,
    port: 8080
  }
}