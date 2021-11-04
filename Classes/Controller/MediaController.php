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
        $langCode = $language->getTwoLetterIsoCode();
        $this->view->assign('langCode', $langCode);

        $this->view->assign('pageSettings', $pageSettings);
    }
}
