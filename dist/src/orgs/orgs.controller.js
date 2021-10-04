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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgsController = void 0;
const common_1 = require("@nestjs/common");
const orgs_service_1 = require("./orgs.service");
const create_org_dto_1 = require("./dto/create-org.dto");
const basic_auth_guard_1 = require("../auth/basic-auth.guard");
const oso_guard_1 = require("../oso/oso.guard");
const oso_instance_1 = require("../oso/oso-instance");
let OrgsController = class OrgsController {
    constructor(orgsService) {
        this.orgsService = orgsService;
    }
    async listOrgs() {
        return this.orgsService.orgs({});
    }
    async createOrg(createOrgDto) {
        return this.orgsService.createOrg(createOrgDto);
    }
    async getOrgById(id, authorize) {
        const org = await this.orgsService.org({ id: Number(id) });
        console.log(org);
        await authorize(org);
        return org ? org : undefined;
    }
    async deleteOrg(id) {
        return this.orgsService.deleteOrg({ id: Number(id) });
    }
    async getUnassignedUsers() {
        return this.orgsService.orgs({});
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "listOrgs", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_org_dto_1.CreateOrgDto]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "createOrg", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, oso_guard_1.Authorize)('read')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "getOrgById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "deleteOrg", null);
__decorate([
    (0, common_1.Get)('/:id/unassigned_users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrgsController.prototype, "getUnassignedUsers", null);
OrgsController = __decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard, oso_instance_1.OsoInstance),
    (0, common_1.Controller)('orgs'),
    __metadata("design:paramtypes", [orgs_service_1.OrgsService])
], OrgsController);
exports.OrgsController = OrgsController;
//# sourceMappingURL=orgs.controller.js.map