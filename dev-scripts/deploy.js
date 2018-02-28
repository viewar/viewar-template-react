const fs = require('fs');
const request = require('request');


uploadBundle('../bundle/dev/bundle.zip');

function uploadBundle(path) {

  const url = 'http://dev2.viewar.com/test/BoilerplateDeploy';
  const formData = {
    apiKey: 'my_value',
    bundleId: 'my_value',
    bundle: fs.createReadStream(__dirname + '/' + path),
  };

  const req = request.post({ url, formData }, (err, resp, body) => {
    if (err) {
      console.log('Error!', err);
    } else {
      console.log('URL: ' + body);
    }
  });
}


//name

function createReleaseBundleFilename(now = new Date()) {
  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const year = now.getFullYear();
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  const seconds = ("0" + now.getSeconds()).slice(-2);

  return `${day}-${month}-${year}__${hours}-${minutes}-${seconds}.zip`;
}