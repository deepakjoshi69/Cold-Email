/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./lib/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://emaildb_owner:npg_g3s4QKBnjUiD@ep-empty-bush-a5v94e67-pooler.us-east-2.aws.neon.tech/emaildb?sslmode=require'
  }
};
