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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/resolvers/UserResolver.ts
var UserResolver_exports = {};
__export(UserResolver_exports, {
  UserResolver: () => UserResolver
});
module.exports = __toCommonJS(UserResolver_exports);
var import_jsonwebtoken = require("jsonwebtoken");
var import_type_graphql2 = require("type-graphql");

// src/schema.ts
var import_type_graphql = require("type-graphql");
var User = class {
};
__decorateClass([
  (0, import_type_graphql.Field)()
], User.prototype, "id", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], User.prototype, "name", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], User.prototype, "email", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], User.prototype, "password", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => [Ride])
], User.prototype, "rides", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => [Booking])
], User.prototype, "bookings", 2);
User = __decorateClass([
  (0, import_type_graphql.ObjectType)()
], User);
var Ride = class {
};
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "id", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "name", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "start_date", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "start_date_registration", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "end_date_registration", 2);
__decorateClass([
  (0, import_type_graphql.Field)({ nullable: true })
], Ride.prototype, "additional_information", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "start_place", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => import_type_graphql.Int, { nullable: true })
], Ride.prototype, "participants_limit", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "creatorId", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => User)
], Ride.prototype, "creator", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => [Booking])
], Ride.prototype, "bookings", 2);
Ride = __decorateClass([
  (0, import_type_graphql.ObjectType)()
], Ride);
var Booking = class {
};
__decorateClass([
  (0, import_type_graphql.Field)()
], Booking.prototype, "id", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Booking.prototype, "rideId", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Booking.prototype, "userId", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Booking.prototype, "subscription_date", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => User)
], Booking.prototype, "user", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => Ride)
], Booking.prototype, "ride", 2);
Booking = __decorateClass([
  (0, import_type_graphql.ObjectType)()
], Booking);

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

// src/useCases/register.ts
var import_bcryptjs2 = require("bcryptjs");
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    password
  }) {
    const passwordHash = await (0, import_bcryptjs2.hash)(password, 6);
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

// src/resolvers/UserResolver.ts
var UserResolver = class {
  async createUser(name, email, password) {
    const registerUseCase = makeRegisterUseCase();
    return await registerUseCase.execute({ name, email, password });
  }
  async session(email, password) {
    const authenticateUseCase = makeAuthenticateUseCase();
    const user = await authenticateUseCase.execute({ email, password });
    return (0, import_jsonwebtoken.sign)({ userId: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "6h"
    });
  }
};
__decorateClass([
  (0, import_type_graphql2.Mutation)(() => User),
  __decorateParam(0, (0, import_type_graphql2.Arg)("name")),
  __decorateParam(1, (0, import_type_graphql2.Arg)("email")),
  __decorateParam(2, (0, import_type_graphql2.Arg)("password"))
], UserResolver.prototype, "createUser", 1);
__decorateClass([
  (0, import_type_graphql2.Mutation)(() => String),
  __decorateParam(0, (0, import_type_graphql2.Arg)("email")),
  __decorateParam(1, (0, import_type_graphql2.Arg)("password"))
], UserResolver.prototype, "session", 1);
UserResolver = __decorateClass([
  (0, import_type_graphql2.Resolver)(User)
], UserResolver);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserResolver
});
