import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: () => (
		<div { ...useBlockProps() }>
			<p style={ { fontFamily: 'monospace', fontSize: 11, color: '#6B6F72' } }>
				PLL Post TOC — “In This Post” sidebar renders on the front end.
			</p>
		</div>
	),
	save: () => null,
} );
