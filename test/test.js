var assert = require('assert');
var expect = require("chai").expect;
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));
var tvmaze = require('../index.js');
var request = require('request');

describe('Show Search', function() {
  it("Returns all results for a given search", function(done) {
    tvmaze.search("lost", function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/search/shows?q=lost', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Show Single Search', function() {
  it("Searches for a single show", function(done) {
    tvmaze.singleShow("lost", false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/singlesearch/shows?q=lost', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });

  it("Searches for a single show with embded episode data", function(done) {
    tvmaze.singleShow("lost", true, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/singlesearch/shows?q=lost&embed=episodes', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Show Lookup', function() {
  it("Returns episode data based on a thetvdb id", function(done) {
    tvmaze.showLookup('thetvdb', '81189', function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/lookup/shows?thetvdb=81189', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });

  it("Returns episode data based on a tvrage id", function(done) {
    tvmaze.showLookup('tvrage', '24493', function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/lookup/shows?tvrage=24493', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });

  it("Returns episode data based on an IMDB id", function(done) {
    tvmaze.showLookup('imdb', 'tt0944947', function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/lookup/shows?imdb=tt0944947', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('People Search', function() {
  it("Returns show information based on a person", function(done) {
    tvmaze.peopleSearch('lauren', function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/search/people?q=lauren', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Schedule', function() {
  it("Return a complete list of episodes that air in a country on a date", function(done) {
    tvmaze.schedule('US', '2014-12-01', function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/schedule?country=US&date=2014-12-01', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Full Schedule', function() {
  it("Returns a list of all future episodes know to TVmaze, regardless of their country", function(done) {
    this.timeout(20000);
    setTimeout(done,20000);
    tvmaze.fullSchedule(function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/schedule/full', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('All Show Information - Main Information', function() {
  it("Get show information by ID", function(done) {
    tvmaze.showById(3, false, false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows/3', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });

  });

  it("Get show information by ID with embeded cast information", function(done) {
    tvmaze.showById(3, "embed", ['cast'], function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows/3?embed=cast', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('All Show Information - Episode Lists', function() {
  it("Get episode information by ID", function(done) {
    tvmaze.showById(3, 'episodes', false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows/3/episodes', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });

  it("Get episode information by ID with embeded cast information", function(done) {
    tvmaze.showById(3, "episodes", 'specials', function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows/3/episodes?specials=1', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('All Show Information - Episode by Number', function() {
  it("Get information about a specific episode", function(done) {
    tvmaze.showById(1, 'episodesbydate', '2013-07-01', function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows/1/episodesbydate?date=2013-07-01', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('All Show Information - Show Seasons', function() {
  it("Get list of seasons or a show", function(done) {
    tvmaze.showById(3, 'seasons', false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows/3/seasons', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('All Show Information - Show Cast', function() {
  it("Get list of cast members for a show", function(done) {
    tvmaze.showById(3, 'cast', false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows/3/cast', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('All Show Information - Show AKAs', function() {
  it("Get list of aliases for a show", function(done) {
    tvmaze.showById(3, 'akas', false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows/3/akas', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Show Index', function() {
  it("Get list of allshows in the TVMaze database", function(done) {
    tvmaze.showIndex(1, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/shows?page=1', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Show People Information - Main Information', function() {
  it("Get information for a given person", function(done) {
    tvmaze.peopleInfo(1,false, false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/people/1', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });

  it("Get information for a given person with embedded cast credits", function(done) {
    tvmaze.peopleInfo(1, 'embed', 'castcredits', function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/people/1?embed=castcredits', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Show People Information - Cast Information', function() {
  it("Get cast credits for a given person", function(done) {
    tvmaze.peopleInfo(1,'castcredits', false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/people/1/castcredits', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });

  it("Get cast credits for a given person with embedded show information", function(done) {
    tvmaze.peopleInfo(1, 'castcredits', ['show'], function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/people/1/castcredits?embed=show', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Show People Information - Crew Information', function() {
  it("Get crew credits for a given person", function(done) {
    tvmaze.peopleInfo(100,'crewcredits', false, function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/people/100/crewcredits', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });

  it("Get crew credits for a given person with embedded show information", function(done) {
    tvmaze.peopleInfo(100, 'crewcredits', ['show'], function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/people/100/crewcredits?embed=show', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});

describe('Show Updates', function() {
  it("Returns a list of shows and the timestamp when they were updated", function(done) {
    this.timeout(20000);
    setTimeout(done,20000);
    tvmaze.showUpdates(function(error, response) {
      if(error){
        done(error);
      } else {
      request('http://api.tvmaze.com/updates/shows', function(error, resp, body){
        expect(response).to.eql(body);
          done();
        })
      }
    });
  });
});
