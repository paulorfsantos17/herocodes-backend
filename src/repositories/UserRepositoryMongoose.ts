import mongoose from 'mongoose'
import { UserRepository } from './UserRepository'
import { User } from '../entities/User'

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: new mongoose.Types.ObjectId().toString(),
  },
  name: String,
  email: String,
})

const UserModel = mongoose.model('User', UserSchema)

class UserRepositoryMongoose implements UserRepository {
  async add(user: User): Promise<User> {
    const userModel = new UserModel(user)
    await userModel.save()
    return user
  }

  async verifyIsUserExits(email: string): Promise<User | undefined> {
    const result = await UserModel.findOne({ email }).exec()
    return result?.toObject() || undefined
  }
}

export { UserRepositoryMongoose }
