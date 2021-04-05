import bcrypt from 'bcrypt';
import { createConnection } from 'typeorm';
import { User } from '../../app/users/entities/user';

(async () => {
  const connection = await createConnection();
  const userRepository = connection.getRepository(User);

  const password = '123456';

  const hash = await bcrypt.hash(password, 12);

  const admin = userRepository.create({
    first_name: 'Admin',
    last_name: 'Account',
    email: 'admin@mercury.com',
    password_hash: hash,
    is_admin: true,
  });

  await userRepository.save(admin);

  console.log('🔶 Seed complete!');
  await connection.close();
})();
