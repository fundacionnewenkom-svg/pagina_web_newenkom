<?php
/**
 * Template Name: NewenKom – Curso IA (Landing Page)
 *
 * Pega este archivo en la carpeta de tu tema activo:
 *   /wp-content/themes/TU-TEMA/page-curso-ia.php
 *
 * Luego en WordPress Admin → Páginas → Curso IA → Atributos → Plantilla: "NewenKom – Curso IA"
 *
 * La URL final será: https://tudominio.com/#/curso-ia
 * (La app con HashRouter enruta automáticamente al componente correcto)
 */
defined('ABSPATH') || exit;

$app_url = get_template_directory_uri() . '/newenkom-app/';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curso IA para Docentes | <?php bloginfo('name'); ?></title>

  <!-- NewenKom App styles -->
  <link rel="stylesheet" href="<?php echo esc_url($app_url); ?>assets/nk-index-wp.css">

  <?php wp_head(); ?>

  <style>
    body { margin: 0; padding: 0; background: #07070f; }
    #wpadminbar { position: fixed !important; }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- Redirige el HashRouter a la ruta /curso-ia automáticamente -->
  <script>
    if (!window.location.hash || window.location.hash === '#/') {
      window.location.hash = '#/curso-ia';
    }
  </script>

  <!-- NewenKom App -->
  <script type="module" src="<?php echo esc_url($app_url); ?>assets/nk-app.js"></script>

  <?php wp_footer(); ?>
</body>
</html>
