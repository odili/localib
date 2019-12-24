import fs from 'fs';
import path from 'path';

export const loadSchema = type =>
  new Promise((resolve, reject) => {
    const pathTOSchema = path.join(
      process.cwd(),
      `src/types/${type}/${type}.gql`
    );
    fs.readFile(pathTOSchema, { encoding: 'utf-8' }, (err, schema) => {
      if (err) {
        return reject(err);
      }
      resolve(schema);
    });
  });
