#!/usr/bin/env node

import { dataSource } from './database/ormconfig';
import { main } from './commands';
import { errorLog } from './services/Logger.service';

dataSource
  .initialize()
  .then(() => {
    main();
  })
  .catch((err) => {
    errorLog(err);
  });
