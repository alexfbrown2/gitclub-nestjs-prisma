-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrgRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "orgId" INTEGER,
    "userId" INTEGER,
    "typename" TEXT NOT NULL DEFAULT 'OrgRole',
    CONSTRAINT "OrgRole_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrgRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_OrgRole" ("id", "orgId", "role", "typename", "userId") SELECT "id", "orgId", "role", "typename", "userId" FROM "OrgRole";
DROP TABLE "OrgRole";
ALTER TABLE "new_OrgRole" RENAME TO "OrgRole";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
