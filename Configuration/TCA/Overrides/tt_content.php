<?php
defined('TYPO3_MODE') or die();

// CType image_ldp_institutions
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_media.institutions',
        'image_ldp_institutions',
        'content-image'
    ],
    'image',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['image_ldp_institutions'] = $GLOBALS['TCA']['tt_content']['types']['image'];

// CType image_ldp_curated
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_media.imagecurated',
        'image_ldp_curated',
        'content-image'
    ],
    'image',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['image_ldp_curated'] = $GLOBALS['TCA']['tt_content']['types']['image'];

// CType menu_collections
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_media.menu_collections',
        'menu_collections',
        'content-menu-pages'
    ],
    'menu_pages',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['menu_collections'] = $GLOBALS['TCA']['tt_content']['types']['menu_pages'];


TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'Slub.SlubWebSachsendigital',
    'Media',
    'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_media.media'
);
$GLOBALS['TCA']['tt_content']['types']['list']['subtypes_addlist']['slubwebsachsendigital_media'] = 'pi_flexform';
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue('slubwebsachsendigital_media', 'FILE:EXT:slub_web_sachsendigital/Configuration/Flexforms/Media.xml');

# There's no excuse - alternative must always be set
# stupid: the overlay from the fal media does not work here if eval = required
#$GLOBALS['TCA']['sys_file_reference']['columns']['alternative']['config']['eval'] = 'required';
$GLOBALS['TCA']['sys_file_metadata']['columns']['alternative']['config']['eval'] = 'required';
