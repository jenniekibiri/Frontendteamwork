CREATE TABLE IF NOT EXISTS  account(
  user_id serial PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  job_role VARCHAR(55) NOT NULL,
  department VARCHAR(255),
  username VARCHAR(255)
);
