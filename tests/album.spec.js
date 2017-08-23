import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('Album', () => {
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
    it('should exist the getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });
    it('should exist the getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });
    it('should exist the getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    // verifica se o fetch ocorre
    it('should call fetch function', () => {
      spotify.album.getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a URL desejada
    it('should call fetch with correct URL', () => {
      const id = '0sNOF9WDwhWunNAHPD3Baj';
      spotify.album.getAlbum(id);
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums/${id}`);
    });
    // verifica se o dado é recebido pela Promise
    it('should return the JSON Data from de Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbum('Incubus', 'artist');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    // verifica se o fetch ocorre
    it('should call fetch function', () => {
      spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    // verifica se o fetch ocorre com a URL desejada
    it('should call fetch with correct URL', () => {
      const id = ['0sNOF9WDwhWunNAHPD3Baj', '0sNOF9WDwhWunNAHPD3Bax'];
      spotify.album.getAlbums(id);
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums/id=${id}`);
    });
    // verifica se o dado é recebido pela Promise
    it('should return the JSON Data from de Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbums('Incubus', 'artist');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumTracks', () => {
    // verifica se o fetch ocorre
    it('should call fetch function', () => {
      spotify.album.getTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a URL desejada
    it('should call fetch with correct URL', () => {
      const id = '0sNOF9WDwhWunNAHPD3Baj';
      spotify.album.getTracks(id);

      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums/${id}/tracks`);
    });
    // verifica se o dado é recebido pela Promise
    it('should return the JSON Data from de Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getTracks('Incubus', 'artist');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
