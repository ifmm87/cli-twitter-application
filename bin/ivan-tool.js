#! /usr/bin/env node
console.log('hello pluralsight!!!');
const CredentialManager = require('../lib/credential-manager');
const  main = async () => {
  const credentials = new CredentialManager('ivan-tool');
  let [key, secret] = await credentials.getKeyAndSecret();
  console.log(key, secret);
}


main().catch(console.error);
