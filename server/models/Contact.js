const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter contact first name"]
        },
        lastName: {
            type: String,
            required: [true, "Please enter contact last name"]
        },
        phone: {
            type: Number,
            required: [true, "Please enter contact number"]
        },
        image: {
            type: String,
            default: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fanonymous-person-icon-13.jpg&f=1&nofb=1&ipt=8d3abd35425fb4001f99a38aa96e93df97e3e84dc375bd1fff96514214c5c54e"
        },
    },
    {
        timestamps: true,
    }
)

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;