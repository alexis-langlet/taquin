let taquin = new Taquin(document.getElementById("themes").value);

for (let i = 0; i < 16; i++) {
    document.getElementById('photo'+i).addEventListener("click", function(event){
        taquin.decaler(i);
    });
}



document.getElementById('melanger').addEventListener("click", function(event){
    taquin.melanger();
});


document.getElementById("themes").addEventListener("change", function(){
   taquin.changeTheme(document.getElementById("themes").value);
});


document.getElementById("solution").addEventListener("click", function(){
    taquin.afficherSolution();
});