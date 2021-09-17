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
 * This is, in particular, used for exposing data defined in `Media.xml` to JavaScript.
 *
 * Converts an array of the form
 *
 * ```php
 * [
 *   '...' => [
 *     '<innerKey>' => <1>,
 *   ],
 *   '...' => [
 *     '<innerKey>' => <2>,
 *   ],
 *   ...
 * ]
 * ```
 *
 * to the JSON representation of
 *
 * ```php
 * [
 *   <1>,
 *   <2>,
 *   ...
 * ]
 * ```
 */
class T3ArrayToJsonViewHelper extends AbstractViewHelper
{
    protected $escapeOutput = false;

    public function initializeArguments()
    {
        $this->registerArgument('value', 'array', 'the array that is converted to JSON', true);
        $this->registerArgument('innerKey', 'string', 'key of the element within each item of the array', true);
    }

    public static function renderStatic(
        array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext
    ) {
        $array = array_values($arguments['value']);

        $array = array_map(function ($item) use ($arguments) {
            return $item[$arguments['innerKey']];
        }, $array);

        return json_encode($array);
    }
}
