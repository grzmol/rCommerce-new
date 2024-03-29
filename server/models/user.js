import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

let Schema = mongoose.Schema;

let userSchema =new Schema({
    username: String,
    password:String,
    email : String,
    isAdmin: Boolean,
    isActive: Boolean
});

userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    console.log(err);
});

userSchema.methods.comparePassword=function(candidatePassword,next){    
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return next(err);
        next(null,isMatch)
    });
}

export default mongoose.model('User', userSchema);