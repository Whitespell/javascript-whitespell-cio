TODO
* Let the user pass on a copy of socket.io which can be used instead of the one Whitespell automaticly imports
* defaultWorker option in constructor

## Development
The CIO uses [Grunt](gruntjs.com) to build the JavaScript files in `src/` to `dist/`.

Before you start make sure to install all the dependencies using `sudo npm install`.

Our `GruntFile` supports a `merge` task for concatting and a `mergemin` task to concat, test and uglify. `grunt watch` will watch for changes to files in the `src/` folder and run `merge` when a change is detected.
