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

```sh
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
