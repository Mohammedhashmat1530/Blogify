const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');

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
    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')

    this.salt = salt;
    this.password = hashedPassword;
    next()


})

userSchema.static('checkPassword',async function (email,password){
    const user = await this.findOne({email})

    if(!user) throw new Error("User not found")
    const salt= user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = createHmac('sha256',salt).update(password).digest('hex')

    if(hashedPassword !==userProvidedPassword)throw new Error("password is incorrect")

    return {...user,password:undefined,salt:undefined}
})




const User = mongoose.model('user', userSchema)


module.exports = User