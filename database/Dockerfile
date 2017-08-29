FROM postgres:9.5

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB database_name_dev

RUN apt-get update
RUN apt-get install -y postgresql-9.5-postgis-2.2

ADD init.sql /docker-entrypoint-initdb.d