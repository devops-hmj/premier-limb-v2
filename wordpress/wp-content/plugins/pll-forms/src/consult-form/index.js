/**
 * pll/consult-form — editor registration. Static preview; the inspector
 * exposes the pre-launch emergency-disclaimer toggle (HIPAA audit item).
 */
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( { attributes, setAttributes } ) => (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Scheduling', 'pll-forms' ) }>
					<TextControl
						label={ __( 'Booking calendar URL', 'pll-forms' ) }
						help={ __(
							'Optional. Paste your GoHighLevel calendar/booking page URL. On a successful submission the visitor is sent there with first name, last name, email, and phone prefilled. Leave blank to show the inline "Request Received" message instead.',
							'pll-forms'
						) }
						type="url"
						inputMode="url"
						placeholder="https://api.leadconnectorhq.com/widget/booking/…"
						value={ attributes.calendarUrl }
						onChange={ ( value ) =>
							setAttributes( { calendarUrl: value } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Compliance', 'pll-forms' ) }>
					<ToggleControl
						label={ __( 'Show emergency disclaimer', 'pll-forms' ) }
						help={ __(
							'Displays the "Do not use this form for medical emergencies — call 911" notice above the form. The HIPAA audit requires this at launch.',
							'pll-forms'
						) }
						checked={ attributes.showEmergencyDisclaimer }
						onChange={ ( value ) =>
							setAttributes( { showEmergencyDisclaimer: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					style: {
						border: '1px solid #0F1417',
						background: '#FFFFFF',
						padding: 24,
					},
				} ) }
			>
				<p
					style={ {
						fontFamily: 'JetBrains Mono, monospace',
						textTransform: 'uppercase',
						letterSpacing: '0.22em',
						fontSize: 10.5,
						color: '#254A5D',
						margin: 0,
					} }
				>
					{ __( 'Consultation Request — form renders on the front end', 'pll-forms' ) }
				</p>
			</div>
		</>
	),
	save: () => null,
} );
