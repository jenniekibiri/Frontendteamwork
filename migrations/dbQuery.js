const users = 

    `CREATE TABLE IF NOT EXISTS account(
        user_id serial PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        job_role VARCHAR(55) NOT NULL,
        department VARCHAR(255),
      );`

const articles = `
CREATE TABLE IF NOT EXISTS articles(
    article_id serial PRIMARY KEY,
    author_id integer NOT NULL REFERENCES account("user_id"),
    article_title TEXT NOT NULL,
    article TEXT NOT NULL,
    created_on TIMESTAMP with no timezone  NOT NULL,
    category VARCHAR(50) REFERENCES categories(category_name)
  );`;

const comments = `
CREATE TABLE IF NOT EXISTS comments(
    comment_id serial PRIMARY KEY,
    created_on TIMESTAMP NOT NULL,
    comment VARCHAR(255) NOT NULL,
    author_id integer NOT NULL,
    gif_id integer,
    article_id integer,
      FOREIGN KEY("gif_id") REFERENCES "gifs" ("gif_id"),
        FOREIGN KEY("article_id") REFERENCES "articles" ("article_id"),
    FOREIGN KEY("author_id") REFERENCES "account" ("user_id")
  )
  `;

const dropTables = `
        DROP TABLE IF EXISTS account cascade;

        DROP TABLE IF EXISTS articles cascade;
        DROP TABLE IF EXISTS comments cascade;
        DROP TABLE IF EXISTS gifs cascade;
        DROP TABLE IF EXISTS categories cascade;
`;

export default `${users}${articles}${comments}${gifs}${categories}`;
export { dropTables };
