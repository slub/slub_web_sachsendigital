
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    sourceMap: true,
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "Resources/Public/Css/sxndStyles.css" : "Resources/Private/Less/All.less",
                    "Resources/Public/Css/rteStyles.css" : "Resources/Private/Less/Rte.less",
                    "Resources/Public/Css/sxndKitodoViewer.css" : "Resources/Private/Less/KitodoViewer.less",
                    "Resources/Public/Css/VideoPlayer.css" : "Resources/Private/Less/VideoPlayer/VideoPlayer.less",
                }
            }
        },
        watch: {
            styles: {
                files: ['Resources/Private/Less/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },
        }
    });
    grunt.file.setBase('../');
    grunt.registerTask('default', ['less','watch']);
};
