// Script per scarpa.html

let popupIsActive = false; // Quando il popup è attivo, il blur non deve sparire quando facciamo mouseleave alle voci dell'header

document.addEventListener("DOMContentLoaded", ()=>{

    // Per il blur
    $(".voce-grande-header").hover(()=>{
        $(".blur").css({
            "opacity":1,
            "z-index":80,
            "height":"100%"
        });
    }); // mouseover

    $(".voce-grande-header").mouseleave(()=>{
        if(popupIsActive==false){
            $(".blur").css({
                "opacity":0,
                "z-index":-1,
                "height":0
            });
        }
    }); // mouseleave

    // Gestione comparsa popup Carello
    const bottoneCarrello = document.querySelector("#bottone");
    const popupCarrello = document.querySelector("#popup-carrello");
    let nScarpeSelezionate = 0;
    let timer;

    

    // Evento "Click" del bottone "Aggiungi al carrello"
    bottoneCarrello.addEventListener("click", ()=>{
        let tagliaCheck = document.querySelector(".mini-taglia input[type=radio]:checked");

        if(tagliaCheck == null){
            // Per rendere il bordo della griglia delle taglie rosso e per far apparire il messaggio d'allerta
            document.querySelector(".taglie-misure").style.border = "1px solid red";
            document.querySelector(".taglia-misura span").style.color = "red";
            document.querySelector("#no-scarpa").innerHTML = "Selezionare una scarpa";

            // disattivo i bottoni in modo che non funzionino anche quando non è aperto il popup carrello
            document.querySelector(".bottone-grande.preferiti.popup").disabled = true;
            document.querySelector(".bottone-grande.carrello.popup").disabled = true;
            popupIsActive = false;
            console.log(popupIsActive);
        } else {
            nScarpeSelezionate++;
            document.querySelector("#btn-carrello").setAttribute("title", "Articoli carrello: " + nScarpeSelezionate);
            /* console.log(document.querySelector("#btn-carrello").getAttribute("title")) */
            document.querySelector(".taglie-misure").style.border = "none";
            document.querySelector(".taglia-misura span").style.color = "black";
            document.querySelector("#no-scarpa").innerHTML = "";
            timer = setTimeout(rimuoviPopup, 7000);
            window.scrollTo(0,0)
            document.body.style.overflow = 'hidden'; // Blocca lo scroll sulla pagina
            document.documentElement.style.overflow = 'hidden'; // Blocca lo scroll sulla pagina (per alcuni browser)

            // console.log(tagliaCheck.value);
            // blur
            $(".blur").css({
                "opacity":"1",
                "z-index":"105",
                "height":"100%",
            });
            /* document.querySelector(".blur").style.opacity = 1;
            document.querySelector(".blur").style.zIndex = 20;
            document.querySelector(".blur").style.height = "100%"; */

            // popup carrello aperto
            popupCarrello.style.opacity = 1;
            popupCarrello.style.zIndex = 110;

            // Numero di taglia selezionato
            document.querySelector("#ntaglia").innerHTML = "Taglia/ Misura EU " + tagliaCheck.value;
            document.querySelector("#numero-carrello").innerHTML = nScarpeSelezionate;

            // Numero di scarpe selezionate
            document.querySelector(".bottone-grande.preferiti.popup").innerHTML = "Visualizza Carrello ("+nScarpeSelezionate+")";

            // attivo i bottoni
            document.querySelector(".bottone-grande.preferiti.popup").disabled = false;
            document.querySelector(".bottone-grande.carrello.popup").disabled = false;
            
            popupIsActive = true;
            console.log(popupIsActive);
        }
    }); // "Aggiungi al carrello"

    // Evento "click" del bottone "X" del popup
    document.querySelector("#btn-mini-esci").addEventListener("click", ()=>{
        popupIsActive = false;
        console.log(popupIsActive)
        // blur
        $(".blur").css({
            "opacity":"0",
            "z-index":"-1",
            "height":"0",
        });
        /* document.querySelector(".blur").style.opacity = 0;
        document.querySelector(".blur").style.zIndex = -1;
        document.querySelector(".blur").style.height = "0"; */

        popupCarrello.style.opacity = 0;
        popupCarrello.style.zIndex = -1;

        document.body.style.overflow = ''; // Blocca lo scroll sulla pagina
        document.documentElement.style.overflow = ''; // Blocca lo scroll sulla pagina (per alcuni browser)
    })

    // Rimozione popup quando si fa "mouseleave" al popup
    popupCarrello.addEventListener("mouseleave", ()=>{
        /* console.log("mouseleave") */
        timer = setTimeout(rimuoviPopup, 7000, popupIsActive);
    });

    popupCarrello.addEventListener("mouseover", ()=>{
        /* console.log("hover") */
        popupIsActive = true;
        clearTimeout(timer);
    });

    // Gestione click dei bottoni del popup
    document.querySelector(".bottone-grande.preferiti.popup").addEventListener("click", ()=>{
        location.href = "carrello.html";
    });

    document.querySelector(".bottone-grande.carrello.popup").addEventListener("click", ()=>{
        location.href = "checkout.html";
    });
    
    /* Parte gestione bottoni slider della scarpa su scarpa.html */
    const miniBottoni = $(".mini-bottone-slider");
/*     const miniBottoneSinistra = $(".mini-bottone-slider")[0];
    const miniBottoneDestra = $(".mini-bottone-slider")[1]; */
    let position = 0;
    /* console.log(miniBottoneSinistra, miniBottoneDestra) */

    const sliderMiniImmagini = $(".mini-img-scarpa");
    // console.log(sliderMiniImmagini);
    /* console.log($("img.immagine-scarpa-grossa")[0].src); */

    for(let i=0; i<sliderMiniImmagini.length; i++){
        $(sliderMiniImmagini[i]).hover(()=>{
            if(i!=1){

            $(".contenitore-immagine-scarpa").css("display", "block");
            $(".contenitore-video").css("display", "none");
            let source = sliderMiniImmagini[i].firstChild.src;

            // console.log("Ao " + source)
            $("img.immagine-scarpa-grossa")[0].src = source;
            // console.log($(".mini-img-scarpa:nth-child("+(i+1)+") img").src);
            // $("img.immagine-grossa")[0].src = $(".mini-img-scarpa:nth-child("+(i+1)+") img").src;
            } else {
                $(".contenitore-immagine-scarpa").css("display", "none");
                $(".contenitore-video").css("display", "block");
            }
            position = i;
            // console.log(position);
        });
        // console.log(position);
        /* Utilizzare le radio e le label con id penso */

    }

    $(miniBottoni[1]).click(()=>{
        position = avanti(position);
    });
    $(miniBottoni[0]).click(()=>{
        position = dietro(position);
    });


    
    // Gestione bottoni slider
    const slider = document.querySelectorAll(".slider ul");
    const bottoniSinistra = document.querySelectorAll(".bottone-slider.sinistra");
    const bottoniDestra = document.querySelectorAll(".bottone-slider.destra");
    /* console.log("Slider" , slider); */

    slider.forEach((sl, i) => {
    // maxScrollWidth equivale alla vera width dello slider in questione
    let maxScrollWidth = sl.scrollWidth - sl.clientWidth;
    const tolleranza = 2; // In base al browser la funzione del tasto destro può non funzionare rendendo impossibile farlo diventare disabled. Una piccola tolleranza dovrebbe risolvere il problema

    // console.log('scrollWidth:', sl.scrollWidth);
    // console.log('clientWidth:', sl.clientWidth);
    // console.log('maxScrollWidth:', maxScrollWidth);

    // Gestione scorrimento dello scrollbar
    sl.addEventListener("scroll", () => {
        if (sl.scrollLeft == 0) {
            bottoniSinistra[i].disabled = true;
        } else {
            bottoniSinistra[i].disabled = false;
        }

        if (parseInt(sl.scrollLeft) == maxScrollWidth) {
            bottoniDestra[i].disabled = true;
        } else {
            bottoniDestra[i].disabled = false;
        }
    });

    // Gestione bottone sinistro dello slider
    bottoniSinistra[i].addEventListener("click", () => {
        // console.log("Tasto sinistro");
        if (sl.scrollLeft == 0) {
            bottoniSinistra[i].disabled = true;
        } else {
            bottoniSinistra[i].disabled = false;

            /* Dato che con il forEach non è possibile utilizzare il return e il break, ho convertito lo switch-case con un semplice if-else */
            let passo;
            if(i==0){
                passo = maxScrollWidth / 7;
            } else if(i==1){
                passo = (maxScrollWidth / 5);
            } else if(i==2){
                passo = maxScrollWidth / 3;
            } else sl.scrollLeft -= 300;

            sl.scrollLeft -= passo;
        }
    });

    // Gestione bottone destro dello slider
    bottoniDestra[i].addEventListener("click", () => {
        // console.log("Tasto destro");
        if (sl.scrollLeft >= (maxScrollWidth - tolleranza)) {
            bottoniDestra[i].disabled = true;
        } else {
            bottoniDestra[i].disabled = false;
            let passo;
            if(i==0){
                passo = maxScrollWidth / 7;
            } else if(i==1){
                passo = maxScrollWidth / 5;
            } else if(i==2){
                passo = maxScrollWidth / 3;
            } else sl.scrollLeft += 300;

            sl.scrollLeft += passo + tolleranza;

            // Se lo slider ha superato la fine, correggi il valore (in caso di arrotondamenti)
            if (sl.scrollLeft >= maxScrollWidth - tolleranza) {
                sl.scrollLeft = maxScrollWidth;
                bottoniDestra[i].disabled = true;
            }
        }
    });
    }); // slider

}); // DOMContentLoaded


