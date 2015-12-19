module.exports = function(grunt) {
  var tasks = ["concat", "eslint", "babel"];

  grunt.initConfig({
    watch: {
      files: ["./Gruntfile.js", "./src/**/*.js", "./src/**/*.jsx", "./**/*.html"],
      tasks: tasks
    },
    concat: {
      options: {
        sourceMap: true,
        sourceMapStyle: "link"
      },
      js: {
        src: ["src/**/*.js", "src/**/*.jsx"],
        dest: "temp/concat.jsx"
      }
    },
    eslint: {
      target: ["temp/concat.jsx"]
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "dist/script.js": "temp/concat.jsx"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", tasks);
};
