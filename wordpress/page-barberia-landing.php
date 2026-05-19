<?php
/**
 * Template Name: Barbería El Paisa – Landing de Conversión
 *
 * Pega este archivo en la carpeta de tu tema activo:
 *   /wp-content/themes/TU-TEMA/page-barberia-landing.php
 *
 * Luego en WordPress Admin → Páginas → Barbería Landing → Atributos → Plantilla:
 *   "Barbería El Paisa – Landing de Conversión"
 *
 * La URL final será: https://tudominio.com/barberia-landing/
 * Ideal para campañas de Google Ads / Meta Ads / WhatsApp links.
 */
defined('ABSPATH') || exit;

$app_url = get_template_directory_uri() . '/newenkom-app/';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>El corte que te hace entrar diferente | Barbería El Paisa Medellín</title>
  <meta name="description" content="Barbería El Paisa: el corte que te hace entrar diferente a cualquier lugar. +500 clientes satisfechos. Garantía de satisfacción. Reservá ahora por WhatsApp.">

  <!-- Open Graph (para WhatsApp / Facebook / Instagram) -->
  <meta property="og:title" content="El corte que te hace entrar diferente | Barbería El Paisa">
  <meta property="og:description" content="+500 clientes. Garantía real. El mejor fade de Medellín. Reservá ahora.">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CO">

  <!-- Fuente Raleway -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <!-- App styles -->
  <link rel="stylesheet" href="<?php echo esc_url($app_url); ?>assets/nk-index-wp.css">

  <?php wp_head(); ?>

  <style>
    html, body { margin: 0; padding: 0; background: #050508; overflow-x: hidden; }
    #wpadminbar { position: fixed !important; }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- Redirige HashRouter a la ruta /barberia-landing -->
  <script>
    if (!window.location.hash || window.location.hash === '#/') {
      window.location.hash = '#/barberia-landing';
    }
  </script>

  <!-- App React -->
  <script type="module" src="<?php echo esc_url($app_url); ?>assets/nk-app.js"></script>

  <?php wp_footer(); ?>
</body>
</html>
