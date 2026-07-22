/**
 * "SEO (PLL)" document panel: edit per-page title, meta description, and
 * Open Graph title/description from the block editor. Writes the same post
 * meta the front end reads (pll_seo_value), which now takes precedence over
 * the curated defaults. Built on wp.* globals so the plugin needs no bundler.
 */
( function ( wp ) {
	if ( ! wp || ! wp.plugins || ! wp.element || ! wp.data || ! wp.coreData ) {
		return;
	}

	var registerPlugin = wp.plugins.registerPlugin;
	var PluginDocumentSettingPanel =
		( wp.editor && wp.editor.PluginDocumentSettingPanel ) ||
		( wp.editPost && wp.editPost.PluginDocumentSettingPanel );
	if ( ! registerPlugin || ! PluginDocumentSettingPanel ) {
		return;
	}

	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var useSelect = wp.data.useSelect;
	var useEntityProp = wp.coreData.useEntityProp;
	var TextControl = wp.components.TextControl;
	var TextareaControl = wp.components.TextareaControl;

	function field( meta, setMeta, Control, key, label, help ) {
		return el( Control, {
			label: label,
			help: help,
			value: ( meta && meta[ key ] ) || '',
			onChange: function ( value ) {
				var next = Object.assign( {}, meta );
				next[ key ] = value;
				setMeta( next );
			},
		} );
	}

	function Panel() {
		try {
			var postType = useSelect( function ( select ) {
				var editor = select && select( 'core/editor' );
				return ( editor && typeof editor.getCurrentPostType === 'function' ) ? editor.getCurrentPostType() : null;
			}, [] );
			if ( ! postType ) {
				return null;
			}
			var entity = useEntityProp( 'postType', postType, 'meta' );
			if ( ! entity || ! entity[ 0 ] || typeof entity[ 1 ] !== 'function' ) {
				return null;
			}
			var meta = entity[ 0 ];
			var setMeta = entity[ 1 ];

			return el(
				PluginDocumentSettingPanel,
				{
					name: 'pll-seo',
					title: __( 'SEO (PLL)', 'pll-seo' ),
					className: 'pll-seo-panel',
				},
				field( meta, setMeta, TextControl, '_pll_seo_title', __( 'SEO title', 'pll-seo' ), __( 'Blank uses the theme default for this page.', 'pll-seo' ) ),
				field( meta, setMeta, TextareaControl, '_pll_seo_description', __( 'Meta description', 'pll-seo' ) ),
				field( meta, setMeta, TextControl, '_pll_og_title', __( 'Open Graph title', 'pll-seo' ), __( 'Falls back to the SEO title.', 'pll-seo' ) ),
				field( meta, setMeta, TextareaControl, '_pll_og_description', __( 'Open Graph description', 'pll-seo' ) )
			);
		} catch ( err ) {
			return null;
		}
	}

	registerPlugin( 'pll-seo-panel', { render: Panel, icon: 'search' } );
} )( window.wp );
