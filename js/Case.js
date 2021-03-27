class Case {
    ligne;
    colonne;
    numero;


    constructor(ligne, colonne) {
        this.placer(ligne, colonne);
        this.numero = 4*ligne + colonne;
        this.spriteElement = document.getElementById('photo'+this.numero);
    }


    placer(ligne, colonne) {
        this.ligne = ligne;
        this.colonne = colonne;
    }



    permuter(cible){

        let c1 = this.spriteElement;
        let c2 = cible.spriteElement;


        if (this.memeLigne(cible)){
            if (this.colonne > cible.colonne){
                c2.parentNode.insertBefore(c1, c2);
            }
            else{
                c1.parentNode.insertBefore(c2, c1);
            }
        }
        else{
            let c3 = c1.nextSibling;
            let p1 = c1.parentNode;

            c2.parentNode.insertBefore(c1, c2);
            p1.insertBefore(c2, c3);

        }

        const templ = this.ligne;
        const tempc = this.colonne;
        this.placer(cible.ligne, cible.colonne);
        cible.placer(templ, tempc);
    }


    memeLigne(cible){
        return this.ligne === cible.ligne;
    }


    estBienPlace(){
        return (this.colonne + this.ligne * 4) === this.numero;
    }

    changeTheme(img){
        this.spriteElement.src = './img/'+img+'/'+img+'_'+this.numero+'.jpg';
    }

    updateCurseur(ok){
        if (ok){
            this.spriteElement.style.cursor = "pointer";
        }
        else{
            this.spriteElement.style.cursor = "not-allowed";
        }
    }

}