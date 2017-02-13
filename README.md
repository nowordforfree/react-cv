# react-cv

Project to understand principles of ReactJS (with Redux) and make some application using ReactJS + Redux

In order to run this application you should perform following steps:

1. Clone this project (`git clone https://github.com/nowordforfree/react-cv.git`)
2. Install dependencies (`npm install`)
3. Install [PostgreSQL](https://www.postgresql.org/download/)
    1. If you want to use your local DB:
        1. Install [PostgreSQL](https://www.postgresql.org/download/) and run it
        2. Create table `Cv`
        3. Update file `config.js` in the root of this project (set `db.username`, `db.password` and `db.options.host`)
    2. Or if you prefer [Docker](https://www.docker.com/):
        1. Pull latest Postgres image (`docker pull postgres`)
        2. Run shell script from root of this project (`./docker-run-postgres.sh`)
4. Run this app by executing `npm start`

If you want just to build source code - run `npm run build`.
