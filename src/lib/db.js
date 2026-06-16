import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL);
export default sql;
const users = await sql`
  SELECT * FROM users
`;

console.log(users);
