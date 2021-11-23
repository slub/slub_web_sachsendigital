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

/**
 * This view helper serializes settings for video page view to JSON so that it
 * may be passed to JavaScript.
 */
class VideoToJsonViewHelper extends AbstractViewHelper
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
        $settings = $arguments['settings'];
        $movieDir = $settings['movieDir'];

        $result = [
            'chapters' => array_map(function ($item) {
                return $item['chapter'];
            }, array_values($settings['chapters'])),

            'metadata' => [
                'metadata' => [
                    'title' => [$settings['media']],
                ],

                'screenshotFields' => [
                    'title',
                ],
            ],

            'url' => [
                'mpd' => "https://media.sachsen.digital/$movieDir/$movieDir.mpd",
                // TODO: This assumes the HLS playlist exists, which currently it may not...
                'hls' => "https://media.sachsen.digital/$movieDir/$movieDir.m3u8",
                'poster' => "https://media.sachsen.digital/$movieDir/$movieDir.jpg",
            ],
        ];

        return json_encode($result);
    }
}
