// import * as fs from 'fs';
// import * as path from 'path';
// import * as os from 'os';

// const homeDirectory = os.homedir();
// const dbFilePath = path.resolve(
//   path.join(homeDirectory, '.keepi', 'db.sqlite'),
// );
// const configFilePath = path.resolve(
//   path.join(homeDirectory, '.keepi', 'config.json'),
// );
// const filesPath = path.resolve(path.join(homeDirectory, '.keepi'));

// const checkAndCreateDirectory = () => {
//   if (!fs.existsSync(filesPath)) {
//     fs.mkdirSync(filesPath, { recursive: true });
//     // console.log('Directory created successfully!');
//   } else {
//     // console.log('Directory already exists.');
//   }
// };

// const checkAndCreateDatabaseFile = async () => {
//   console.log(fs.existsSync(dbFilePath));

//   if (fs.existsSync(dbFilePath)) return;
//   console.log('Database file created successfullysssssssss.');

//   try {
//     fs.writeFileSync(dbFilePath, '');
//   } catch (error) {
//     console.log('error');
//   } finally {
//     console.log('Database file created successfully.');
//   }
// };

// const checkAndCreateConfigFile = () => {
//   if (fs.existsSync(configFilePath)) {
//     return;
//   }

//   fs.writeFileSync(configFilePath, '');

//   console.log('Config file created successfully.');
// };

// export const createFiles = () => {

//   // checkAndCreateDirectory();
//   // checkAndCreateDatabaseFile();
// };
