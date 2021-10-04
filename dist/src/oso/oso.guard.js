"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsoGuard = exports.Authorize = exports.authorizeFactory = exports.Resource = exports.Action = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const oso_instance_1 = require("./oso-instance");
const Action = (action) => (0, common_1.SetMetadata)('action', action);
exports.Action = Action;
const Resource = (resource) => (0, common_1.SetMetadata)('resource', resource);
exports.Resource = Resource;
const authorizeFactory = (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const action = data || ctx.getHandler().name;
    const oso = request.oso;
    return async (resource) => {
        console.log('CALLBACK');
        console.log(user);
        console.log(action);
        console.log(resource);
        const isAllowed = await oso.isAllowed(user, action, resource);
        if (!isAllowed) {
            throw new common_1.ForbiddenException();
        }
    };
};
exports.authorizeFactory = authorizeFactory;
exports.Authorize = (0, common_1.createParamDecorator)(exports.authorizeFactory);
let OsoGuard = class OsoGuard {
    constructor(reflector, oso) {
        this.reflector = reflector;
        this.oso = oso;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const actor = request.user || {};
        const action = this.reflector.get('action', context.getHandler()) ||
            context.getHandler().name;
        const resource = this.reflector.get('resource', context.getHandler()) ||
            this.reflector.get('resource', context.getClass()) ||
            context.getClass().name;
        return this.oso.isAllowed(actor, action, resource);
    }
};
OsoGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, oso_instance_1.OsoInstance])
], OsoGuard);
exports.OsoGuard = OsoGuard;
//# sourceMappingURL=oso.guard.js.map