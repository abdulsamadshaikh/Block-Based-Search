<?php
/**
 * Plugin Name:       Block Based Search
 * Plugin URI:        https://www.getabdulsamad.com
 * Description:       BBS is a lightweight WordPress block that enables real-time post search via the REST API, delivering instant results for a seamless user experience.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Abdul Samad
 * Author URI:        https://www.getabdulsamad.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-based-search
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_block_based_search_block_init() {
	register_block_type( __DIR__ . '/build/block-based-search' );
}
add_action( 'init', 'create_block_block_based_search_block_init' );