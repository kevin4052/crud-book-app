const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const authorSchema = new Schema(
    {
        firsName : {
            type: String,
            required: true
        },
        lastName: { type: String },
        dob: { type: String },
        died: { type: Boolean },
        picture: { type: String },
        books: { type: [{ type: Schema.Types.ObjectId, ref: "Book" }] }
    },
    {
        timestamps: true
    });

    const Author = model("Author", authorSchema);

    module.exports = Author;