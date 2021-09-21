<?php
defined('TYPO3_MODE') or die();

// Configure plugins.
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
    'Slub.SlubWebLdp',
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
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['slub_web_ldp'] = 'EXT:slub_web_ldp/Configuration/RTE/Default.yaml';
