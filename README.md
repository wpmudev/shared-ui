# Shared UI
For internal use in [WPMU DEV](https://wpmudev.org) plugins.

## Usage

```
npm install @wpmudev/shared-ui
```

Depending on your plugin's requirements, you can either include the whole production ready css and js files or explicitly import needed sass partials & individual js components into your plugins build (recommended).

### Requirements

In order to avoid conflicts with other versions of this library, we are using a versioned body class in the format `.sui-x-x-x` where hyphens are replacing the periods of the current shared-ui package version.

```php
add_filter( 'body_class', 'plugin_body_classes' );
function plugin_body_classes( $classes ) {

	$classes[] = 'sui-2-0-0';

	return $classes;

}
```

## Contributing
Please read through our [contributing guidelines](https://github.com/wpmudev/shared-ui/blob/master/CONTRIBUTING.md).

Editor preferences are available in the editor config for easy use in common text editors. Read more and download plugins at <http://editorconfig.org/>.