function rimuoviPopup(){
    $(".blur").css({
        "opacity":"0",
        "z-index":"-1",
        "height":"0"
    });
    
    document.querySelector("#popup-carrello").style.opacity = 0;
    document.querySelector("#popup-carrello").style.zIndex = -1;
    document.body.style.overflow = ''; // Blocca lo scroll sulla pagina
    document.documentElement.style.overflow = ''; // Blocca lo scroll sulla pagina (per alcuni browser)
    
    popupIsActive = false;
}

function avanti(x){
    /* console.log("Click destro"); */
    /* console.log(sliderMiniImmagini.length) */
    x++;
    if(x==1){
        scambioImgVideo("none", "block");
    } else {
        scambioImgVideo("block", "none");
        if(x > $(".mini-img-scarpa").length-1){
            x = 0;
        }
        console.log(x);
        $("img.immagine-scarpa-grossa")[0].src = $(".mini-img-scarpa")[x].firstChild.src;
    }
    
    
    return x;
}

function dietro(y){
    /* console.log("Click sinistro"); */
    y--;
    /* console.log(sliderMiniImmagini.length) */
    if(y==1){
        scambioImgVideo("none", "block");
    } else {
        scambioImgVideo("block", "none");
        if(y <= 0){
            y = $(".mini-img-scarpa").length-1;
        }
    }
    /* console.log(y); */
    $("img.immagine-scarpa-grossa")[0].src = $(".mini-img-scarpa")[y].firstChild.src;
    
    return y;
}

function scambioImgVideo(a, b){
    $(".contenitore-immagine-scarpa").css("display", a);
    $(".contenitore-video").css("display", b);
}