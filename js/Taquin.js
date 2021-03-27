class Taquin {
    image;
    cases;
    nbCoupsJouees;



    constructor(img) {

        this.nbCoupsJouees = 0;
        this.cases = new Array(16);

        for (let i = 0; i < 16 ; i++) {
                this.cases[i] = new Case(Math.floor(i/4), i%4, img);
        }

        this.image = img;
        this.changeTheme(img);

        this.melanger();
    }


    decaler(cible){
        let c = this.cases[cible]
        if (this.caseVideAdjacente(c) === true){
            this.nbCoupsJouees++;
            c.permuter(this.cases[15]);
            this.update();
        }
    }

    caseVideAdjacente(cible){
        if( (this.cases[15].ligne === cible.ligne) && (Math.abs( this.cases[15].colonne - cible.colonne ) === 1 ) )
            return true;
        if( (this.cases[15].colonne === cible.colonne) && (Math.abs( this.cases[15].ligne - cible.ligne ) === 1))
            return true;
        return false;
    }


    melanger(){


        if (this.cases[15].ligne === -2) {
            this.cases[15].ligne = 3;
        }


        this.nbCoupsJouees = 0;
        let rand ;

        do {
            for (let i = 0; i < 10000; i++) {
                let c =this.cases[Math.floor(Math.random()*15)]
                if (this.caseVideAdjacente(c) === true){
                    c.permuter(this.cases[15]);
                }
            }
        }while(this.estFini())


        let src = this.cases[15].spriteElement.src;
        if (src.substring(src.length-6, src.length-4) !== '15'){
            this.cases[15].spriteElement.src = src.substring(0, src.length-4)+'15.jpg';
        }


        this.update();
    }

    changeTheme(nom){
        this.image = nom;
        document.getElementById("photo16").src = './img/'+nom+'/'+nom+'_16.jpg';
        for (let i = 0; i < 16; i++){
            this.cases[i].changeTheme(nom);
        }
    }



    nbBienPlaces(){
        let nbBienPlaces = 0;
        for (let i = 0; i < 16; i++) {
            if(this.cases[i].estBienPlace())
                nbBienPlaces++;
        }
        return nbBienPlaces;
    }

    estFini(){
        return this.nbBienPlaces() === 16;
    }

    afficherSolution(){
        if (document.getElementById("jeu").style.display !== "none"){
            document.getElementById("jeu").style.display = "none";
            document.getElementById("modele").style.display = "flex";
            document.getElementById("solution").value = "puzzle";
            document.getElementById("melanger").disabled = true;
        }
        else {
            document.getElementById("jeu").style.display = "flex";
            document.getElementById("modele").style.display = "none";
            document.getElementById("solution").value = "solution";
            document.getElementById("melanger").disabled = false;
        }

    }



    update(){
        this.updateScore()
        this.verifierFin();
        this.updateCurseur();
    }

    updateScore(){
        document.getElementById("message").innerText = this.nbCoupsJouees+' coups joués ; '+this.nbBienPlaces()+' bien placés';
    }


    verifierFin(){
        if (this.estFini()){
            let src = this.cases[15].spriteElement.src;
            this.cases[15].spriteElement.src = src.substring(0, src.length-6)+'.jpg';
            this.cases[15].ligne = -2;
            this.updateCurseur();
            document.getElementById("message").innerText = 'bravo ! partie finie en '+this.nbCoupsJouees+' coups';
        }
    }


    updateCurseur(){
        for (let i = 0; i < 16; i++) {
            this.cases[i].updateCurseur(this.caseVideAdjacente(this.cases[i]));
        }
    }


}