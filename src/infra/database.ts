import mongoose from 'mongoose'

export async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://paulo:t43g._qjMq*F7zP@cluster0.qyoox0a.mongodb.net/heroticket',
    )
  } catch (error) {
    console.log('🚀 ~ file: database.ts:5 ~ connect ~ error:', error)
  }
}
