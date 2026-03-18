import { Pool } from "pg";

const testCases = [
  { desc: "Username with project ref, Decoded @ password", user: "postgres.pvznvxfyyngdughhjwhx", pass: "G21030278n@T" },
  { desc: "Username with project ref, Encoded %40 password", user: "postgres.pvznvxfyyngdughhjwhx", pass: "G21030278n%40T" },
  { desc: "Username just postgres, Decoded @ password", user: "postgres", pass: "G21030278n@T" },
  { desc: "Username just postgres, Encoded %40 password", user: "postgres", pass: "G21030278n%40T" },
];

async function testConnection() {
  for (const tc of testCases) {
    console.log(`\nTesting: ${tc.desc}`);
    const pool = new Pool({
      host: "aws-1-eu-north-1.pooler.supabase.com",
      port: 6543,
      database: "postgres",
      user: tc.user,
      password: tc.pass,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });
    
    try {
      const { rows } = await pool.query("SELECT 1 as result");
      console.log(`✅ SUCCESS! Found working combination: ${tc.desc}`);
      await pool.end();
      process.exit(0);
    } catch (e: any) {
      console.log(`❌ FAILED: ${e.message}`);
    }
    await pool.end();
  }
}

testConnection();
