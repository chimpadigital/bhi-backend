import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userShema = new Schema({
  nameAgency: String,
  nameSeller: String,
  address: String,
  phone: String,
  razonSocial: String,
  social: Object,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: false
  },
  verify: {
    type: Boolean,
    default: false,
    required: false
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
},
{
  timestamps: true,
  versionKey: false,
})

userShema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

userShema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model('User', userShema)
