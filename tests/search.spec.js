import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('Spotify Search', () => {
  let fetchedStub;
  let promise;
  let spotify;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
  });
  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });
    it('should exist the spotify.search.searchAlbuns method', () => {
      expect(spotify.search.albums).to.exist;
    });
    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });
    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      spotify.search.artists('Strokes');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call correct url', () => {
      const artists = spotify.search.artists('Strokes');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Strokes&type=artist');
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      spotify.search.albums('Strokes');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call correct url', () => {
      const albums = spotify.search.albums('Strokes');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Strokes&type=album');
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      spotify.search.tracks('Last Nite');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call correct url', () => {
      const tracks = spotify.search.tracks('Last Nite');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Last Nite&type=track');
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      spotify.search.playlists('BestOfStrokes');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call correct url', () => {
      const tracks = spotify.search.playlists('BestOfStrokes');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=BestOfStrokes&type=playlist');
    });
  });
});
