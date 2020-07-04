"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

/* Creando grupo de rutas */
Route.group(() => {
  /* Usuarios */
  Route.post("login", "AuthController.login");
  Route.post("register", "AuthController.register").validator("StoreUser");
  Route.get("profile", "AuthController.profile").middleware("auth:api");
  Route.post("revokeUserToken", "AuthController.revokeUserToken").middleware(
    "auth:api"
  );
  /* Books */
  // resource => Crea todas las rutas (GET, POST, PATCH, DELETE)
  Route.resource("book", "BookController")
    .middleware("auth:api")
    .validator(
      new Map([
        ["book.store", "StoreBook"],
        ["book.update", "UpdateBook"],
      ])
    );
}).prefix("api/v1");
