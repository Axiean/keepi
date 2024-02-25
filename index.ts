#!/usr/bin/env node

import { dataSource } from './src/database/ormconfig';
import { main } from './src/password';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const homeDirectory = os.homedir();
const dbFilePath = path.resolve(path.join(homeDirectory, '.kpit', 'db.sqlite'));
const configFilePath = path.resolve(
  path.join(homeDirectory, '.kpit', 'config.json'),
);
const configPath = path.resolve(path.join(homeDirectory, '.kpit'));

const checkAndCreateDirectory = () => {
  if (!fs.existsSync(configPath)) {
    fs.mkdirSync(configPath, { recursive: true });
    // console.log('Directory created successfully!');
  } else {
    // console.log('Directory already exists.');
  }
};

const checkAndCreateDatabaseFile = () => {
  if (fs.existsSync(dbFilePath)) {
    return;
  }

  fs.writeFileSync(dbFilePath, '');

  console.log('Database file created successfully.');
};

const checkAndCreateConfigFile = () => {
  if (fs.existsSync(configFilePath)) {
    return;
  }

  fs.writeFileSync(configFilePath, '');

  console.log('Config file created successfully.');
};

dataSource
  .initialize()
  .then(() => {
    checkAndCreateDirectory();
    checkAndCreateDatabaseFile();
    checkAndCreateConfigFile();
    main();
  })
  .catch((err) => {
    console.log(err);

    // logger.error('Error during Data Source initialization', err);
  });
