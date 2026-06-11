import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: () => (
		<div { ...useBlockProps() }>
			<p style={ { fontFamily: 'monospace', fontSize: 11, color: '#6B6F72' } }>
				PLL Legal Page Header — masthead renders on the front end from page
				meta.
			</p>
		</div>
	),
	save: () => null,
} );
