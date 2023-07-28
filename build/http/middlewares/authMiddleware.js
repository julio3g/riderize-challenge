"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/middlewares/authMiddleware.ts
var authMiddleware_exports = {};
__export(authMiddleware_exports, {
  authMiddleware: () => authMiddleware
});
module.exports = __toCommonJS(authMiddleware_exports);
var import_jsonwebtoken = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.user = void 0;
    next();
    return;
  }
  const [, token] = authHeader.split(" ");
  if (token) {
    try {
      const payload = (0, import_jsonwebtoken.verify)(token, process.env.SECRET_TOKEN);
      req.user = payload;
    } catch (err) {
      console.log("Token verification error:", err);
    }
  }
  next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authMiddleware
});
