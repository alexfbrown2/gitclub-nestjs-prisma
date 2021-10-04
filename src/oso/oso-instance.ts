import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { Oso, Relation } from 'oso';
import { PrismaService } from '../prisma/prisma.service';

class Issue {
  static model = null;
}
class Org {
  static model = null;
}
class OrgRole {
  static model = null;
}
class Repo {
  static model = null;
}
class RepoRole {
  static model = null;
}
class User {
  static model = null;
}

@Injectable()
export class OsoInstance extends Oso implements CanActivate {
  constructor(private prisma: PrismaService) {
    super();

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
      execQuery: (q) =>
        prisma.issue.findMany({ where: q, include: { repo: true } }),
      fields: {
        id: Number,
        repo: new Relation('one', 'Repo', 'repoId', 'id'),
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
      execQuery: (q) =>
        prisma.orgRole.findMany({
          where: q,
          include: { org: true, user: true },
        }),
      fields: {
        id: Number,
        role: String,
        org: new Relation('one', 'Org', 'orgId', 'id'),
        user: new Relation('one', 'User', 'userId', 'id'),
      },
    });

    this.registerClass(Repo, {
      isaCheck: this.isaCheck('Repo'),
      execQuery: (q) =>
        prisma.repo.findMany({ where: q, include: { org: true } }),
      fields: {
        id: Number,
        org: new Relation('one', 'Org', 'orgId', 'id'),
      },
    });

    this.registerClass(RepoRole, {
      isaCheck: this.isaCheck('RepoRole'),
      execQuery: (q) =>
        prisma.repoRole.findMany({
          where: q,
          include: { repo: true, user: true },
        }),
      fields: {
        id: Number,
        role: String,
        repo: new Relation('one', 'Repo', 'repoId', 'id'),
        user: User,
      },
    });

    this.registerClass(User, {
      isaCheck: this.isaCheck('User'),
      execQuery: (q) =>
        prisma.user.findMany({
          where: q,
          include: {
            repoRole: { include: { repo: true } },
            orgRole: { include: { org: true } },
          },
        }),
      fields: {
        id: Number,
        repoRole: new Relation('many', 'RepoRole', 'id', 'userId'),
        orgRole: new Relation('many', 'OrgRole', 'id', 'userId'),
      },
    });

    this.loadFiles([`${__dirname}/authorization.polar`]);
  }

  //   async onModuleInit(): Promise<void> {
  //     await this.loadFiles([`${__dirname}/authorization.polar`]);
  //   }

  isaCheck = (name: string) => (i: any) =>
    i !== undefined && 'typename' in i && i.typename == name;

  combineQuery = (a: any, b: any) => {
    return {
      OR: [a, b],
    };
  };

  execFromModel = (model) => {
    return (q) => model.findMany({ where: q });
  };

  buildQuery = (constraints: any) => {
    const constrain = (query: any, c: any) => {
      if (c.field === undefined) {
        // console.log(c);
        c.field = 'id';
        c.value = c.kind == 'In' ? c.value.map((v) => v.id) : c.value.id;
      }

      let q;

      if (c.kind === 'Eq') q = { [c.field]: c.value };
      else if (c.kind === 'Neq') q = { NOT: { [c.field]: c.value } };
      else if (c.kind === 'In') query[c.field] = { in: c.value };
      else throw new Error(`Unknown constraint kind: ${c.kind}`);

      return { AND: [query, q] };
    };

    const q = constraints.reduce(constrain, {});
    return q;
  };

  //   isAllowed(
  //     actor: unknown,
  //     action: unknown,
  //     resource: unknown,
  //   ): Promise<boolean> {
  //     const isAllowed = super.isAllowed(actor, action, resource);

  //     return isAllowed;
  //   }

  canActivate(context: ExecutionContext): boolean {
    context.switchToHttp().getRequest().oso = this;
    return true;
  }

  unauthorized() {
    throw new UnauthorizedException();
  }
}
