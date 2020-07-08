module.exports = function (app, Book) {
    // GET ALL BOOKS
    app.get("/api/books", function (req, res) {
        Book.find(function (err, books) {
            if (err) return res.status(500).send({ error: "database failure" });
            console.log(books);
            res.json(books);
        });
    });
    // GET SINGLE BOOK
    app.get("/api/books/:book_id", function (req, res) {
        Book.findOne({ _id: req.params.book_id }, function (err, book) {
            if (err) return res.status(500).json({ error: err });
            if (!book) return res.status(404).json({ error: "book not found" });
            res.json(book);
        });
    });

    // GET BOOKS BY AUTHOR
    app.get("/api/books/author/:author", function (req, res) {
        Book.find(
            { author: req.params.author },
            { _id: 0, title: 1, published_date: 1 }, //가져올 로직  0:false,  1:true
            function (err, books) {
                if (err) return res.status(500).json({ error: err });
                if (books.length === 0)
                    return res.status(404).json({ error: "book not found" });
                res.json(books);
            }
        );
    });
    // CREATE BOOK
    app.post("/api/books", function (req, res) {
        var book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save(function (err) {
            if (err) {
                console.error(err);
                res.json({ result: 0 });
                return;
            }

            res.json({ result: 1 });
        });
    });

    // UPDATE THE BOOK (ALTERNATIVE)
    app.put("/api/books/:book_id", function (req, res) {
        Book.update({ _id: req.params.book_id }, { $set: req.body }, function (
            err,
            output
        ) {
            if (err) res.status(500).json({ error: "database failure" });
            console.log(output);
            if (!output.n)
                return res.status(404).json({ error: "book not found" });
            res.json({ message: "book updated" });
        });
    });

    app.delete("/api/books/:book_id", function (req, res) {
        Book.deleteOne({ _id: req.params.book_id }, function (err) {
            if (err) return res.status(500).json({ error: "database failure" });
            res.status(200).json({ message: "deleteOne success" });
        });
    });
};
