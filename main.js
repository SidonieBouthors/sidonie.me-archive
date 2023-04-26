function search() { 

    let input = document.getElementById('searchbar').value; 
    input=input.toLowerCase(); 
 
    let x = document.getElementsByClassName('item-name');
    

    for (i = 0; i < x.length; i++) {  
        if (x[i].innerHTML.toLowerCase().includes(input)) { 
            
            document.getElementById(x[i].innerHTML.toLowerCase()).style.display="unset"; 
            
        } 
        else { 

            document.getElementById(x[i].innerHTML.toLowerCase()).style.display="none";                   
        } 
    } 
} 


function checkEnterClick(e){
    if(e.which == 13) {
        search();
    }  
}


function playClickSound() {
    let sound = document.getElementById('mouseclick');
    sound.play();
}
