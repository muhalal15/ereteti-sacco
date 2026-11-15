<?php

$page_title = 'Our routes';

include 'includes/header.php';

?>
    <main>
        <label for="route-search">Find a route or a centre</label>
   <input type="search" id="route-search" placeholder="e.g. Kibiko">
   <p id="route-count" aria-live="polite"></p>
   
        <section>
            <h2>Kiserian route</h2>
            <p>The lorry runs from 6.30am and again from 4.00pm.</p>
            <ul>
                <li>Olepolos centre</li>
                <li>Kandisi centre</li>
            </ul>
        </section>
        <section>
            <h2>Ngong route</h2>
            <p>The lorry runs from 6.00am and again from 3.30pm.</p>
            <ul>
                <li>Kibiko centre</li>
                <li>Matasia centre</li>
                <li>Oloolua centre</li>
            </ul>
        </section>
        <section>
            <h2>Rongai route</h2>
            <p>The lorry runs from 6.45am and again from 4.15pm.</p>
            <ul>
                <li>Nkaimurunya centre</li>
                <li>Kware centre</li>
            </ul>
        </section>
    </main>
  <?php include 'includes/footer.php'; ?>