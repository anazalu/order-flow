FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=password

COPY create_db.sql /docker-entrypoint-initdb.d/
