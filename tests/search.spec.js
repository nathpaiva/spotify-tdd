import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchArtists, searchAlbums, searchTracks, searchPlaylists } from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('Spotify Search', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });
  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    it('should exist the searchAlbuns method', () => {
      expect(searchAlbums).to.exist;
    });
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive our correct url to fetch', () => {
      context('passing one type', () => {
        search('Incubus', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        search('Incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from de Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      searchArtists('Strokes');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call correct url', () => {
      const artists = searchArtists('Strokes');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Strokes&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      searchAlbums('Strokes');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call correct url', () => {
      const albums = searchAlbums('Strokes');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Strokes&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      searchTracks('Last Nite');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call correct url', () => {
      const tracks = searchTracks('Last Nite');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Last Nite&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      searchPlaylists('BestOfStrokes');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call correct url', () => {
      const tracks = searchPlaylists('BestOfStrokes');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=BestOfStrokes&type=playlist');
    });
  });
});