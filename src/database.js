import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false)

const url = process.env.NODE_ENV === 'development' ? process.env.MONGO_DEV : process.env.MONGO_URL

export default async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    console.log('[db] connect successfull')
  } catch (error) {
    console.error('[db] error connect', error)
  }
}
