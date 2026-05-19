<?php
/**
 * Template Name: Barbería El Paisa – Página Principal
 *
 * Pega este archivo en la carpeta de tu tema activo:
 *   /wp-content/themes/TU-TEMA/page-barberia-paisa.php
 *
 * Luego en WordPress Admin → Páginas → Barbería El Paisa → Atributos → Plantilla:
 *   "Barbería El Paisa – Página Principal"
 *
 * La URL final será: https://tudominio.com/barberia-el-paisa/
 */
defined('ABSPATH') || exit;

$app_url = get_template_directory_uri() . '/newenkom-app/';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Barbería El Paisa – Medellín | <?php bloginfo('name'); ?></title>
  <meta name="description" content="Barbería El Paisa, tu barbería premium en Medellín. Cortes clásicos, fade, arreglo de barba. +10 años de experiencia. Reservá por WhatsApp.">

  <!-- Fuente Raleway -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <!-- App styles -->
  <link rel="stylesheet" href="<?php echo esc_url($app_url); ?>assets/nk-index-wp.css">

  <?php wp_head(); ?>

  <style>
    html, body { margin: 0; padding: 0; background: #05050c; overflow-x: hidden; }
    #wpadminbar { position: fixed !important; }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- Redirige HashRouter a la ruta /barberia-paisa -->
  <script>
    if (!window.location.hash || window.location.hash === '#/') {
      window.location.hash = '#/barberia-paisa';
    }
  </script>

  <!-- App React -->
  <script type="module" src="<?php echo esc_url($app_url); ?>assets/nk-app.js"></script>

  <?php wp_footer(); ?>
</body>
</html>
