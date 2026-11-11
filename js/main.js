// Ereteti Dairy Sacco - shared site script (JS Lab 3)
// Step 3: injects the same header and footer into every page.
// Step 4: delivery form checks on deliveries.html.
// Step 5: route picker with dependent values on routes.html.

var NAV_ITEMS = [
    ["index.html", "Home"],
    ["about.html", "About"],
    ["routes.html", "Our routes"],
    ["contact.html", "Contact"],
    ["register.html", "Join"],
    ["deliveries.html", "Deliveries"]
];

function setHeaderFooter(current) {
    var header = document.getElementById("site-header");
    if (header) {
        var links = "";
        var i;
        for (i = 0; i < NAV_ITEMS.length; i++) {
            if (NAV_ITEMS[i][0] === current) {
                links += '<a href="' + NAV_ITEMS[i][0] + '" class="active" aria-current="page">' + NAV_ITEMS[i][1] + "</a>";
            } else {
                links += '<a href="' + NAV_ITEMS[i][0] + '">' + NAV_ITEMS[i][1] + "</a>";
            }
        }
        header.innerHTML =
            '<div class="header-inner">' +
            '<img class="logo" src="img/logo.svg" alt="Ereteti Dairy Sacco logo" width="44" height="44">' +
            "<div><h1>Ereteti Dairy Sacco</h1>" +
            '<p class="tagline">Milk collected twice a day, on three routes out of Ngong.</p></div></div>' +
            '<nav aria-label="Main">' + links + "</nav>";

        // Step 4: mouse listeners on the header nav links.
        var navLinks = header.querySelectorAll("nav a");
        for (i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener("mouseenter", function () {
                this.classList.add("hovering");
            });
            navLinks[i].addEventListener("mouseleave", function () {
                this.classList.remove("hovering");
            });
        }
    }

    var footer = document.getElementById("site-footer");
    if (footer) {
        footer.innerHTML =
            "<p>Ereteti Dairy Sacco, PO Box 4021, Ngong.</p>" +
            "<p>Site built by Abdullatif Mohamed, DBT Year 1, 2026.</p>";
    }
}

// ---- Step 4: delivery checks (deliveries.html) ----

function checkMemberNumber(value) {
    if (!value || value.trim() === "") {
        return { ok: false, message: "Member number is required." };
    }
    if (!/^ER-\d{4}$/.test(value.trim())) {
        return { ok: false, message: "Member number must be in the form ER-0001." };
    }
    return { ok: true, message: "Member number OK." };
}

function checkLitres(value) {
    if (value === null || value === undefined || String(value).trim() === "") {
        return { ok: false, message: "Litres are required." };
    }
    var litres = Number(value);
    if (isNaN(litres)) {
        return { ok: false, message: "Litres must be a number." };
    }
    if (litres <= 0) {
        return { ok: false, message: "Litres must be more than zero." };
    }
    if (litres > 50) {
        return { ok: false, message: "Litres look too high for one delivery (maximum 50)." };
    }
    return { ok: true, message: "Litres OK." };
}

function validateDelivery() {
    var member = document.getElementById("d-member");
    var litres = document.getElementById("d-litres");
    var route = document.getElementById("d-route");
    var msg = document.getElementById("deliver-msg");
    if (!member || !litres || !route || !msg) {
        return false;
    }

    var memberCheck = checkMemberNumber(member.value);
    if (!memberCheck.ok) {
        msg.textContent = memberCheck.message;
        msg.className = "form-msg error";
        return false;
    }

    var litresCheck = checkLitres(litres.value);
    if (!litresCheck.ok) {
        msg.textContent = litresCheck.message;
        msg.className = "form-msg error";
        return false;
    }

    if (route.value === "") {
        msg.textContent = "Please choose a route.";
        msg.className = "form-msg error";
        return false;
    }

    msg.textContent = "Delivery OK: member " + member.value.trim() + ", " +
        Number(litres.value).toFixed(2) + " litres, " + route.value + " route.";
    msg.className = "form-msg ok";
    return true;
}

// Called by the inline onsubmit on the deliveries form.
function onDeliver(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    return validateDelivery();
}

// ---- Step 5: route picker (routes.html) ----

var ROUTE_DATA = {
    kiserian: { name: "Kiserian route", morning: "6.30am", evening: "4.00pm", centres: ["Olepolos centre", "Kandisi centre"] },
    ngong: { name: "Ngong route", morning: "6.00am", evening: "3.30pm", centres: ["Kibiko centre", "Matasia centre", "Oloolua centre"] },
    rongai: { name: "Rongai route", morning: "6.45am", evening: "4.15pm", centres: ["Nkaimurunya centre", "Kware centre"] }
};

function formatDate(date) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
}

function showRoute(key) {
    var data = ROUTE_DATA[key];
    var name = document.getElementById("route-name");
    var times = document.getElementById("route-times");
    var centres = document.getElementById("route-centres");
    var dateLine = document.getElementById("route-date");
    if (!data || !name || !times || !centres) {
        return;
    }
    name.textContent = data.name;
    times.textContent = "The lorry runs from " + data.morning + " and again from " + data.evening + ".";
    centres.textContent = "";
    for (var i = 0; i < data.centres.length; i++) {
        var item = document.createElement("li");
        item.textContent = data.centres[i];
        centres.appendChild(item);
    }
    if (dateLine) {
        dateLine.textContent = "Collections for today, " + formatDate(new Date()) + ":";
    }
}

// ---- Page setup ----

document.addEventListener("DOMContentLoaded", function () {
    var page = window.location.pathname.split("/").pop();
    if (!page) {
        page = "index.html";
    }
    setHeaderFooter(page);

    // Deliveries page: second listener kind, on the "Check values only" button.
    var checkButton = document.getElementById("deliver-check");
    if (checkButton) {
        checkButton.addEventListener("click", function () {
            validateDelivery();
        });
    }

    // Routes page: dependent values follow the picker.
    var picker = document.getElementById("route-picker");
    if (picker) {
        picker.addEventListener("change", function () {
            showRoute(picker.value);
        });
        showRoute(picker.value);
    }
});
