const mongoose = require('mongoose');
const {createHmac,randomBytes} = require('crypto');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        salt: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        profileImageURL: {
            type: String,
            default: 'https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain'
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: "USER"
        }
    },
    { timestamps: true }
)

userSchema.pre('save', function (next) {
    const user = this;
    if(!(user.isModified(this.password)))  return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex')

    this.salt = salt;
    this.password = hashedPassword;
    next()


})

const user = mongoose.model('user', userSchema)


module.exports = user