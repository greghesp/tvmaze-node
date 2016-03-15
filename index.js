var request = require("request");

module.exports = {
     pullRequest: function(url, donePulledRequest) {
        request(url, function(error, response, body){
          if(error || response.statusCode === 404 || body.length == 2) {
             donePulledRequest(error || 'No results');
          }
          else {
            donePulledRequest(null, body);
          }
        });
      },

      search: function(show, doneShow){
        var url =  "http://api.tvmaze.com/search/shows?q=" + show;
        module.exports.pullRequest(url, doneShow)
      },

      singleShow: function(show, episodes, doneSingleShow){
        var url = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

        if(episodes){
          url = url + "&embed=episodes";
          module.exports.pullRequest(url, doneSingleShow);
        }
        else {
          module.exports.pullRequest(url, doneSingleShow);
        }
      },

      showLookup: function(source, id, doneShowLookup){
        var url =  "http://api.tvmaze.com/lookup/shows?" + source + "=" + id;
        module.exports.pullRequest(url, doneShowLookup)
      },

      peopleSearch: function(name, donePeopleSearch){
        var url = "http://api.tvmaze.com/search/people?q=" + name;
        module.exports.pullRequest(url, donePeopleSearch)
      },

      schedule: function(country, date, doneSchedule){
        var url = "http://api.tvmaze.com/schedule";

        if(country && !date){
          url = url + "?country=" + country;
        }
        else if (date && !country) {
          url = url + "?date=" + date;
        }
        else if (date && country) {
         url = url + "?country=" + country + "&date=" + date;
       } else {
         return doneSchedule('Something went wrong');
       }
        module.exports.pullRequest(url, doneSchedule)
      },

      fullSchedule: function(doneFullSchedule){
        var url = "http://api.tvmaze.com/schedule/full";
        module.exports.pullRequest(url, doneFullSchedule)
      },

      showById: function(id, type, options, doneShowById){
        var url = "http://api.tvmaze.com/shows/" + id;

        switch(type) {
          case "embed":
            //Produce results when user uses the embed type
            url = url + "?";
            //Check for options and modify the URL
            if(options){
              options.forEach(function(item){
                url = url + type + "=" + item + "&";
              });
            }
            url = url.slice(0,-1);
            module.exports.pullRequest(url, doneShowById)
            break;

          case "episodes":
            //Produce results when user uses the episodes type
            url = url + "/episodes";
            //Check to see if there are any options selected and modify the URL
            if(options === "specials"){
              url = url + "?" + options + "=1";
            }
            module.exports.pullRequest(url, doneShowById)
            break;

          case "episodesbynumber":
            // Produce information about a specific episode
            url = url + "/episodebynumber?season=";

            if(options){
              options.forEach(function(item){
                url = url + item + "&number=";
              });
              url = url.slice(0,-8);
              module.exports.pullRequest(url, doneShowById)
            } else {
              doneShowById(null,"This call needs to be provided with a season and episode number");
            }
            break;

          case "episodesbydate":
            // Get the episodes aired on a certain date
            if(options){
              url = url + "/episodesbydate?date=" + options;
              module.exports.pullRequest(url, doneShowById)
            } else {
              doneShowById(null,'This call needs to be provided with a date as an option (2015-07-01)');
            }
            break;

          case "seasons":
            // Get season information for a show
            url = url + "/seasons";
            module.exports.pullRequest(url, doneShowById)
            break;

          case "cast":
            url = url + "/cast";
            module.exports.pullRequest(url, doneShowById)
            break;

          case "akas":
            url = url + "/akas";
            module.exports.pullRequest(url, doneShowById)
            break;

          default:
            module.exports.pullRequest(url, doneShowById)
        }
      },

      showIndex: function(page, doneShowIdex){
        var url =  "http://api.tvmaze.com/shows";
        if(page || page === 0 ){
          url = url + "?page=" + page;
        }
        module.exports.pullRequest(url, doneShowIdex)
      },

      peopleInfo: function(id, type, options, donePeopleInfo){
        var url = "http://api.tvmaze.com/people/" + id;

        switch(type) {
          case "embed":
            if(options){
              url = url + "?embed=" + options;
              module.exports.pullRequest(url, donePeopleInfo)
            }
            break;

          case "castcredits":
            url = url + "/castcredits?";
            if(options){
              options.forEach(function(item){
                url = url + "embed=" + item + "&";
              });
            }
            url = url.slice(0,-1);
            module.exports.pullRequest(url, donePeopleInfo)
            break;

          case "crewcredits":
            url = url + "/crewcredits?";
            if(options){
              options.forEach(function(item){
                url = url + "embed=" + item + "&";
              });
            }
            url = url.slice(0,-1);
            module.exports.pullRequest(url, donePeopleInfo)
            break;

          default:
            module.exports.pullRequest(url, donePeopleInfo)
        }
      },

      showUpdates: function(doneUpdating){
        url = "http://api.tvmaze.com/updates/shows";
        module.exports.pullRequest(url, doneUpdating)
      }
};
