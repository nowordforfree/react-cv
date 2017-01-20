#!/bin/bash
docker network rm react-cv
docker network create --subnet=172.18.0.0/16 react-cv
docker run -it --rm \
           --name react-cv-postgres \
           --net react-cv --ip 172.18.0.22 \
           -e POSTGRES_PASSWORD=postgres \
           -e POSTGRES_USER=postgres \
           -e POSTGRES_DB=cvs \
           -p 32801:5432 \
           -v $(pwd)/volumes:/var/lib/docker/data \
           -d postgres
echo "Postgres docker container started - 172.18.0.22:5432"