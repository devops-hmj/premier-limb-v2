/**
 * pll/faq-item — editor registration. RichText question + free paragraph
 * answer, so non-developers manage FAQs entirely in the editor.
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( { attributes, setAttributes } ) => {
		const blockProps = useBlockProps( {
			style: { borderBottom: '1px solid #D9D5C9', padding: '16px 0' },
		} );
		return (
			<div { ...blockProps }>
				<RichText
					tagName="p"
					style={ {
						fontFamily: 'Newsreader, serif',
						fontWeight: 500,
						fontSize: 20,
						margin: 0,
					} }
					allowedFormats={ [ 'core/italic' ] }
					value={ attributes.question }
					placeholder={ __( 'Question…', 'pll-editorial' ) }
					onChange={ ( question ) => setAttributes( { question } ) }
				/>
				<div style={ { paddingLeft: 24, color: '#3A4047' } }>
					<InnerBlocks
						template={ [ [ 'core/paragraph', { placeholder: 'Answer…' } ] ] }
						allowedBlocks={ [ 'core/paragraph', 'core/list' ] }
					/>
				</div>
			</div>
		);
	},
	save: () => <InnerBlocks.Content />,
} );
