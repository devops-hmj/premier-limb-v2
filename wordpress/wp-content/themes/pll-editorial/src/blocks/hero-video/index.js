/**
 * pll/hero-video — editor registration.
 *
 * The editor canvas shows the dark stage with the editable inner blocks
 * (top metadata, kicker, headline, deck). The video itself only plays on
 * the front end; the inspector manages the video/poster URLs.
 */
import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( { attributes, setAttributes } ) => {
		const { videoUrl, posterUrl } = attributes;
		const blockProps = useBlockProps( {
			style: {
				background:
					'radial-gradient(120% 80% at 70% 20%, rgba(120,170,200,0.45), transparent 60%), radial-gradient(90% 70% at 20% 90%, rgba(37,74,93,0.85), transparent 55%), linear-gradient(135deg, #1a3441 0%, #254a5d 45%, #0e2733 100%)',
				color: '#fff',
				padding: '32px',
			},
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Video', 'pll-editorial' ) }>
						<TextControl
							label={ __( 'Video URL (mp4)', 'pll-editorial' ) }
							value={ videoUrl }
							onChange={ ( value ) =>
								setAttributes( { videoUrl: value } )
							}
							help={ __(
								'Media-library URL of the background video. Leave empty to show the gradient placeholder only.',
								'pll-editorial'
							) }
						/>
						<TextControl
							label={ __( 'Poster URL', 'pll-editorial' ) }
							value={ posterUrl }
							onChange={ ( value ) =>
								setAttributes( { posterUrl: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<p
						style={ {
							fontFamily: 'JetBrains Mono, monospace',
							textTransform: 'uppercase',
							letterSpacing: '0.2em',
							fontSize: 10,
							opacity: 0.7,
							margin: 0,
						} }
					>
						{ __(
							'Hero video stage — video plays on the front end',
							'pll-editorial'
						) }
					</p>
					<InnerBlocks />
				</div>
			</>
		);
	},
	save: () => <InnerBlocks.Content />,
} );
