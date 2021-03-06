"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const orgs_service_1 = require("./orgs.service");
const orgs_controller_1 = require("./orgs.controller");
const oso_instance_1 = require("../oso/oso-instance");
let OrgsModule = class OrgsModule {
};
OrgsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [orgs_controller_1.OrgsController],
        providers: [orgs_service_1.OrgsService, oso_instance_1.OsoInstance],
        exports: [orgs_service_1.OrgsService],
    })
], OrgsModule);
exports.OrgsModule = OrgsModule;
//# sourceMappingURL=orgs.module.js.map