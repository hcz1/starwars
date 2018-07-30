module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            dist: {
              files: {
                'build/js/index.js': 'src/js/*'
              }
            }
          },
          copy: {
            main: {
              files: [
                // makes all src relative to cwd
                {expand: true, cwd: 'src/', src: ['index.html'], dest: 'build/'},
          
              ],
            },
          },
          
      });

      grunt.loadNpmTasks('grunt-browserify');
      grunt.loadNpmTasks('grunt-contrib-copy');

      grunt.registerTask('default', ['browserify','copy']);

}