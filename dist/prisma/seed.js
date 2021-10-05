"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const beatles = await prisma.org.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'The Beatles',
            billingAddress: '64 Penny Ln Liverpool, UK',
            baseRepoRole: 'repo_read',
        },
    });
    const monsters = await prisma.org.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Monsters Inc.',
            billingAddress: '123 Scarers Rd Monstropolis, USA',
            baseRepoRole: 'repo_read',
        },
    });
    const abbeyRoad = await prisma.repo.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Abbey Road',
            issue: {
                create: {
                    title: 'Too much critical acclaim',
                },
            },
            org: {
                connect: {
                    id: beatles.id,
                },
            },
        },
    });
    const paperwork = await prisma.repo.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Paperwork',
            org: {
                connect: {
                    id: monsters.id,
                },
            },
        },
    });
    const john = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'john',
            email: 'john@beatles.com',
            password: 'terriblepassword',
            orgRole: {
                create: {
                    role: 'owner',
                    org: {
                        connect: {
                            id: beatles.id,
                        },
                    },
                },
            },
            repoRole: {
                create: {
                    role: 'owner',
                    repo: {
                        connect: {
                            id: abbeyRoad.id,
                        },
                    },
                },
            },
        },
    });
    const paul = await prisma.user.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'paul',
            email: 'paul@beatles.com',
            password: 'terriblepassword',
            orgRole: {
                create: {
                    role: 'member',
                    org: {
                        connect: {
                            id: beatles.id,
                        },
                    },
                },
            },
            repoRole: {
                create: {
                    role: 'member',
                    repo: {
                        connect: {
                            id: abbeyRoad.id,
                        },
                    },
                },
            },
        },
    });
    const ringo = await prisma.user.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'ringo',
            email: 'ringo@beatles.com',
            password: 'terriblepassword',
            orgRole: {
                create: {
                    role: 'member',
                    org: {
                        connect: {
                            id: beatles.id,
                        },
                    },
                },
            },
            repoRole: {
                create: {
                    role: 'member',
                    repo: {
                        connect: {
                            id: abbeyRoad.id,
                        },
                    },
                },
            },
        },
    });
    const mike = await prisma.user.upsert({
        where: { id: 4 },
        update: {},
        create: {
            name: 'mike',
            email: 'mike@monsters.com',
            password: 'terriblepassword',
            orgRole: {
                create: {
                    role: 'owner',
                    org: {
                        connect: {
                            id: monsters.id,
                        },
                    },
                },
            },
            repoRole: {
                create: {
                    role: 'owner',
                    repo: {
                        connect: {
                            id: paperwork.id,
                        },
                    },
                },
            },
        },
    });
    const sully = await prisma.user.upsert({
        where: { id: 5 },
        update: {},
        create: {
            name: 'sully',
            email: 'sully@monsters.com',
            password: 'terriblepassword',
            orgRole: {
                create: {
                    role: 'member',
                    org: {
                        connect: {
                            id: monsters.id,
                        },
                    },
                },
            },
            repoRole: {
                create: {
                    role: 'member',
                    repo: {
                        connect: {
                            id: paperwork.id,
                        },
                    },
                },
            },
        },
    });
    const randall = await prisma.user.upsert({
        where: { id: 6 },
        update: {},
        create: {
            name: 'randall',
            email: 'randall@monsters.com',
            password: 'terriblepassword',
            orgRole: {
                create: {
                    role: 'member',
                    org: {
                        connect: {
                            id: monsters.id,
                        },
                    },
                },
            },
            repoRole: {
                create: {
                    role: 'member',
                    repo: {
                        connect: {
                            id: paperwork.id,
                        },
                    },
                },
            },
        },
    });
    const admin = await prisma.user.upsert({
        where: { id: 7 },
        update: {},
        create: {
            name: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
        },
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map