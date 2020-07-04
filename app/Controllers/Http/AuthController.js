"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token");

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  /**
   * Create/save a new auth.
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async login({ request, response, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    return response.json(token);
  }

  /**
   * Create/save a new auth.
   * POST register
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async register({ request, response, auth }) {
    const data = request.only(["username", "email", "password"]);
    const user = await User.create({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    // Generando token luego de crear nuevo usuario
    const token = await auth.generate(user);

    return response.status(200).json({user, token});
  }

  async profile({ auth, response }) {
    const user = await auth.getUser();
    return response.status(200).json(user);
  }

  async revokeUserToken({ auth, response }) {
    /* const user = await auth.getUser(); */
    await auth.authenticator("api").revokeTokens();
    return response.status(200).json({ message: "Token revoked" });
  }
}

module.exports = AuthController;
