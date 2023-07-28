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

// src/useCases/factories/makeRegisterUseCase.ts
var makeRegisterUseCase_exports = {};
__export(makeRegisterUseCase_exports, {
  makeRegisterUseCase: () => makeRegisterUseCase
});
module.exports = __toCommonJS(makeRegisterUseCase_exports);

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

// src/useCases/register.ts
var import_bcryptjs = require("bcryptjs");
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    password
  }) {
    const passwordHash = await (0, import_bcryptjs.hash)(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail)
      throw new Error("E-mail already exists.");
    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    });
    return user;
  }
};

// src/useCases/factories/makeRegisterUseCase.ts
function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);
  return registerUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeRegisterUseCase
});
