#!/usr/bin/env node

import { dataSource } from './database/ormconfig';
import { main } from './commands';
import { createFiles } from './services/Files.service';
import { errorLog } from './services/Logger.service';

dataSource
  .initialize()
  .then(() => {
    createFiles();
    main();
  })
  .catch((err) => {
    errorLog(err);
  });
