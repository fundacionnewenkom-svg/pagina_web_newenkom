<?php
/**
 * Template Name: NewenKom – Página Principal
 *
 * Pega este archivo en la carpeta de tu tema activo:
 *   /wp-content/themes/TU-TEMA/page-home.php
 *
 * Luego en WordPress Admin → Páginas → Inicio → Atributos → Plantilla: "NewenKom – Página Principal"
 *
 * IMPORTANTE: La carpeta "newenkom-app" debe estar subida a:
 *   /wp-content/themes/TU-TEMA/newenkom-app/
 */
defined('ABSPATH') || exit;

$app_url = get_template_directory_uri() . '/newenkom-app/';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>

  <!-- NewenKom App styles -->
  <link rel="stylesheet" href="<?php echo esc_url($app_url); ?>assets/nk-index-wp.css">

  <?php wp_head(); ?>

  <style>
    /* Oculta header/footer del tema para página fullscreen */
    body { margin: 0; padding: 0; background: #07070f; }
    #wpadminbar { position: fixed !important; }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- NewenKom App (HashRouter: navega a /#/ para Home) -->
  <script type="module" src="<?php echo esc_url($app_url); ?>assets/nk-app.js"></script>

  <?php wp_footer(); ?>
</body>
</html>
