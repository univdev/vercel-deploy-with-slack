import * as fs from 'fs';

class JsonReader {
    read(file, parse = false) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, buffer) => {
                if (err) {
                    reject(`Could not read the file: ${err}`);
                    return;
                }
                try {
                    const fileData = buffer.toString('utf8');
                    if (parse === false) {
                        resolve(fileData);
                        return;
                    }
                    const json = JSON.parse(fileData);
                    resolve(json);
                }
                catch (err) {
                    reject(`Could not parse the fileData: ${err}`);
                }
            });
        });
    }
}

export { JsonReader };
