import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( { attributes } ) => (
		<div { ...useBlockProps() }>
			<p style={ { fontFamily: 'monospace', fontSize: 11, color: '#6B6F72' } }>
				PLL Surgery Topics ({ attributes.variant }) — renders on the front
				end.
			</p>
		</div>
	),
	save: () => null,
} );
