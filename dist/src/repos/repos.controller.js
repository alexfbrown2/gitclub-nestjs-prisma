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
exports.ReposController = void 0;
const common_1 = require("@nestjs/common");
const repos_service_1 = require("./repos.service");
const basic_auth_guard_1 = require("../auth/basic-auth.guard");
const oso_instance_1 = require("../oso/oso-instance");
const prisma_service_1 = require("../prisma/prisma.service");
let ReposController = class ReposController {
    constructor(reposService, prisma) {
        this.reposService = reposService;
        this.prisma = prisma;
    }
    async listRepos(orgId, request) {
        console.log('listing repos');
        const repoFilter = await request.oso.authorizedQuery(request.user, 'read', this.prisma.repo);
        return this.prisma.repo.findMany({
            where: {
                AND: [repoFilter, { orgId: Number(orgId) }],
            },
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('orgId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReposController.prototype, "listRepos", null);
ReposController = __decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard, oso_instance_1.OsoInstance),
    (0, common_1.Controller)('orgs/:orgId/repos'),
    __metadata("design:paramtypes", [repos_service_1.ReposService,
        prisma_service_1.PrismaService])
], ReposController);
exports.ReposController = ReposController;
//# sourceMappingURL=repos.controller.js.map