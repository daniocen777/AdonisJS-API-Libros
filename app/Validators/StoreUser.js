"use strict";

class StoreUser {
  get rules() {
    return {
      username: "required",
      email: "required|email|unique:users,email",
      password: "required",
    };
  }

  get messages() {
    return {
      "username.required": "El campo usuario es requerido",
      "email.required": "El campo email es requerido",
      "email.email": "El email no es correcto",
      "email.unique": "El email ya existe",
      "password.required": "El campo password es requerido",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = StoreUser;
