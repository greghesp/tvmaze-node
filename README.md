# tvmaze-node

A Node.js library for accessing the TVmaze API.  Pull requests are welcome.

# Installation

To install with NPM
```sh
$ npm install --save tvmaze-node
```
# Usage

Access to TVmaze's API does not require an API Key.  
The code below will return the results for any show that matches "Lost"

```javascript
var tvmaze = require("tvmaze-node");

tvmaze.search("Lost", function(error, response) {
    // handle errors and response
});
```

# Endpoints

## Search
### Show Search
Search through all the shows in the TVmaze API by the show's name. Results are returned in order of relevancy and contain full information about the show.

**Example:** http://api.tvmaze.com/search/shows?q=lost
```javascript
tvmaze.search("Lost", function(error, response) {
    // handle errors and response
});
```

### Show Single Search
Search for a single show. You can also embed additional data such as the episodes by passing 'episodes' as a second parameter

**Example:** http://api.tvmaze.com/singlesearch/shows?q=lost
```javascript
tvmaze.singleShow("Lost", function(error, response) {
    // handle errors and response
});
```
**Example:** http://api.tvmaze.com/singlesearch/shows?q=lost&embed=episodes
```javascript
tvmaze.singleShow("Lost", "episodes", function(error, response) {
    // handle errors and response
});
```

## Show Lookup

If you already know a show's tvrage, thetvdb or IMDB ID, then you can get the show information.  Pass either 'tvrage', 'thetvdb', or 'imdb' as the first parameter.

**Example:** http://api.tvmaze.com/lookup/shows?tvrage=24493

```javascript
tvmaze.showLookup('tvrage',24493, function(error, response) {
    // handle errors and response
});
```
## People Search

Return show information based on a person.

**Example:** http://api.tvmaze.com/search/people?q=lauren

```javascript
tvmaze.peopleSearch('lauren', function(error, response) {
    // handle errors and response
});
```
## Schedule

Return a complete list of episodes that air in a country on a date. Pass the countries ISO 3166-1 code as the first parameter, and the date as an ISO 8601 format.

If no country is provided, it defaults to the US, if no date is provided, it defaults to today.

**Example:**  
Example: http://api.tvmaze.com/schedule?country=US&date=2014-12-01

```javascript
tvmaze.schedule('US', '2014-12-01', function(error, response) {
    // handle errors and response
});
```

### Full Schedule

Returns a list of all future episodes know to TVmaze, regardless of their country

**Example:** http://api.tvmaze.com/schedule/full

```javascript
tvmaze.fullSchedule(function(error, response) {
    // handle errors and response
});
```

## All Show Information
To retrieve all the information for a specific show, you must use the ID from the TVmaze.

### Main Information

You can get the episodes for a show, or you can embed additional information as per the TVmaze API

**Example:** http://api.tvmaze.com/shows/3
```javascript
tvmaze.showById(3, false, false, function(error, response) {
    // handle errors and response
});
```
**Example:** http://api.tvmaze.com/shows/3?embed=cast
```javascript
tvmaze.showById(3, "embed", ["cast"], function(error, response) {
    // handle errors and response
});
```

### Episode List
Return a list of episodes for the show. You can include specials as per the example below.

**Example:** http://api.tvmaze.com/shows/3/episodes
```javascript
tvmaze.showById(3, "episodes", false, function(error, response) {
    // handle errors and response
});
```
**Example:** http://api.tvmaze.com/shows/3/episodes?specials=1
```javascript
tvmaze.showById(3, "episodes", "specials", function(error, response) {
    // handle errors and response
});
```
### Episode by Number
Return one specific episode from a show given its season number and episode number.

**Example:** http://api.tvmaze.com/shows/3/episodebynumber?season=1&number=1
```javascript
tvmaze.showById(3, "episodesbynumber", [1,1], function(error, response) {
    // handle errors and response
});
```

### Episodes by date

Return all episodes that aired on a specific date

**Example:** http://api.tvmaze.com/shows/3/episodesbydate?date=2013-07-01

```javascript
tvmaze.showById(3, "episodesbydate", "2013-07-01", function(error, response) {
    // handle errors and response
});
```

### Show Seasons

Return a list of seasons for a show

**Example:** http://api.tvmaze.com/shows/3/seasons

```javascript
tvmaze.showById(3, "seasons", false, function(error, response) {
    // handle errors and response
});
```
### Show Cast

Return a list of the cast for a show

**Example:** http://api.tvmaze.com/shows/3/cast

```javascript
tvmaze.showById(3, "cast", false, function(error, response) {
    // handle errors and response
});
```
### Show AKAs

Return a list of aliases for a show

**Example:** http://api.tvmaze.com/shows/3/akas

```javascript
tvmaze.showById(3, "akas", false, function(error, response) {
    // handle errors and response
});
```
## Show Index

Return a list of all shows in the TVmaze database.  There are 250 shows per page and shows never change pages.
The first page is page 0

**Example:** http://api.tvmaze.com/shows?page=0

```javascript
tvmaze.showIndex(0, function(error, response) {
    // handle errors and response
});
```

## Show People Information

Return a information for a given person.  You can also embed additional information if needed.

### Show Main Information

**Example:** http://api.tvmaze.com/people/1

```javascript
tvmaze.peopleInfo(1, false, false, function(error, response) {
    // handle errors and response
});
```
**Example:** http://api.tvmaze.com/people/1?embed=castcredits

```javascript
tvmaze.peopleInfo(1, "embed", "castcredits", function(error, response) {
    // handle errors and response
});
```
### Show Cast Information
Show cast credits for a given person.  You can also embed additional information such as the shows they've featured in.

**Example:** http://api.tvmaze.com/people/1/castcredits
```javascript
tvmaze.peopleInfo(1, "castcredits", false, function(error, response) {
    // handle errors and response
});
```
**Example:** http://api.tvmaze.com/people/1/castcredits?embed=show
```javascript
tvmaze.peopleInfo(1, "castcredits",['show'], function(error, response) {
    // handle errors and response
});
```

### Show Crew Information
Show crew credits for a given person.  You can also embed additional information such as the shows they've featured in.

**Example:** http://api.tvmaze.com/people/100/crewcredits
```javascript
tvmaze.peopleInfo(100, "crewcredits", false, function(error, response) {
    // handle errors and response
});
```
**Example:** http://api.tvmaze.com/people/100/crewcredits?embed=show
```javascript
tvmaze.peopleInfo(100, "crewcredits",['show'], function(error, response) {
    // handle errors and response
});
```
## Show Updates

Return a list of shows and the timestamp when they were updated

**Example:** http://api.tvmaze.com/updates/shows
```javascript
tvmaze.showUpdates(function(error, response) {
    // handle errors and response
});
```


