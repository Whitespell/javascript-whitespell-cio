module.exports = function (grunt)
{

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		settings: {
			filename: 'whitespell-cio'
		},
		watch: {
			options: {
			    livereload: true,
			},
		  	js: {
		  		files: ['src/init.js', 'src/workers/*.js', 'src/networking/*.js'],
		  		tasks: ['merge']
		  	}
		},
		concat: {
			all: {
				src: ['src/networking/init.js', 'src/networking/src/*.js', 'src/networking/footer.js'],
				dest: 'dist/<%= settings.filename %>-<%= pkg.version %>.js'
			}
		},
		uglify: {
		    all: {
		      files: {
		        'dist/<%= settings.filename %>-<%= pkg.version %>.min.js': 'dist/<%= settings.filename %>-<%= pkg.version %>.js'
		      }
		    }
  		},
		jshint: {
			options: {
				browser: true, //Web Browser (window, document, etc)
    			strict: true, //Requires all functions run in ES5 Strict Mode
    			unused: true, //Require all defined variables be used
    			undef: true, //Require all non-global variables to be declared (prevents global leaks)
    			quotmark: false, //Quotation mark consistency
    			camelcase: true, //Identifiers must be in camelCase
    			eqeqeq: true, //Require triple equals (===) for comparison
    			forin: true, //Require filtering for..in loops with obj.hasOwnProperty()
    			immed: true, //Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
    			indent: 4, //Number of spaces to use for indentation
    			latedef: true, //Require variables/functions to be defined before being used
    			newcap: true, //Require capitalization of all constructor functions e.g. `new F()`
    			noarg: true, //Prohibit use of `arguments.caller` and `arguments.callee`
    			noempty: true, //Prohibit use of empty blocks
    			maxparams: 4, //Max number of formal params allowed per function
    			maxdepth: 4, //Max depth of nested blocks (within functions)
    			curly: true, //requires you to always put curly braces
    			predef: ['console', 'Cors', 'WebSocket', 'BlobBuilder'],

    			evil: true //allows the use of eval and the Function constructor

    			/* TODO: Function constructor can be freely used and since worker files use both single and double quotes
    			quotation mark consistency is not checked */
			},
    		all: 'dist/<%= settings.filename %>-<%= pkg.version %>.js'
  		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('merge', ['concat:all']);
	grunt.registerTask('mergemin', ['merge', 'jshint', 'uglify:all']);

}