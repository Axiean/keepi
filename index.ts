#!/usr/bin/env node

import { dataSource } from './ormconfig';
import { main } from './src/password';
import * as fs from 'fs';
import * as path from 'path';

const dbFilePath = path.resolve(__dirname, 'db.sqlite');

const checkAndCreateDatabase = () => {
  if (fs.existsSync(dbFilePath)) {
    // console.log('Database file already exists.');
    return;
  }

  // Create the database file
  fs.writeFileSync(dbFilePath, '');

  console.log('Database file created successfully.');
};

dataSource
  .initialize()
  .then(() => {
    checkAndCreateDatabase();
    main();
  })
  .catch((err) => {
    console.log(err);

    // logger.error('Error during Data Source initialization', err);
  });
