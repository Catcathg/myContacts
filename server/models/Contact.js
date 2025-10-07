const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
    {
        firstName: {
            type: String, required: true
        },
        lastName: {
            type: String, required: true
        },
        phone: {
            type: String, required: true, minlength: 10, maxlength: 20, unique: true
        },
        image: {
            type: String,
            default: "https://vectorified.com/images/anonymous-person-icon-13.jpg"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
