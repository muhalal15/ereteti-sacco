<?php
require __DIR__ . '/includes/db.php';
$sql = "SELECT f.member_no, f.first_name, f.last_name, d.session, d.litres, d.accepted FROM milk_delivery d JOIN farmer f ON f.farmer_id = d.farmer_id WHERE d.delivery_date = '2026-10-12' ORDER BY f.last_name, f.first_name, d.session";
$result = $conn->query($sql);
$totalSql = "SELECT SUM(litres) AS total FROM milk_delivery WHERE delivery_date = '2026-10-12' AND accepted = 1";
$totalResult = $conn->query($totalSql);
$totalRow = $totalResult->fetch_assoc();
$totalLitres = $totalRow['total'] === null ? 0 : (float) $totalRow['total'];
$totalKsh = (int) round($totalLitres * 55);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deliveries - Ereteti Dairy Sacco</title>
    <link rel="icon" href="img/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <header id="site-header"></header>
<main>
    <h2>Deliveries</h2>
    <p>
         Milk received at the Olepolos centre on the Kiserian route,
              Monday 12 October 2026. Both sessions are listed: the
              morning collection from 6.30am and the evening collection
              from 4.00pm.
    </p>
    <div class="table-wrap">
    <table>
      <caption>Milk received, Monday 12 October 2026</caption>
  <thead>
    <tr>
      <th scope="col">Member</th>
      <th scope="col">Farmer</th>
      <th scope="col">Session</th>
      <th scope="col">Litres</th>
      <th scope="col">Accepted</th>
    </tr>
  </thead>
        <tbody>
            <?php while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= htmlspecialchars($row['member_no']) ?></td>
                <td><?= htmlspecialchars(ucfirst($row['first_name']) . ' ' . ucfirst($row['last_name'])) ?></td>
                <td><?= htmlspecialchars(ucfirst(strtolower($row['session']))) ?></td>
                <td><?= $row['litres'] ?></td>
                <td><?= yes_no($row['accepted']) ?></td>
            </tr>
            <?php endwhile; ?>
        </tbody>
        <tfoot>
        <tr>
        <th colspan="4" scope="row">Accepted today</th>
        <td id="accepted-total"></td>
        </tr>
        </tfoot>
    </table>
    </div>

    <section>
        <h2>Test a delivery entry</h2>
        <p>Use this form to test the delivery checks. Nothing is sent to a server.</p>
        <form id="deliver-form" action="#" method="post" onsubmit="return onDeliver(event)">
            <label for="d-member">Member number</label>
            <input type="text" id="d-member" name="member_number" placeholder="ER-0001">

            <label for="d-litres">Litres</label>
            <input type="number" id="d-litres" name="litres" step="0.01" min="0" placeholder="5.50">

            <label for="d-route">Route</label>
            <select id="d-route" name="route">
                <option value="">Choose a route</option>
                <option value="Kiserian">Kiserian</option>
                <option value="Ngong">Ngong</option>
                <option value="Rongai">Rongai</option>
            </select>

            <button type="submit">Record delivery (test)</button>
            <button type="button" id="deliver-check">Check values only</button>
            <p class="form-msg" id="deliver-msg" aria-live="polite"></p>
        </form>
    </section>
</main>

<footer id="site-footer"></footer>
<script src="js/main.js"></script>
<script src="js/tests.js"></script>
<script>
    document.getElementById('accepted-total').textContent = 'KSh <?= number_format($totalKsh) ?>';
</script>
</body>
</html>
