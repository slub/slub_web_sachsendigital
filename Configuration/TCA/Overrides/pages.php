<?php
defined('TYPO3_MODE') || die();

call_user_func(function()
{
    /**
     * Temporary variables
     */
    $extensionKey = 'slub_web_ldp';

    /**
     * Default PageTS for Sachsen.Digital
     */
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile (
        $extensionKey,
        'Configuration/TsConfig/All.tsconfig',
        'Sachsen.Digital: Page TS'
    );

    // there should be no '/' in slug path. Replace by empty string is same behaviour as in RealUrl
    $GLOBALS['TCA']['pages']['columns']['slug']['config']['generatorOptions']['replacements'] = [
        '/' => ''
    ];
});
