<?php
namespace Slub\SlubWebSachsendigital\ViewHelpers;

/**
 * (c) Kitodo. Key to digital objects e.V. <contact@kitodo.org>
 *
 * This file is part of the Kitodo and TYPO3 projects.
 *
 * @license GNU General Public License version 3 or later.
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 */
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Localization\LocalizationFactory;
use TYPO3\CMS\Extbase\Utility\LocalizationUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * This view helper collects translation keys from a specified XLIFF file and
 * translates these using the current language. It is meant to facilitate
 * passing translations to JS frontend code.
 *
 * The result object has the following properties:
 * - locale: Locale identifier of current site language
 * - twoLetterIsoCode: Two-letter ISO code of current site language
 * - phrases: Object that maps translation keys to their translations
 */
class TranslationsViewHelper extends AbstractViewHelper
{
    protected $escapeOutput = false;

    public function initializeArguments()
    {
        $this->registerArgument(
            'baseFile',
            'string',
            'Path to the XLIFF file used for determining translation keys. Typically, this should be a translation file without language prefix.',
            true
        );
    }

    public static function renderStatic(
        array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext
    ) {
        $baseTranslationFile = $arguments['baseFile'];

        $language = $GLOBALS['TYPO3_REQUEST']->getAttribute('language');
        $languageKey = $language->getTypo3Language();

        // Grab available translation keys from the specified file
        $localizationFactory = GeneralUtility::makeInstance(LocalizationFactory::class);
        $translationKeys = array_keys($localizationFactory->getParsedData($baseTranslationFile, 'default')['default']);

        // Translate each available key as per the current language.
        // - This falls back to default language if a key isn't translated
        // - Pass $languageKey to ensure that translation matches ISO code
        $phrases = [];
        foreach ($translationKeys as $transKey) {
            $phrases[$transKey] = LocalizationUtility::translate(
                "LLL:$baseTranslationFile:$transKey",
                /* extensionName= */ null,
                /* arguments= */ null,
                $languageKey
            );
        }

        return [
            'locale' => $language->getLocale(),
            'twoLetterIsoCode' => $language->getTwoLetterIsoCode(),
            'phrases' => $phrases,
        ];
    }
}
