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
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * This view helper serializes player button configuration to JSON. For share
 * buttons, it resolves 'EXT:' paths.
 */
class PlayerConfigToJsonViewHelper extends AbstractViewHelper
{
    protected $escapeOutput = false;

    public function initializeArguments()
    {
        $this->registerArgument('settings', 'array', 'the settings array that is converted to JSON', true);
    }

    public static function renderStatic(
        array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext
    ) {
        // Whitelist keys to keep out stuff such as playerTranslationsFile
        $allowedKeys = ['shareButtons', 'screenshotCaptions', 'constants'];
        $settings = array_intersect_key($arguments['settings'], array_flip($allowedKeys));

        foreach ($settings['shareButtons'] as &$button) {
            if ($button['type'] === 'image') {
                $filePath = GeneralUtility::getFileAbsFileName($button['src']);
                $webPath = PathUtility::getAbsoluteWebPath($filePath);

                $button['src'] = $webPath;
            }
        }

        return json_encode($settings);
    }
}
