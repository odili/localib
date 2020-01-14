const fs = require('fs');
const path = require('path');

exports.loadSchema = type =>
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
