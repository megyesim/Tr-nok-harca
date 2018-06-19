function getData(url, callbackFunc) { //egy függvényt adok paraméterként
    var xhttp = new XMLHttpRequest();  //létrehozok egy új kérést a szerver felé
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    var alive = livingCharacters(userDatas); //alive - csak az élőket tartalmazza
    //console.log(livingCharacters(userDatas));  //kiíratom a livingCharacters-t
    //var sorted = sortByName(alive);
    //sortByName(alive); ha nem tárolom le, hanem csak meghívom . A sortByName-nek átadom 
    //az alive tömböt, referenciával dolgozom. Ez módosítja a tömböt.
    //az alive a sorbarendezettet fogja tartalmazni
    //console.log(sorted);
    sortByName(alive);
    // console.log(searchByName(alive, 'Jon Snow'));

    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */

    szereplok(alive);


    function EventListener() {
        var gomb = document.querySelector('#btnSearch');
        gomb.addEventListener('click', kereses);
    }

    EventListener();


    function EventListener2() {
        var starWarsHajo = document.querySelectorAll('.hajo');
        starWarsHajo.addEventListener('mouseover', fv);
    }

	EventListener2();
	
    function fv() {

        var ertek;
        var img = document.querySelector('#image');
        var nev = document.querySelector('#keresettneve');
        var bio = document.querySelector('#keresettbio');
        var haz = document.querySelector('#keresetthouse');

        for (var i = 0; i < alive.length; i++) {
            if (this.id == alive[i].id) {
                ertek = alive[i];
            }
        }

        img.setAttribute('src', ertek.picture);
        nev.innerHTML = 'Név: ' + ertek.name;
        bio.innerHTML = 'Történet: ' + ertek.bio;
        haz.innerHTML = 'Ház: ' + ertek.house;
    }


    function kereses() {
        console.log(alive);
        var charactername = document.getElementById('search').value;
        var szoveg = '';
        var talalat = 0;
		
		
		
		
		
        for (var i = 0; i < alive.length; i++) {
            if (alive[i].name.toLowerCase() == charactername.toLowerCase()) {
                // if (alive[i].name.toLowerCase().indexOf(charactername.toLowerCase()) != -1) {
                talalat = 1;

                var img = document.querySelector('#image');
                var nev = document.querySelector('#keresettneve');
                var bio = document.querySelector('#keresettbio');
                var haz = document.querySelector('#keresetthouse');
                //   var hazkepecske = document.querySelector('#hazkep');

                img.setAttribute("src", alive[i].picture);  //img tag attributumához teszem az src-t, mivel még nem volt ilyen tulajdonsága
                //  img.classList.add('jobbkep');
                nev.innerHTML = 'Név: ' + alive[i].name;
                bio.innerHTML = 'Történet: ' + alive[i].bio;
                haz.innerHTML = 'Ház: ' + alive[i].house;
                // img.setAttribute("src", alive[i].picture);
            }
        }
        if (talalat == 0) {
            szoveg = "nincs találat";
        }
    }

    function livingCharacters(characters) {
        var live = [];
        for (var i in characters) {
            if (characters[i].dead === '') {
                //if(!characters[i].dead) {   ez ugyanaz, mint az előző sor
                live.push(characters[i]);
            }
        }
        return live;
    }

    function sortByName(characters) {
        var i = characters.length - 1;
        var tmp;
        var swap = false;
        var db = 0;
        do {
            swap = false;
            for (var j = 0; j < i; j++) {
                db++;
                if (characters[j].name > characters[j + 1].name) {
                    tmp = characters[j];  //az eredeti tömbünket ez a 3 sor módosította
                    characters[j] = characters[j + 1];
                    characters[j + 1] = tmp;
                    swap = true;
                }
            }
            //console.log(db);
            i--;
        } while (i >= 0 && swap)
        return characters;
    }


    function szereplok(tomb) {
        for (var i = 0; i < tomb.length; i++) {

            var caracter = document.getElementById('bal'); //a bal divete változóba rakom 

            var divecske = document.createElement('div'); //a bal divhez divet adok divecske néven
            divecske.setAttribute("id", tomb[i].id); //a divecskéhez a tömb id-t adjuk hozzá, ami az i értékét veszi fel

            divecske.setAttribute("class", 'elo'); //pluszba hozzárakok egy osztályt
            caracter.appendChild(divecske); //a divecskét hozzáadom a bal divhez
            divecske.addEventListener('click', fv); //minden divecskéhez hozzárendeli az addEventListenert

            var kep = document.createElement('img');  //a képemet a kep változóba helyezem, node
            var nev = document.createElement('p');  //a nevet a p node-ba írja

            kep.setAttribute("src", tomb[i].portrait); //a képeket az attribbal hozzáadom a kep node-hoz
            kep.classList.add('Ferikep');
            divecske.appendChild(kep); //a képet hozzáadom a divecskéhez

            nev.innerHTML = tomb[i].name;  //kiíratom a neveket a p node-hoz
            divecske.appendChild(nev);  //a nevet a divecskéhez adom
        }
    }

    function searchByName(characters, searchString) {
        for (var i in characters) {
            if (characters[i].name.toLowerCase() === searchString.toLowerCase()) {
                return characters[i];
            }
        }
        return 'nincs találat';
    }

    function tombKiiratas(tomb) {

        alive[0].nev = alive[0].name;
        delete alive[0].name;
    }


    function szereploTorles() {
        for (var i = 0; i < alive.length; i++) {
            if (alive[i].name == "Theon Greyjoy") {
                alive.splice(i, 0);
                break;
            }
        }
    }

    /* Boti verzió 
        var array = [2, 5, 9];
        var index = array.indexOf(5); // megmondja az 5 indexét
        if (index > -1) {
        array.splice(index, 1); // kivág az indexedik elemtől 1-et. Módosítja az eredeti tömböt (nem úgy mint a slice)
        }
        // array = [2, 9]
    */

    /* Botié átírva
    function szereploTorles() {
            var index = alive.indexOf("Theon Greyjoy"); 
            if (index > -1) {
            alive.splice(index, 1); 
            }
    }
    

    function haznelkuliek() {
        for (var i = 0; i < alive.length; i++) {
            if (alive[i].house == "") {
                alive[i].house = "nincs háza";
            }
        }
    }

    haznelkuliek();
    /*Botié háznélküliekre 
 
     function haznelkuliek() {
        for (var i = 0; i < alive.length; i++) {
            if (!alive[i].house) {
                alive[i].house=="nincs háza";
            }
    }
 
    /* törölje ki a háznélkülieket 
    function haznelkuliekTorlese() {
        for (var i = 0; i < alive.length; i++) {
            if (alive[i].house == "") {
                alive.splice(i, 0);
            }
        }
    }
*/

    //console.log(Object.keys(alive[0]));
    // console.log(alive[0]);

    //tombKiiratas(alive);
    //console.log(tombKiiratas(alive[0]));
    //console.log(Object.keys(alive[0]));
}




// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */