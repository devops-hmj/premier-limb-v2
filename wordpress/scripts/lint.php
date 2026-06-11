<?php
/**
 * Parse-check every .php file mounted at /lint-src (run inside Playground by
 * php-syntax-check.mjs). token_get_all(TOKEN_PARSE) compiles without
 * executing — the same check `php -l` performs.
 *
 * @package pll-tooling
 */

$pll_iterator = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( '/lint-src', FilesystemIterator::SKIP_DOTS ) );
$pll_checked  = 0;
$pll_failed   = 0;
$pll_errors   = '';

foreach ( $pll_iterator as $pll_file ) {
	if ( ! $pll_file->isFile() || substr( $pll_file->getFilename(), -4 ) !== '.php' ) {
		continue;
	}
	$pll_path = $pll_file->getPathname();
	if ( false !== strpos( $pll_path, '/build/' ) || false !== strpos( $pll_path, 'node_modules' ) || false !== strpos( $pll_path, '/vendor/' ) ) {
		continue;
	}
	++$pll_checked;
	try {
		token_get_all( file_get_contents( $pll_path ), TOKEN_PARSE );
	} catch ( ParseError $pll_e ) {
		++$pll_failed;
		$pll_errors .= 'PARSE ERROR: ' . $pll_path . ' line ' . $pll_e->getLine() . ': ' . $pll_e->getMessage() . "\n";
		echo 'PARSE ERROR: ' . $pll_path . ' line ' . $pll_e->getLine() . ': ' . $pll_e->getMessage() . "\n";
	}
}

echo $pll_checked . ' files checked, ' . $pll_failed . " parse failures\n";

// run-blueprint does not pipe runPHP stdout back to the host terminal;
// report through the bidirectional /lint-scripts mount instead.
file_put_contents( '/lint-scripts/.lint-result.txt', $pll_checked . ' files checked, ' . $pll_failed . " parse failures\n" . $pll_errors );
if ( $pll_failed ) {
	exit( 1 );
}
