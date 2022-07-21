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

/*
 * Register some backend icons
 */
$iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
$icons = ['Slider'];
foreach ($icons as $icon) {
    $iconRegistry->registerIcon(
        'SachsendigitalWebsite' . $icon,
        \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        ['source' => 'EXT:slub_web_sachsendigital/Resources/Public/Icons/Backend/' . $icon . '.svg']
    );
}

/*
 * Allow custom content elements on all standard pages
 */
TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_sachsendigital_slider');
