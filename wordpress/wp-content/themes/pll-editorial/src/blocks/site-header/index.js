/**
 * pll/site-header — editor registration.
 *
 * The header is fully server-rendered (render.php); the editor shows a
 * faithful static preview so the Site Editor canvas reads correctly.
 */
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( { attributes, setAttributes } ) => {
		const { forceVisible } = attributes;
		const blockProps = useBlockProps( {
			style: {
				background: '#F8F6F1',
				borderBottom: '1px solid #0F1417',
				padding: '12px 24px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				fontFamily: 'Inter Tight, sans-serif',
			},
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Behavior', 'pll-editorial' ) }>
						<ToggleControl
							label={ __( 'Force visible', 'pll-editorial' ) }
							help={ __(
								'On: the bar is visible from the top of the page (inner pages). Off: it fades in after 120px of scroll (homepage, where the hero overlay nav covers the top).',
								'pll-editorial'
							) }
							checked={ forceVisible }
							onChange={ ( value ) =>
								setAttributes( { forceVisible: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<strong
						style={ {
							fontFamily: 'Newsreader, serif',
							fontWeight: 500,
							fontSize: 18,
							color: '#0F1417',
						} }
					>
						Premier Limb Lengthening
					</strong>
					<span style={ { fontSize: 11, color: '#6B6F72' } }>
						{ forceVisible
							? __( 'Sticky header · always visible · menu in inc/nav.php', 'pll-editorial' )
							: __( 'Sticky header · appears after 120px scroll · menu in inc/nav.php', 'pll-editorial' ) }
					</span>
				</div>
			</>
		);
	},
	save: () => null,
} );
