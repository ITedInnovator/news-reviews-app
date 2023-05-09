# News App

This is an app containing comments on news articles by users online.

## Setup
PostgreSQL should be installed in your local environment.
It is important to have a development and test database setup in a .env.development and .env.test files 

- In .env.development write PGDATABASE=nc_news.
- In .env.test write PGDATABASE=nc_news_test to set the test database.

If necessary for your local environment the relevant username PGUSER=username, password PGPASSWORD=password and host if different from localhost PGHOST=hostname for your databases should be added in the .env files.

