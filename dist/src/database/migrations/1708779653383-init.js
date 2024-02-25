"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1708779653383 = void 0;
class Init1708779653383 {
    constructor() {
        this.name = 'Init1708779653383';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "password" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "passName" text NOT NULL, "encryptedPassword" text NOT NULL)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "password"`);
    }
}
exports.Init1708779653383 = Init1708779653383;
//# sourceMappingURL=1708779653383-init.js.map