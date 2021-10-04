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
exports.OsoInstance = void 0;
const common_1 = require("@nestjs/common");
const oso_1 = require("oso");
const prisma_service_1 = require("../prisma/prisma.service");
class Issue {
}
Issue.model = null;
class Org {
}
Org.model = null;
class OrgRole {
}
OrgRole.model = null;
class Repo {
}
Repo.model = null;
class RepoRole {
}
RepoRole.model = null;
class User {
}
User.model = null;
let OsoInstance = class OsoInstance extends oso_1.Oso {
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.isaCheck = (name) => (i) => i !== undefined && 'typename' in i && i.typename == name;
        this.combineQuery = (a, b) => {
            return {
                OR: [a, b],
            };
        };
        this.execFromModel = (model) => {
            return (q) => model.findMany({ where: q });
        };
        this.buildQuery = (constraints) => {
            const constrain = (query, c) => {
                if (c.field === undefined) {
                    c.field = 'id';
                    c.value = c.kind == 'In' ? c.value.map((v) => v.id) : c.value.id;
                }
                let q;
                if (c.kind === 'Eq')
                    q = { [c.field]: c.value };
                else if (c.kind === 'Neq')
                    q = { NOT: { [c.field]: c.value } };
                else if (c.kind === 'In')
                    query[c.field] = { in: c.value };
                else
                    throw new Error(`Unknown constraint kind: ${c.kind}`);
                return { AND: [query, q] };
            };
            const q = constraints.reduce(constrain, {});
            return q;
        };
        Issue.model = prisma.issue;
        Org.model = prisma.org;
        OrgRole.model = prisma.orgRole;
        Repo.model = prisma.repo;
        RepoRole.model = prisma.repo;
        User.model = prisma.user;
        this.setDataFilteringQueryDefaults({
            combineQuery: this.combineQuery,
            buildQuery: this.buildQuery,
        });
        this.registerClass(Issue, {
            isaCheck: this.isaCheck('Issue'),
            execQuery: (q) => prisma.issue.findMany({ where: q, include: { repo: true } }),
            fields: {
                id: Number,
                repo: new oso_1.Relation('one', 'Repo', 'repoId', 'id'),
            },
        });
        this.registerClass(Org, {
            isaCheck: this.isaCheck('Org'),
            execQuery: this.execFromModel(prisma.org),
            fields: {
                id: Number,
                base_repo_role: String,
            },
        });
        this.registerClass(OrgRole, {
            isaCheck: this.isaCheck('OrgRole'),
            execQuery: (q) => prisma.orgRole.findMany({
                where: q,
                include: { org: true, user: true },
            }),
            fields: {
                id: Number,
                role: String,
                org: new oso_1.Relation('one', 'Org', 'orgId', 'id'),
                user: new oso_1.Relation('one', 'User', 'userId', 'id'),
            },
        });
        this.registerClass(Repo, {
            isaCheck: this.isaCheck('Repo'),
            execQuery: (q) => prisma.repo.findMany({ where: q, include: { org: true } }),
            fields: {
                id: Number,
                org: new oso_1.Relation('one', 'Org', 'orgId', 'id'),
            },
        });
        this.registerClass(RepoRole, {
            isaCheck: this.isaCheck('RepoRole'),
            execQuery: (q) => prisma.repoRole.findMany({
                where: q,
                include: { repo: true, user: true },
            }),
            fields: {
                id: Number,
                role: String,
                repo: new oso_1.Relation('one', 'Repo', 'repoId', 'id'),
                user: User,
            },
        });
        this.registerClass(User, {
            isaCheck: this.isaCheck('User'),
            execQuery: (q) => prisma.user.findMany({
                where: q,
                include: {
                    repoRole: { include: { repo: true } },
                    orgRole: { include: { org: true } },
                },
            }),
            fields: {
                id: Number,
                repoRole: new oso_1.Relation('many', 'RepoRole', 'id', 'userId'),
                orgRole: new oso_1.Relation('many', 'OrgRole', 'id', 'userId'),
            },
        });
    }
    async initialized() {
        await this.loadFiles(['./authorization.polar']);
    }
    canActivate(context) {
        context.switchToHttp().getRequest().oso = this;
        return true;
    }
    unauthorized() {
        throw new common_1.UnauthorizedException();
    }
};
OsoInstance = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OsoInstance);
exports.OsoInstance = OsoInstance;
//# sourceMappingURL=oso-instance.js.map