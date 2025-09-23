// Script per carrello.html
// Gestione del contatore della scarpa e del calcolo di prezzo

document.addEventListener("DOMContentLoaded", ()=>{    
    // Per il blur
    $(".voce-grande-header").hover(()=>{
        $(".blur").css({
            "opacity":1,
            "z-index":10,
            "height":"100%"
        });
    });

    $(".voce-grande-header").mouseleave(()=>{
        $(".blur").css({
            "opacity":0,
            "z-index":-1,
            "height":0
        });
    });

    /* Bottoni del Carrello e del Riepilogo */
    const btnPiu = document.querySelector("#btn-aggiungi-elemento");
    const btnMeno = document.querySelector("#btn-rimuovi-elemento");
    const btnPagamento = document.querySelector(".bottone-grande.carrello");

    /* Gestione calcolo prezzi della scarpa */
    let indice = 1; // pontatore del numero di scarpe
    let prezzo = 119.99; // Prezzo della scarpa
    let prezzoVirgola = prezzo.toFixed(2).replace('.', ','); // Prezzo della scarpa con la virgola
    // console.log(prezzo)

    // Evento click del bottone ("+")
    btnPiu.addEventListener("click", ()=>{
        indice++;

        // Per aggiornare il valore dell'attributo "title" del bottone carrello sulla header
        document.querySelector("#btn-carrello").setAttribute("title", "Articoli carrello: " + indice)
        /* console.log(document.querySelector("#btn-carrello").getAttribute("title")) */
        if(indice>1){
            document.querySelector("#btn-rimuovi-elemento img").src = "MATERIALE/Icon/svg/meno.svg";
        }

        // Contenitore contenente l'inidice
        document.querySelector("#numero-scarpe").innerHTML = indice;

        // Calcolo del prezzo
        let prodotto = prezzo * indice;
        
        prezzoVirgola = prodotto.toFixed(2).replace('.', ',') + " €"; // Il prezzo viene convertito in una stringa per mettere il "€"

        /* console.log(prezzoVirgola); */ // Stringa

        // Per inserire il valore calcolato sulle specifiche aree
        document.querySelector("#prezzo-calcolato").innerHTML = prezzoVirgola; // Sul carrello
        
        // Sul riepilogo
        document.querySelector("#subtotale p").innerHTML = prezzoVirgola; 
        document.querySelector("#prezzo-totale p").innerHTML = prezzoVirgola;
    })

    // Evento click del bottone ("-")
    btnMeno.addEventListener("click", ()=>{
        indice--;

        document.querySelector("#btn-carrello").setAttribute("title", "Articoli carrello: " + indice);
        /* console.log(document.querySelector("#btn-carrello").getAttribute("title")); */

        if(indice==1){
            document.querySelector("#btn-rimuovi-elemento img").src = "MATERIALE/Icon/svg/cestino.svg";
        } 

        if(indice>0){
            document.querySelector("#numero-scarpe").innerHTML = indice;

            document.querySelector("#prezzo-calcolato").innerHTML = prezzo * indice;
            let prodotto = prezzo * indice;
            prezzoVirgola = prodotto.toFixed(2).replace('.', ',') + " €";
        } else {
            // Per far sparire il contenitore che rappresenta i dati del carrello della scarpa
            document.querySelector(".contenitore-dati-carrello").style.display = "none";
            document.querySelector("#no-item").style.display = "block"; // "Prodotti non inseriti"

            prezzoVirgola = "-"

            // Per disabilitare i bottoni del riepilogo
            document.querySelector(".bottone-grande.carrello").disabled = true;
            document.querySelector(".bottone-grande.pagamento").disabled = true;
        }

        document.querySelector("#prezzo-calcolato").innerHTML = prezzoVirgola;
        document.querySelector("#subtotale p").innerHTML = prezzoVirgola;
        document.querySelector("#prezzo-totale p").innerHTML = prezzoVirgola;
    })

    // Evento click del bottone ("Vai al pagamento")
    /* Reindirizzamento verso il checkout */
    btnPagamento.addEventListener("click", ()=>{
        location.href = "checkout.html"
    });

}); // DOMContentLoaded