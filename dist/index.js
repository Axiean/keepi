#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("./ormconfig");
const password_1 = require("./src/password");
const fs = require("fs");
const path = require("path");
const dbFilePath = path.resolve(__dirname, 'db.sqlite');
const checkAndCreateDatabase = () => {
    if (fs.existsSync(dbFilePath)) {
        return;
    }
    fs.writeFileSync(dbFilePath, '');
    console.log('Database file created successfully.');
};
ormconfig_1.dataSource
    .initialize()
    .then(() => {
    checkAndCreateDatabase();
    (0, password_1.main)();
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map