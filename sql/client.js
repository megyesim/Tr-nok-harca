function sql(sqlText) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            refreshDocument(JSON.parse(xhttp.responseText));
        }
    };

    xhttp.open("POST", "http://127.0.0.1:3000/sql", true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        sql: sqlText
    }));
}

//Ebben a függvényben dolgozd fel a kapott objektumot: jelenítsd meg az adatokat az oldalon
function refreshDocument(jsonObject) {
    document.getElementById('content').innerText = JSON.stringify(jsonObject);
       console.log(jsonObject);
}

function loadContent() {
    var sqlText = "SELECT * from city"; //Ide írd az SQL lekérdezést
    sql(sqlText);
}

//Ide készíthetsz saját függvényket

function userLoggedIn(username) {
	 console.log(jsonObject[0].username + ' felhasználó belépési státusza: ' + jsonObject[0].logged_in)

    document.getElementById('content').innerText = JSON.stringify(jsonObject);
}
