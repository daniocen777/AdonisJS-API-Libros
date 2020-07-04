"use strict";

const Book = use("App/Models/Book");

class BookController {
  /**
   * Show a list of all books.
   * GET books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let books = await Book.all();
    return response.json(books);
  }

  /**
   * Create/save a new book.
   * POST books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const bookInfo = request.only(["title", "isbn", "author"]);
    const book = new Book();
    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.author = bookInfo.author;
    await book.save();
    return response.status(201).json(book);
  }

  /**
   * Display a single book.
   * GET books/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const book = await Book.find(params.id);
    if (!book) {
      return response.status(404).json({ message: "Recursos no encontrado" });
    }

    return response.status(200).json(book);
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const bookInfo = request.only(["title", "isbn", "author"]);
    const book = await Book.find(params.id);
    if (!book) {
      return response.status(404).json({ message: "Recursos no encontrado" });
    }
    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.author = bookInfo.author;
    await book.save();
    return response.status(200).json(book);
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const book = await Book.find(params.id);
    if (!book) {
      return response.status(404).json({ message: "Recursos no encontrado" });
    }
    await book.delete();
    return response.status(200).json({
      message: "Deleted",
      obj: book
    });
  }
}

module.exports = BookController;
