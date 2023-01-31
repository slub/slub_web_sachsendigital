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

// CType menu_selected_collections
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital.menu_selected_collections',
        'menu_selected_collections',
        'content-menu-pages'
    ],
    'menu_pages',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['menu_selected_collections'] = $GLOBALS['TCA']['tt_content']['types']['menu_pages'];

// CType tx_sachsendigital_slider
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_slider',
        'tx_slubwebsachsendigital_slider',
        'SachsendigitalWebsiteSlider'
    ],
    'html',
    'after'
);

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

// Register icon class and setup slider backend appearance
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['tx_slubwebsachsendigital_slider'] = 'SachsendigitalWebsiteSlider';
$GLOBALS['TCA']['tt_content']['types']['tx_slubwebsachsendigital_slider']['showitem'] = '
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.general;general,--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.headers;headers,
    tx_slubwebsachsendigital_slider,
    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,--palette--;;frames,--palette--;;appearanceLinks,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,--palette--;;language,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,--palette--;;hidden,--palette--;;access,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:categories,categories,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:notes,rowDescription,
    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:extended
';

// Add new TCA column for the slider items
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'tx_slubwebsachsendigital_slider' => [
        'label' => 'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_slider.items',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tx_slubwebsachsendigital_slider',
            'foreign_field' => 'tt_content',
            'appearance' => [
                'useSortable' => TRUE,
                'showSynchronizationLink' => TRUE,
                'showAllLocalizationLink' => TRUE,
                'showPossibleLocalizationRecords' => TRUE,
                'expandSingle' => TRUE,
                'enabledControls' => [
                    'localize' => TRUE,
                ],
            ],
            'behaviour' => [
                'localizationMode' => 'select',
                'mode' => 'select'
            ]
        ]
    ]
]);
