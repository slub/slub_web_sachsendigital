<?php
namespace Slub\SlubWebSachsendigital\Controller;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2017 Alexander Bigga <alexander.bigga@slub-dresden.de>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/
use TYPO3\CMS\Core\Context\Context;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Localization\LocalizationFactory;
use TYPO3\CMS\Extbase\Utility\LocalizationUtility;

class MediaController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * action video
     *
     * @return void
     */
    public function videoAction() {
        $pageSettings = $this->configurationManager->getConfiguration($this->configurationManager::CONFIGURATION_TYPE_FULL_TYPOSCRIPT);
        $pageSettings = $pageSettings['page.']['10.']['settings.'];
        $pageSettings = GeneralUtility::removeDotsFromTS($pageSettings);

        // Thanks https://gist.github.com/fedetibaldo/83881a8d61edc3c54c83f2f1b23fa8b2
        // TODO: Avoid the deprecated global TYPO3_REQUEST, probably using dependency injection after migrating to TYPO3 v10
        //       See https://docs.typo3.org/m/typo3/reference-coreapi/master/en-us/ApiOverview/SiteHandling/AccessingSiteConfiguration.html
        $context = GeneralUtility::makeInstance(Context::class);
        $langId = $context->getPropertyFromAspect('language', 'id');
        $site = $GLOBALS['TYPO3_REQUEST']->getAttribute('site');
        $language = $site->getLanguageById($langId);
        $locale = $language->getTwoLetterIsoCode();

        // Prepare passing translation strings to the JS frontend code. First,
        // grab the available translation keys from the translation base file
        // (without language prefix); we treat this as authoritative on which
        // keys exist in case a translated file (such as de.locallang_video.xlf)
        // is missing or adding extra keys.
        $localizationFactory = GeneralUtility::makeInstance(LocalizationFactory::class);
        $baseTranslationFile = "EXT:slub_web_sachsendigital/Resources/Private/Language/locallang_video.xlf";
        $translationKeys = array_keys($localizationFactory->getParsedData($baseTranslationFile, 'default')['default']);

        // Then translate each available key as per the selected language. This
        // also handles fallback to the default language if a key/phrase isn't
        // translated.
        $phrases = [];
        foreach ($translationKeys as $transKey) {
            $phrases[$transKey] = LocalizationUtility::translate("LLL:$baseTranslationFile:$transKey", "slub_web_sachsendigital");
        }

        $this->view->assign('lang', compact('locale', 'phrases'));

        $this->view->assign('pageSettings', $pageSettings);
    }
}
