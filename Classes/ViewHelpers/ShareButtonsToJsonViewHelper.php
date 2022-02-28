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
 * This view helper serializes share button configuration to JSON while also
 * resolving 'EXT:' paths.
 */
class ShareButtonsToJsonViewHelper extends AbstractViewHelper
{
    protected $escapeOutput = false;

    public static function renderStatic(
        array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext
    ) {
        $buttons = $renderChildrenClosure();

        foreach ($buttons as &$button) {
            if ($button['type'] === 'image') {
                $filePath = GeneralUtility::getFileAbsFileName($button['src']);
                $webPath = PathUtility::getAbsoluteWebPath($filePath);

                $button['src'] = $webPath;
            }
        }

        return json_encode($buttons);
    }
}
