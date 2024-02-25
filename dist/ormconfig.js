"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const dataSourceOptions = {
    type: 'sqlite',
    database: './db.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    cli: {
        entitiesDir: "__dirname + '/**/*.entity{.ts,.js}'",
    },
    synchronize: true,
    migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
};
exports.dataSource = new typeorm_1.DataSource(dataSourceOptions);
//# sourceMappingURL=ormconfig.js.map