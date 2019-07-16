const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const SchemaType = mongoose.SchemaTypes;

const UserSchema = new Schema({
  _id: { type: String, required: true },
  avatar: String,
  username: { 
    type: String, 
    required: true,
    validate: {
        validator: v => {
          return /^[A-Za-z0-9_.-]+$/.test(v);
        },
        message: props => `${props.value} is not a valid username`,
      },
  },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator: v => {
          return /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(v);
        },
        message: props => `${props.value} is not a valid email`,
      },
      {
        validator: v => {
          return mongoose
          .model('User')
          .countDocuments({email: v})
          .exec()
          .then(count => count === 0);
        },
        message: props => `${props.value} is duplicated`
      }
    ]
  },
  firstName: { type: String, required: true,},
  lastName: { type: String, required: true,}, 
  dob: Date,
  gender: {
    type: String,
    emum: ['male', 'female'],
    required: true,
  },
  country: String,
  phoneNumber: String,
  zipcode: {
    type: Number,
    min: 1000,
    max: 9999999,
  },

  password: String,
  emailVerified: {
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    emum: ['admin', 'moderator', 'user'],
    required: true,
  },
},
{ toJSON: { virtuals: true }}
);


UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
});

/*
UserSchema.vitural('fullName').get(() => {
  return this.firstName + ' ' + this.lastName;
})*/

const User = mongoose.model('User', UserSchema)
module.exports = User
