<?php

defined('TYPO3_MODE') or die();

return [
    'ctrl' => [
        'label' => 'title',
        'sortby' => 'sorting',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'cruser_id' => 'cruser_id',
        'title' => 'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_slider.items',
        'typeicon_column' => 'CType',
        'typeicon_classes' => [
            'default' => 'SachsendigitalWebsiteSlider'
        ],
        'delete' => 'deleted',
        'versioningWS' => true,
        'origUid' => 't3_origuid',
        'hideAtCopy' => FALSE,
        'prependAtCopy' => '',
        'transOrigPointerField' => 'l10n_parent',
        'transOrigDiffSourceField' => 'l10n_diffsource',
        'languageField' => 'sys_language_uid',
        'dividers2tabs' => TRUE,
        'enablecolumns' => [
            'disabled' => 'hidden',
            'starttime' => 'starttime',
            'endtime' => 'endtime',
        ],
    ],
    'types' => [
        '1' => ['showitem' => '
            --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            title,subtitle,url,image,
            --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:visibility;visibility,
            --palette--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access;access,

        '],
    ],
    'palettes' => [
        '1' => [
            'showitem' => ''
        ],
        'access' => [
            'showitem' => '
                starttime;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:starttime_formlabel,
                endtime;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:endtime_formlabel,
            ',
            'canNotCollapse' => 1
        ],
        'visibility' => [
            'showitem' => '
                hidden;,
            ',
            'canNotCollapse' => 1
        ],
    ],
    'columns' => [
        'tt_content' => [
            'exclude' => 0,
            'label' => 'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_slider',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'foreign_table' => 'tt_content',
                'foreign_table_where' => 'AND tt_content.pid=###CURRENT_PID### AND tt_content.CType="tx_sachsendigital_slider"',
                'maxitems' => 1,
            ],
        ],
        'hidden' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.hidden',
            'config' => [
                'type' => 'check',
                'items' => [
                    '1' => [
                        '0' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:hidden.I.0'
                    ]
                ]
            ]
        ],
        'starttime' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.starttime',
            'config' => [
                'type' => 'input',
                'size' => '13',
                'max' => '20',
                'eval' => 'datetime',
                'default' => '0',
                'renderType' => 'inputDateTime'
            ],
            'l10n_mode' => 'exclude',
            'l10n_display' => 'defaultAsReadonly'
        ],
        'endtime' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.endtime',
            'config' => [
                'type' => 'input',
                'size' => '13',
                'max' => '20',
                'eval' => 'datetime',
                'default' => '0',
                'range' => [
                    'upper' => mktime(0, 0, 0, 12, 31, 2040)
                ],
                'renderType' => 'inputDateTime'
            ],
            'l10n_mode' => 'exclude',
            'l10n_display' => 'defaultAsReadonly'
        ],
        'title' => [
            'exclude' => 0,
            'label' => 'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_slider.slide.title',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim,required',
            ],
        ],
        'subtitle' => [
            'exclude' => 0,
            'label' => 'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_slider.slide.subtitle',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim',
            ],
        ],
        'url' => [
            'exclude' => 0,
            'label' => 'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_slider.slide.link',
            'config' => [
                'type' => 'input',
                'renderType' => 'inputLink',
            ],
        ],
        'image' => [
            'exclude' => 0,
            'label' => 'LLL:EXT:slub_web_sachsendigital/Resources/Private/Language/locallang.xlf:tx_slubwebsachsendigital_slider.slide.image',
            'config' => TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig(
                'image',
                [
                    'overrideChildTca' => [
                        'types' => [
                            \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                                'showitem' => '--palette--;LLL:EXT:core/Resources/Private/Language/locallang_tca.xlf:sys_file_reference.imageoverlayPalette;imageoverlayPalette,--palette--;;filePalette'
                            ],
                        ]
                    ],
                    'minitems' => 0,
                    'maxitems' => 1,
                    'fileUploadAllowed' => TRUE,
                ],
                $GLOBALS['TYPO3_CONF_VARS']['SYS']['mediafile_ext']
            ),
        ]
    ]
];
