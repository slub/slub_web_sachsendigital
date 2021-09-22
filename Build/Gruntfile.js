
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
                    "Resources/Public/Css/JPlayer.css" : "Resources/Private/Less/JPlayer/JPlayer.less",
                    "Resources/Public/Css/VideoPlayer.css" : "Resources/Private/Less/VideoPlayer/VideoPlayer.less",
                }
            }
        },
        terser: {
            development: {
                options: {
                    compress: true,
                    output: {
                        comments: false
                    }
                },
                files: {
                    "Resources/Public/JavaScript/sxndScripts.js": [
                        'Resources/Private/JavaScript/modernizrCustom.js',
                        'Resources/Private/JavaScript/jquery.cookiebar.js',
                        'Resources/Private/JavaScript/JqueryMagnificPopup.min.js',
                        'Resources/Private/JavaScript/sxndScripts.js'
                    ]
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
            js: {
                files: ['Resources/Private/JavaScript/*.js'],
                tasks: ['terser'],
                options: {
                    spawn: false
                }
            }
        }
    });
    grunt.file.setBase('../');
    grunt.registerTask('default', ['less','terser','watch']);
};
