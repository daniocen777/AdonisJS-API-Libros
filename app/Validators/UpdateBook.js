"use strict";

class UpdateBook {
  get rules() {
    const bookId = this.ctx.params.id;
    return {
      title: `required|unique:books,title,id,${bookId}`,
      isbn: `required|unique:books,isbn,id,${bookId}`,
      author: "required",
    };
  }

  get messages() {
    return {
      "title.required": "El título es requerido",
      "title.unique": "El título ya existe",
      "isbn.required": "El campo email es requerido",
      "isbn.unique": "El isbn ya existe",
      "author.required": "El autor es requerido",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = UpdateBook;
