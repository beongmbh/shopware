<?php
/**
 * Shopware 5
 * Copyright (c) shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 */

namespace Shopware\Bundle\MediaBundle\Strategy;

/**
 * Class Md5Strategy
 * @package Shopware\Bundle\MediaBundle\Strategy
 */
class Md5Strategy implements StrategyInterface
{
    /**
     * {@inheritdoc}
     */
    public function normalize($path)
    {
        // remove filesystem directories
        $path = str_replace("//", "/", $path);

        // remove everything before /media/...
        preg_match("/.*((media\/(?:archive|image|music|pdf|temp|unknown|video)(?:\/thumbnail)?).*\/(.*))/", $path, $matches);

        if (!empty($matches)) {
            return $matches[2] . "/" .$matches[3];
        }

        return $path;
    }

    /**
     * {@inheritdoc}
     */
    public function encode($path)
    {
        if (!$path || $this->isEncoded($path)) {
            return $this->substringPath($path);
        }

        $path = $this->normalize($path);

        $path = ltrim($path, "/");
        $pathElements = explode("/", $path);
        $pathInfo = pathinfo($path);
        $md5hash = md5($path);

        $realPath = array_slice(str_split($md5hash, 2), 0, 3);
        $realPath = $pathElements[0] . "/" . $pathElements[1] . "/" . join("/", $realPath) . "/" . $pathInfo['basename'];

        return $realPath;
    }

    /**
     * {@inheritdoc}
     */
    public function isEncoded($path)
    {
        return (bool) preg_match("/.*(media\/(?:archive|image|music|pdf|temp|unknown|video)(?:\/thumbnail)?\/(?:([0-9a-f]{2}\/[0-9a-f]{2}\/[0-9a-f]{2}\/)).*)/", $path);
    }

    /**
     * @param string $path
     * @return null|string
     */
    private function substringPath($path)
    {
        preg_match("/(media\/(?:archive|image|music|pdf|temp|unknown|video)(?:\/thumbnail)?\/.*)/", $path, $matches);

        return empty($matches) ? null : $matches[0];
    }
}
