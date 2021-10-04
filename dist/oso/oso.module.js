"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsoModule = void 0;
const common_1 = require("@nestjs/common");
const oso_instance_1 = require("./oso-instance");
const oso_guard_1 = require("./oso.guard");
let OsoModule = class OsoModule {
};
OsoModule = __decorate([
    (0, common_1.Module)({
        providers: [oso_guard_1.OsoGuard, oso_instance_1.OsoInstance],
        exports: [oso_guard_1.OsoGuard, oso_instance_1.OsoInstance],
    })
], OsoModule);
exports.OsoModule = OsoModule;
//# sourceMappingURL=oso.module.js.map