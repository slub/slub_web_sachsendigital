<?php
defined('TYPO3_MODE') or die();

// Configure plugins.
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
    'Slub.SlubWebSachsendigital',
    'Media',
    [
        'Media' => 'video'
    ],
    // non-cacheable actions
    [
        'Media' => ''
    ]
);

/*
 * Add default RTE configuration
 */
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['slub_web_sachsendigital'] = 'EXT:slub_web_sachsendigital/Configuration/RTE/Default.yaml';
