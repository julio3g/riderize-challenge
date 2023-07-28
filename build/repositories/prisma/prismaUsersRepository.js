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

// src/repositories/prisma/prismaUsersRepository.ts
var prismaUsersRepository_exports = {};
__export(prismaUsersRepository_exports, {
  PrismaUsersRepository: () => PrismaUsersRepository
});
module.exports = __toCommonJS(prismaUsersRepository_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/prisma/prismaUsersRepository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }
  async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }
  async create(data) {
    return await prisma.user.create({ data });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaUsersRepository
});
