import { User } from '../entities/User'

interface UserRepository {
  add(user: User): Promise<User>
  verifyIsUserExits(email: string): Promise<any>
}

export { UserRepository }
