const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const inquirer = require('inquirer');
const CredentialManager = require('../lib/credential-manager');
const dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
describe('a credential manager', () => {
  let credentials = null;
  before(() => {
    credentials = new CredentialManager('ivan-tool-test');
  });
  context('with no existing credentials', () => {
    it('should prompt the user', async () => {
      sinon.stub(inquirer, 'prompt').resolves({ key: 'foo', secret: 'bar' });

      let [key, secret] = await credentials.getKeyAndSecret();
      expect(key).to.equal('foo');
      expect(secret).to.equal('bar');
      // expect(inquirer.prompt.calledOnce).to.be.true();
      inquirer.prompt.restore();
    });
  });
  context('with existing credentials', () => {
    it('should just return them', async () => {
      let [key, secret] = await credentials.getKeyAndSecret();
      expect(key).to.equal('foo');
      expect(secret).to.equal('bar');
    });
  });
  after(() => {
    credentials.conf.delete('apiKey');
    credentials.conf.delete('apiSecret');
  });
});
