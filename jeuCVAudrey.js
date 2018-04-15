//////////<<< CHARGEMENT DE TOUT LE DOM AVANT LE LANCEMENT DU JEU>>>//////////
      window.addEventListener('DOMContentLoaded', function(){
        //////////<<< POSITIONS DU DOC >>>//////////
              var doctor = {
                life : 3,
                score : 0,
                walkRight : ['-15px', '-75px', '-135px', '-195px', '-255px', '-315px'],
                walkLeft : ['-315px', '-255px', '-195px', '-135px', '-75px', '-15px'],
                walkBottom : ['-15px', '-75px', '-135px', '-195px', '-255px', '-315px'],
                walkTop : ['-15px', '-75px', '-135px', '-195px', '-255px','-315px'],
                throwSyringe : [
                  {
                    topImg : '-280px',
                    leftImg : '-1px',
                    widthMask : '48px',
                    heightMask : '69px'
                  },{
                    topImg :'-280px',
                    leftImg : '-91px',
                    widthMask : '48px',
                    heightMask : '69px'
                  },{
                    topImg : '-280px',
                    leftImg : '-180px',
                    widthMask : '105px',
                    heightMask : '69px'
                  }],
                throwSyringeLeft : [
                  {
                    topImg : '-349px',
                    leftImg : '-177px',
                    widthMask : '105px',
                    heightMask : '69px'
                  },{
                    topImg : '-349px',
                    leftImg : '-90px',
                    widthMask : '48px',
                    heightMask : '69px'
                  },{
                    topImg : '-349px',
                    leftImg : '-1px',
                    widthMask : '48px',
                    heightMask : '69px'
                  }
                ]
              };


        ///////////<<< VARIABLES POUR LES DIRECTIONS LORS D'UNE ACTION AVEC LE CLAVIER >>>//////////
              var toLeft = false;
              var toRight = false;
              var toTop = false;
              var toBottom = false;
              var specialAttack = false;
              var wait = false;
        //////////<<< VARIABLES DEPLACEMENT DU DOC >>>//////////
              var mask;
              var sprite;
        //////////<<< VARIABLES RELATIVES AUX DETECTIONS DE COLLISIONS >>>///////////
              var collide =false;
              var collideVirus = false;
        sprite = document.getElementById('contenu');
        mask = document.getElementById('container');
        mask.style.top = mask.style.top || '250px';
        mask.style.left = mask.style.left || '94px';
        mask.style.width = mask.style.width || '30px';
        mask.style.height = mask.style.height || '68px';

///////////<<< FONCTION INITIALISATION DE LA POSITION >>>///////////
      var initialize = function(){
        sprite.style.left = '-15px';
        sprite.style.top = '-136px';
        mask.style.width = '30px';
        mask.style.height = '68px';
      };

//////////<<< FONCTION JOUER LE THEME PRINCIPAL DU JEU : RESIDENT EVIL FOREVER ! NOT WORKING ON SAFARI 5>>>//////////
      var safari5 = window.navigator.userAgent.search('Version/5');
        if(safari5 === -1){
        var audio = new Audio('GameSounds/Resident-Evil-2-Soundtrack-The-Front-Hall-RPD.wav');
        function playTheme(){
          audio.loop=true;
          audio.play();
        };
    //////////<<< OBJETS POUR TOUS LES SONS UTILISES DANS LE JEU >>>//////////
    var gameSounds = {
      virusDie : new Audio('GameSounds/virus-die.wav'),
      doctorHurts : new Audio('GameSounds/doctor-hurts.wav'),
      collectedItem : new Audio('GameSounds/collected-item.wav'),
      youLoose :  new Audio('GameSounds/you-loose.wav'),
      youWin : new Audio('GameSounds/you-win.wav')
    };
};
//////////<<< FONCTION USINE POUR LA CREATION DES ITEMS >>>///////////
      var itemFactory = function(){
        var Itembuilder = function(w, h, source, left, top, identifiant) {
          this.width = w;
          this.height = h;
          this.src= source;
          this.x = left;
          this.y= top;
          this.name = identifiant;
        };

        Itembuilder.prototype.initialisation = function(){
          var imgItem = document.createElement('img');
          document.body.children[2].appendChild(imgItem);
          imgItem.width = this.width;
          imgItem.height = this.height;
          imgItem.src = this.src;
          imgItem.style.left = this.x;
          imgItem.style.top = this.y;
          imgItem.setAttribute("class", "items");
          imgItem.setAttribute("id", this.name);
        };

        return function(w, h, source, left, top, identifiant){
          return new Itembuilder(w, h, source, left, top, identifiant);
        };
      }();

///////////<<< FABRICATION DES ITEMS DANS LE CODE HTML >>>//////////
      var html = itemFactory(30, 30, 'GameImg/Pills-01.png', '269px', '240px', 'html');
      var javascript = itemFactory(30, 30, 'GameImg/Pills-02.png', '524px', '320px', 'javascript');
      var jquery = itemFactory(30, 30, 'GameImg/Pills-03.png', '767px', '191px', 'jquery');
      var angular = itemFactory(30, 30, 'GameImg/Pills-04.png', '1086px', '319px', 'angular');
      var photoshop = itemFactory(30, 30, 'GameImg/Pills-05.png', '1151px', '494px', 'photoshop');
      var mongo = itemFactory(30, 30, 'GameImg/Pills-06.png', '1070px', '654px', 'mongo');
      var node = itemFactory(30, 30, 'GameImg/Pills-07.png', '864px', '623px', 'node');
      var express = itemFactory(30, 30, 'GameImg/Pills-08.png', '638px', '558px', 'express');
      var ajax = itemFactory(30, 30, 'GameImg/Pills-09.png', '414px', '688px', 'ajax');
      var meteor = itemFactory(30, 30, 'GameImg/Pills-10.png', '190px', '606px', 'meteor');

      var ItemArray = [html, javascript, jquery, angular, photoshop, mongo, node, express, ajax, meteor];

      var ItemDisplay = function(){
        for (i=0 ; i< ItemArray.length ; i++){
          var newItem = ItemArray[i].initialisation();
        };
      };
      ItemDisplay();
//////////<<< CONSTRUCTION DES BALISES POUR LE LI >>>//////////
      var objectProperties = function(){
        var identifiantLi = ['ht', 'js', 'jq', 'ag', 'ps', 'db', 'nd', 'ex', 'aj', 'mt'];
        var texteLi = ['HTML5 / CSS3', 'JavaScript', 'JQuery', 'Angular', 'Photoshop', 'MongoDB', 'NodeJS', 'Express', 'Ajax', 'Meteor'];

        for(i=0 ; i<10 ; i++){
      //CREATION DES LI CORREXPONDANTES AUX ITEMS DANS LA BALISE ASIDE
          var newLi = document.createElement('li');
          var text = document.createTextNode(texteLi[i]);
          document.body.children[3].children[0].appendChild(newLi);
          document.body.children[3].children[0].children[i].appendChild(text);
          newLi.setAttribute("class", "hide");
          newLi.id = identifiantLi[i];

        };
      };
      objectProperties();
//////////<<< FONCTION USINE POUR LA CREATION DES VIRUS >>>///////////
      var virusFactory = function(){
        var VirusBuilder = function(n, w, h, min, max) { //min & max sont les valeurs à indiquer pour la valeur y de l'objet. Pour les virus de la partie haute min:110/max:238. Pour les virus de la partie basse min:514/max:655
          this.name = n;
          this.width = w;
          this.height = h;
          this.x = Math.floor((1174 - 234)*Math.random()) + 234;
          this.y= Math.floor((max - min)*Math.random()) + min;
        }; // FIN CREATION DE L'OBJET VIRUS

          VirusBuilder.prototype.initialisation = function(){
            var divVirus = document.createElement('div');
            document.body.children[4].appendChild(divVirus);
            divVirus.width = this.width;
            divVirus.height = this.height;
            divVirus.style.left = this.x + 'px';
            divVirus.style.top = this.y + 'px';
            divVirus.setAttribute("class", "virus");
            divVirus.setAttribute("id", this.name);
            var abscissa = this.x + 'px';
            var nx = -1;
            speed = 30;

            function bang() {
            divVirus.style.left = abscissa;
            var abscissaValue = parseInt(abscissa); // VALEUR NUMERIQUE DE ABSCISSA
            if ((abscissaValue + 30) >= 1160){
            nx = -1;
            };
            if (abscissaValue <= 90){
            nx = 1;
            };
            abscissa = (abscissaValue + nx).toString() + "px"; // CONVERSION DE LA VALEUR NUMERIQUE INCREMENTEE EN VALEUR CSS
            }; // FIN DE LA METHODE BANG
            setInterval(bang, speed);//INITIALISATION DE LA METHODE
            }; //FIN DE LA METHODE ASSOCIEE AU PROTOTYPE

              return function(n, w, h, min, max){
                return new VirusBuilder(n, w, h, min, max);// RETOUR DE L'OBJET CREE
              };
            }(); // FIN DE LA FONCTION USINE ET AUTO EXECUTION

///////////<<< FABRICATION D'UN VIRUS' >>>//////////
            var evilVirus = virusFactory('virus1', 60, 70, 150, 288);
            var evilVirus2 = virusFactory('virus2', 60, 70, 178, 288);
            var evilVirus3 = virusFactory('virus3', 60, 70, 196, 288);
            var evilVirus4 = virusFactory('virus4', 60, 70, 214, 288);
            var evilVirus5 = virusFactory('virus5', 60, 70, 232, 288);
            var evilVirus6 = virusFactory('virus6', 60, 70, 250, 288);
            var evilVirus7 = virusFactory('virus7', 60, 70, 268, 288);
            var evilVirus8 = virusFactory('virus8', 60, 70, 500, 650);
            var evilVirus9 = virusFactory('virus9', 60, 70, 521, 650);
            var evilVirus10 = virusFactory('virus10', 60, 70, 542, 650);
            var evilVirus11 = virusFactory('virus11', 60, 70, 563, 650);
            var evilVirus12 = virusFactory('virus12', 60, 70, 584, 650);
            var evilVirus13 = virusFactory('virus13', 60, 70, 605, 650);
            var evilVirus14 = virusFactory('virus14', 60, 70, 626, 650);

            var virusArray= [evilVirus, evilVirus2, evilVirus3, evilVirus4, evilVirus5, evilVirus6, evilVirus7, evilVirus8, evilVirus9, evilVirus10, evilVirus11, evilVirus12, evilVirus13, evilVirus14];//REPERTOIRE DES VIRUS, evilVirus2, evilVirus3, evilVirus4, evilVirus5, evilVirus6, evilVirus7, evilVirus8, evilVirus9, evilVirus10

            var virusDisplay = function(){
              for(i=0; i<virusArray.length ; i++){
                virusArray[i].initialisation();
              };
            };

///////////<<< FONCTION DE BASE POUR DETECTER UNE COLLISION AVEC UN MUR >>>///////////
      var collideWall = function(h, l, t, w, directionX) {
        if(l < parseFloat(mask.style.left) + 30 &&
        l + w > parseFloat(mask.style.left) &&
        t < parseFloat(mask.style.top) + 68 &&
        h + t > parseFloat(mask.style.top)){
          //console.log('collision');
          window.clearInterval(directionX);
          return true
        };
      };

///////////<<< COLLISION ENTRE LE PERSONNAGE ET LA DIV CENTRALE DU DECOR >>>///////////
      var collideDecor = function(x, y, w, h, direction){
        if((parseFloat(mask.style.left) + parseFloat(mask.style.width)) > x
        && parseFloat(mask.style.left) < x + w
        && (parseFloat(mask.style.top) + parseFloat(mask.style.height)) > y
        && parseFloat(mask.style.top) < y + h){
          console.log('collision div');
          window.clearInterval(direction);
          return true;
        };
      };


//////////<<< DETECTER UNE COLLISION ENTRE UN ITEM ET LE PERSONNAGE >>>//////////
      var  detectCollide = function(a) {
        if ((parseFloat(mask.style.left) + parseFloat(mask.style.width)) > parseFloat(a.x)
        && parseFloat(mask.style.left) < parseFloat(a.x) + 15
        && (parseFloat(mask.style.top) + parseFloat(mask.style.height)) > parseFloat(a.y)
        &&  parseFloat(mask.style.top) < parseFloat(a.y) + 15
        && collide === false ){
        //console.log('collision');
        collide = true;
        } else {
        //Pas de collision détectée
        };
      };

//////////<<< FONCTION CHECK COLLISION POUR AFFICHER UN ITEM ET INCREMENTER LE SCORE >>>//////////
      var itemArray = document.getElementsByClassName('items');
      var liArray = [ht, js, jq, ag, ps, db, nd, ex, aj, mt];
      var checkCollideItemPerso = function(){
        for ( var i = 0 ; i < itemArray.length ; i++ ){
        detectCollide( itemArray[i] );
        if(collide == true){
          if(safari5 === -1){
            gameSounds.collectedItem.play();
          };
        document.body.children[2].children[i].parentNode.removeChild(itemArray[i]);
        liArray[i].style.display = 'block';
        liArray.splice(i,1);
        doctor.score = doctor.score + 10;
        document.body.children[0].children[0].children[0].innerHTML = 'Score ' + doctor.score + ' /100';
        //console.log(doctor.score);
        collide = false;
        }
        if(doctor.score === 100){
          if(safari5 === -1){
            audio.pause();
            gameSounds.youWin.play();
          };
        endGame();
        var win = document.getElementById('winGame');
        win.style.display = 'block';
        window.clearInterval(wait);
        //console.log('vous avez gagné !');
        }
      }
    };

//////////<<< DETECTER UNE COLLISION ENTRE UN VIRUS ET LE PERSONNAGE >>>//////////
var virusAlive = document.getElementsByClassName('virus');
      var  detectCollideVirus = function() {
          if ((parseFloat(mask.style.left) + parseFloat(mask.style.width)) > parseFloat(virusAlive[i].style.left)
          && parseFloat(mask.style.left) < parseFloat(virusAlive[i].style.left) + 60
          && (parseFloat(mask.style.top) + parseFloat(mask.style.height)) > parseFloat(virusAlive[i].style.top)
          &&  parseFloat(mask.style.top) < parseFloat(virusAlive[i].style.top) + 70
          && collide === false ){
          collideVirus = true;
          } else {// PAS DE COLLISION DETECTEE
        };
      };

//////////<<< FONCTION QUI PARLE D'ELLE MEME POUR ERADIQUER LES VIRUS AVEC L'ATTAQUE DU PERSONNAGE >>>//////////
      var killVirus =  function(){
          for (i=0 ; i<virusAlive.length ; i++){
          detectCollideVirus();
          if(collideVirus == true){
            if(safari5 === -1){
              gameSounds.virusDie.play();
            };
          document.body.children[4].children[i].parentNode.removeChild(virusAlive[i])
          //console.log('collision')
          collideVirus = false;
          };
        };
      };

//////////<<< FONCTION COLLISION AVEC LES VIRUS ET PERTE DE POINTS DE VIE >>>//////////
      var killDoctor =  function(){
          for (i=0 ; i<virusAlive.length ; i++){
          detectCollideVirus();
          if(collideVirus == true){
            if(safari5 === -1){
              gameSounds.doctorHurts.play();
            };
          document.body.children[4].children[i].parentNode.removeChild(virusAlive[i])
          doctor.life = doctor.life - 1;
          document.body.children[0].children[0].children[1].innerHTML = 'Life ' + doctor.life + ' /3';
          //console.log(doctor.life)
          collideVirus = false;
          }
          if(doctor.life === 0){
          endGame();
            if(safari5 === -1){
              audio.pause();
              gameSounds.youLoose.play();
            };
          var loose = document.getElementById('endGame');
          loose.style.display = 'block';
          window.clearInterval(wait);
          //console.log('perdu')
          }
        };
      };
    var test = setInterval(function(){
      killDoctor();
    }, 10);

//////////<<< FONCTION POUR DEMARRER LE JEU >>>//////////

    var startGame = function(){
      initialize();
      virusDisplay();
      if(safari5 === -1){
        playTheme();
      };
    };
    var beginGame = document.getElementById('instructions');
    beginGame.addEventListener('click', function(){
      beginGame.style.display='none';
      startGame();

    });

//////////<<< FONCTION POUR ARRETER LE JEU >>>//////////
    var endGame = function(){
  ///SUPPRESSION DE TOUS LES ITEMS NON RECUPERES : SI LE DOCTOR EST MORT, IL N'ESTS PLUS POSSIBLE DE GAGNER///
      var removeItems = document.getElementById('itemContainer');
      document.body.children[2].parentNode.removeChild(removeItems);
  ///SUPPRESSION DE TOUS LES VIRUS NON TUES : SI LE DOCTOR EST MORT, LE SCORE NE PEUT PAS ETRE NEGATIF///
      var removeVirus = document.getElementById('virusContainer');
      document.body.children[4].parentNode.removeChild(removeVirus);

    };
//////////<<< FONCTION RETOUR SUR CV >>>//////////
    var seeResume = document.getElementById('winGame');
    seeResume.addEventListener('click', function(){
      document.location.replace('http://audreyrocher.com/#about');
    });


//////////<<< EVENEMENTS QUAND ON RELEVE UNE TOUCHE >>>//////////
    window.addEventListener('keyup', function(evtClavier){
      var keyCode = evtClavier.keyCode;
      initialize();
/////<<< ATTENTE DU PERSONNAGE QUAND AUCUN MOUVEMENT N'EST DETECTE >>>/////
     if(wait === false){
        var x =0;
        mask.style.width = '30px';
        mask.style.height = '68px';
        sprite.style.top = -136 +'px';
        wait = window.setInterval(function(){
        if(x > 1){
          x=0;
        };
        sprite.style.left = doctor.walkBottom[x+2];
        x++;
        }, 500);
      };
      switch(keyCode){
        case 37:
          window.clearInterval(toLeft);
          toLeft = false;
        break;

        case 38:
          window.clearInterval(toTop);
          toTop = false;
        break;

        case 39:
          window.clearInterval(toRight);
          toRight = false;
        break;

        case 40:
          window.clearInterval(toBottom);
          toBottom = false;
        break;

        case 16://SHIFT
        test = setInterval(function(){
          killDoctor();
        }, 10);
          window.clearInterval(specialAttack);
          specialAttack = false;
        break;

        case 18://ALT (CLAVIER MAC);
        test = setInterval(function(){
          killDoctor();
        }, 10);
          window.clearInterval(specialAttack);
          specialAttack = false;
          break;
      };
    });


//////////<<< EVENEMENTS QUAND ON APPUIE SUR UNE TOUCHE >>>///////////
      window.addEventListener('keydown', function (evtClavier){
        var keyCode = evtClavier.keyCode;
        var x = 0;
        window.clearInterval(wait);

        switch (keyCode) {
          case 37: ///<<<GAUCHE
          mask.style.width = '30px';
          mask.style.height = '68px';
            if (toLeft === false) {
            wait = false;
            toLeft = window.setInterval(function(){
              //killDoctor();
              checkCollideItemPerso();
              mask.style.left = (parseFloat(mask.style.left) - 4) + 'px';
              if( x < doctor.walkLeft.length){
              sprite.style.top = '-68px';
              sprite.style.left = doctor.walkLeft[x];
              x++;
              } else {
              x=0;
              }
            //(150, 16, 300, 940, toLeft, 5);//COLLISION AVEC LA DIV DU CENTRE COTE MORGUE
                if(collideDecor(80, 350, 947, 145, toLeft)){
                mask.style.left = parseFloat(mask.style.left) + 4 + 'px';
                };
                if(collideWall(780, 85, -40, 2, toLeft) === true){
                mask.style.left = parseFloat(mask.style.left) + 4 + 'px';
                };
              },40);
            };
        break;

          case 38:///<<<HAUT
          mask.style.width = '30px';
          mask.style.height = '68px';
            if (toTop === false) {
            wait = false;
            toTop = window.setInterval(function(){
              //killDoctor();
              checkCollideItemPerso();
              mask.style.top = (parseFloat(mask.style.top) - 4) + 'px';
              if( x < doctor.walkTop.length){
              sprite.style.top = '-204px';
              sprite.style.left = doctor.walkTop[x];
              x++;
              } else {
              x=0;
            };
                if(collideDecor(80, 350, 947, 145, toTop)){
                mask.style.top = parseFloat(mask.style.top) + 10 + 'px';
                };

                if(collideWall(162, 80, -40, 1116, toTop)){
                mask.style.top = parseFloat(mask.style.top) + 10 + 'px';
                };//COLLISION AVEC LE DECOR HAUT BUREAU ET PREMIERE PARTIE DE L'HOPITAL
              },40);
            };
        break;

          case 39:///<<<DROITE
          mask.style.width = '30px';
          mask.style.height = '68px';
            if (toRight === false) {
            wait = false;
            toRight = window.setInterval(function(){
              //killDoctor();
              checkCollideItemPerso();
              mask.style.left = (parseFloat(mask.style.left) + 4) + 'px';
              if( x < doctor.walkRight.length){
              sprite.style.top = '-1px';
              sprite.style.left = doctor.walkRight[x];
              x++;
              } else {
              x=0;
              };
                if(collideWall(780, 1190, -40, 10, toRight)){
                mask.style.left = parseFloat(mask.style.left) - 4 + 'px';
                };//COLLISION AVEC LE CADRE BORD DROIT
              },40);
            };
        break;

          case 40:///<<<BAS
          mask.style.width = '30px';
          mask.style.height = '68px';
            if (toBottom === false) {
            wait = false;
            toBottom = window.setInterval(function(){
              //killDoctor();
              checkCollideItemPerso();
              mask.style.top = (parseFloat(mask.style.top) + 4) + 'px';
              if( x < doctor.walkBottom.length){
              sprite.style.top = '-136px';
              sprite.style.left = doctor.walkBottom[x];
              x++;
              } else {
              x=0;
              };
                if(collideDecor(80, 350, 947, 145, toBottom)){
                mask.style.top = parseFloat(mask.style.top) - 10 + 'px';
                };
            //collisionY(50, 16, 300, 940, toBottom, -10);//COLLISION AVEC LA DIV DU CENTRE TOP BUREAU HOPITAL
                if(collideWall(116, 80, 716, 1116, toBottom)){
                mask.style.top = parseFloat(mask.style.top) - 10 + 'px';
                };//COLLISION AVEC LE MUR BAS DE L'HOPITAL
              },40);
            };
        break;

          case 16:///<<< attaque spéciale droite
            if(specialAttack === false){
            wait = false;
            specialAttack = window.setInterval(function(){
              window.clearInterval(test);
              killVirus();
              checkCollideItemPerso();
              mask.style.left = (parseFloat(mask.style.left) + 4) + 'px';
              if( x < doctor.throwSyringe.length){
              mask.style.width = doctor.throwSyringe[x].widthMask;
              mask.style.height = doctor.throwSyringe[x].heightMask;
              sprite.style.top = doctor.throwSyringe[x].topImg;
              sprite.style.left = doctor.throwSyringe[x].leftImg;
              x++;
              } else{
              x=0;
            };
              if(collideWall(780, 1120, -40, 50, toRight)){
              mask.style.left = parseFloat(mask.style.left) - 40 +'px';
              };//COLLISION AVEC LE CADRE BORD DROIT
            }, 70);
          };
        break;

          case 18:///<<< attaque spéciale gauche
            if(specialAttack === false){
            wait = false;
            specialAttack = window.setInterval(function(){
              window.clearInterval(test)
              killVirus();
              checkCollideItemPerso();
              mask.style.left = (parseFloat(mask.style.left) - 4) + 'px';
              if(x < doctor.throwSyringeLeft.length){
              mask.style.width = doctor.throwSyringeLeft[x].widthMask;
              mask.style.height = doctor.throwSyringeLeft[x].heightMask;
              sprite.style.top = doctor.throwSyringeLeft[x].topImg;
              sprite.style.left = doctor.throwSyringeLeft[x].leftImg;
              x++;
              } else {
              x=0;
            };
              if(collideDecor(80, 350, 947, 145, toLeft)){
              mask.style.left = parseFloat(mask.style.left) + 40 + 'px';
              };
              if(collideWall(780, 85, -40, 2, toLeft)){
              mask.style.left =  parseFloat(mask.style.left) + 40 + 'px';
              };//COLLISION AVEC LE CADRE BORD DROIT
            }, 70);
          };
        };
      });
    })
    //VALEUR POSITION INITIALE POUR DEMARRER LE JEU TOP 350px / LEFT 85px  background-01.jpg
