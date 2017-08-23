import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('SpotifyWrapper Library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'blabla',
    });

    expect(spotify.apiURL).to.be.equal('blabla');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });

    expect(spotify.token).to.be.equal('foo');
  });

  describe('Request Method', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });
    afterEach(() => {
      fetchedStub.restore();
    });

    it('should have request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });
    it('should call fetch when request', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });

      spotify.request('url');

      expect(fetchedStub).to.have.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });

      spotify.request('url');

      expect(fetchedStub).to.have.been
        .calledWith('url');
    });

    it('should call fetch with passed headers', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });

      const HEADERS = {
        headers: {
          Authorization: '\'Bearer foo\'',
        },
      };

      spotify.request('url');

      expect(fetchedStub).to.have.been
        .calledWith('url', HEADERS);
    });
  });
});
