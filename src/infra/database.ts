import mongoose from 'mongoose'

export async function connect() {
  try {
    await mongoose.connect('mongodb+srv://paulo:t43g._qjMq*F7zP@cluster0.qyoox0a.mongodb.net/heroticket')
    console.log('conect on database success.');
    
  } catch (error) {
    console.log('connect error: database.ts ~ linha 5:',  error)
  }
}