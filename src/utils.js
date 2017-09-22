var Utils = (function () {
    var downloadHTML = function (linkID) {
        var link = document.getElementById(linkID);
        link.hidden = false;
        link.style.display = "inline-block";
        link.addEventListener("click", function () {
            var canvas = document.getElementById("mapArea");
            var table = document.getElementById("table_description");
            var tableClone = table.cloneNode(true);
            var doc = document.implementation.createHTMLDocument("DungeonMap");
            var img = document.createElement("img");
            var style = document.createElement('style');
            var head = doc.getElementsByTagName("head")[0];
            var css = "table, th, td {border-collapse: collapse;} " +
                "th, td {padding: 8px; text-align: left; border-bottom: 1px solid #ddd; width: 100%;}" +
                "td.room{ width: unset;}";
            img.src = canvas.toDataURL();
            doc.body.appendChild(img);
            doc.body.appendChild(tableClone);
            style.innerHTML = css;
            head.appendChild(style);
            link.href = "data:text/html;charset=UTF-8," + encodeURIComponent(doc.documentElement.outerHTML);
            link.download = "dungeonmap.html";
        }, false);
    };
    var donwloadCSV = function (linkID, csv, fileName) {
        var csvFile = new Blob([csv], { type: "text/csv" });
        var link = document.getElementById(linkID);
        link.hidden = false;
        link.style.display = "inline-block";
        link.download = fileName;
        link.href = window.URL.createObjectURL(csvFile);
    };
    var downloadDescription = function (linkID, fileName) {
        var csv = [];
        var description = document.getElementById("table_description");
        var rows = description.querySelectorAll("table tr");
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);
            csv.push(row.join(","));
        }
        donwloadCSV(linkID, csv.join("\n"), fileName);
    };
    var downloadImg = function (linkID, canvas) {
        var link = document.getElementById(linkID);
        link.hidden = false;
        link.style.display = "inline-block";
        link.addEventListener("click", function () {
            link.href = canvas.toDataURL();
            link.download = "dungeonmap.png";
        }, false);
    };
    var corridorOnchange = function (e) {
        if (e.value === "1") {
            document.getElementById("roomDensity").disabled = false;
            document.getElementById("trapPercent").disabled = false;
        } else {
            document.getElementById("roomDensity").disabled = true;
            document.getElementById("trapPercent").disabled = true;
        }
    };
    var getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    var manhattan = function (dx, dy) {
        return (dx + dy);
    };
    var getRoomName = function (x) {
        return "###ROOM" + x + "###";
    };
    var addTrapDescription = function (tiles, x, y, trapDescription) {
        trapDescription[trapDescription.length] = { name: Encounter.getTrapName(trapDescription.length + 1), description: Encounter.getTrap() };
        tiles[x][y].Count = trapDescription.length;
    };
    var addRoomDescription = function (tiles, x, y, roomDescription) {
        roomDescription[roomDescription.length] = { name: getRoomName(roomDescription.length + 1), treasure: Encounter.getTreasure(), monster: Encounter.getMonster() };
        tiles[x][y].Count = roomDescription.length;
    };
    return {
        addRoomDescription: addRoomDescription,
        addTrapDescription: addTrapDescription,
        getRandomInt: getRandomInt,
        manhattan: manhattan,
        corridorOnchange: corridorOnchange,
        downloadImg: downloadImg,
        downloadDescription: downloadDescription,
        downloadHTML: downloadHTML
    }
})();