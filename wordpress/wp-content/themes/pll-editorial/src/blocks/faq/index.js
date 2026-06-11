/**
 * pll/faq — editor registration. The accordion shell; children are
 * pll/faq-item blocks which editors can add, remove, and reorder.
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: () => {
		const blockProps = useBlockProps( {
			style: { borderTop: '1px solid #0F1417' },
		} );
		return (
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ [ 'pll/faq-item' ] }
					template={ [ [ 'pll/faq-item' ] ] }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		);
	},
	save: () => <InnerBlocks.Content />,
} );
