const { Schema, model } = mongoose;

const bookSchema = new Schema(
    {
        title : {
            type: String,
            required: true
        },
        authors: { type: [{ type: Schema.Types.ObjectId, ref: "Author" }] },
        published: { type: String },
        genre: { 
            type: [{type: String}],
            enum: ["Fantasy", "Drama", "fiction", "SciFi"]
        }
    },
    {
        timestamps: true
    });

    const Book = model("Book", bookSchema);

    module.exports = Book;