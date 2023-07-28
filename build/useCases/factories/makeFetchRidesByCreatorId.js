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

// src/useCases/factories/makeFetchRidesByCreatorId.ts
var makeFetchRidesByCreatorId_exports = {};
__export(makeFetchRidesByCreatorId_exports, {
  makeFetchRidesByCreatorIdUseCase: () => makeFetchRidesByCreatorIdUseCase
});
module.exports = __toCommonJS(makeFetchRidesByCreatorId_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/prisma/prismaRidesRepository.ts
var PrismaRidesRepository = class {
  async findById(id) {
    const ride = await prisma.ride.findUnique({ where: { id } });
    return ride;
  }
  async findMany() {
    const all = await prisma.ride.findMany();
    return all;
  }
  async findManyByCreatorId(creatorId) {
    const rides = await prisma.ride.findMany({ where: { creatorId } });
    return rides;
  }
  async create(data) {
    const ride = await prisma.ride.create({ data });
    return ride;
  }
};

// src/useCases/fetchRidesByCreatorId.ts
var FetchRidesByCreatorIdUseCase = class {
  constructor(ridesRepository) {
    this.ridesRepository = ridesRepository;
  }
  async execute({
    creatorId
  }) {
    const rides = await this.ridesRepository.findManyByCreatorId(creatorId);
    return rides;
  }
};

// src/useCases/factories/makeFetchRidesByCreatorId.ts
function makeFetchRidesByCreatorIdUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository();
  const fetchRidesByCreatorIdUseCase = new FetchRidesByCreatorIdUseCase(
    prismaRidesRepository
  );
  return fetchRidesByCreatorIdUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeFetchRidesByCreatorIdUseCase
});
