"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Book extends Model {
  static get visible() {
    return ["title", "isbn", "author", "created_at"];
  }
}

module.exports = Book;
