const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'some.txt'), 'utf8');
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, 'files', 'some.txt'));

    await fsPromises.writeFile(path.join(__dirname, 'files', 'some1.txt'), data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'some1.txt'), '\nJavaScript');
    await fsPromises.rename(
      path.join(__dirname, 'files', 'some1.txt'),
      path.join(__dirname, 'files', 'some2.txt'),
    );
    // await fsPromises.writeFile(path.join(__dirname, 'files', 'some.txt'), data);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'some.txt'), 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Hi, my name is Roman', (err) => {
//   if (err) throw err;
//   console.log('Operation complete (write)');

//   fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nHi, Roman', (err) => {
//     if (err) throw err;
//     console.log('Operation complete (append)');

//     fs.rename(
//       path.join(__dirname, 'files', 'reply.txt'),
//       path.join(__dirname, 'files', 'newReply.txt'),
//       (err) => {
//         if (err) throw err;
//         console.log('Operation complete (rename)');
//       },
//     );
//   });
// });

process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
