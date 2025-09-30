import bcrypt from 'bcrypt';
import { pool } from './src/config/db';

async function createUser() {
  const name = 'Admin';
  const email = 'admincross@gmail.com';
  const plainPassword = '123456';
  const saltRounds = 10;

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // Insertar el usuario en la BD
    const result = await pool.query(
      `INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashedPassword]
    );

    console.log('✅ Usuario creado:', result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
  } finally {
    pool.end(); // Cierra la conexión
  }
}

async function changeType() {
  try {
    const result = await pool.query(
      `ALTER TABLE transactions
ALTER COLUMN transaction_date TYPE text
USING transaction_date::text;
`,
    );
console.log('Tabla modificada');
  } catch (error) {
    console.error('❌ Error al actualizar tabla:', error);
  } finally {
    pool.end(); // Cierra la conexión
  }
}


changeType()
//createUser();
