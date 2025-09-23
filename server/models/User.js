const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter User first name"]
        },
        password: {
            type: String,
            required: [true, "Please enter User last name"]
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", UserSchema);
module.exports = User;