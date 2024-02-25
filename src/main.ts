#!/usr/bin/env node

import { dataSource } from './database/ormconfig';
import { main } from './password';
import { createFiles } from './services/Files.service';

dataSource
  .initialize()
  .then(() => {
    createFiles();
    main();
  })
  .catch((err) => {
    console.log(err);

    // logger.error('Error during Data Source initialization', err);
  });
