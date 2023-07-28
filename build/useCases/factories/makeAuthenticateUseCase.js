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

// src/useCases/factories/makeAuthenticateUseCase.ts
var makeAuthenticateUseCase_exports = {};
__export(makeAuthenticateUseCase_exports, {
  makeAuthenticateUseCase: () => makeAuthenticateUseCase
});
module.exports = __toCommonJS(makeAuthenticateUseCase_exports);

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

// src/useCases/authenticate.ts
var import_bcryptjs = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email.toLowerCase());
    if (!user)
      throw new Error("Invalid credentials.");
    const doestPasswordMatches = await (0, import_bcryptjs.compare)(password, user.password);
    if (!doestPasswordMatches)
      throw new Error("Invalid credentials.");
    return user;
  }
};

// src/useCases/factories/makeAuthenticateUseCase.ts
function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
  return authenticateUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeAuthenticateUseCase
});
