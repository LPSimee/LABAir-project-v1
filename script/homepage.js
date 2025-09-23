// Script per homepage.html

document.addEventListener("DOMContentLoaded", ()=>{
    // Gestione bottoni slider
    const slider = document.querySelectorAll(".slider ul");
    const bottoniSinistra = document.querySelectorAll(".bottone-slider.sinistra"); // Array contenenti i bottoni sinistra
    const bottoniDestra = document.querySelectorAll(".bottone-slider.destra"); // Array contenenti i bottoni destra
    /* console.log("Slider" , slider); */

    // Con il ciclo for tradizionale:
    // for(let i=0; i<slider.length; i++){
    //     let maxScrollWidth = slider[i].scrollWidth - slider[i].clientWidth;
    //     const tolleranza = 2;
    //     // console.log("scrollWidth " + i + ":", slider[i].scrollWidth, slider[i].clientWidth)
    //     // console.log("maxScrollSlider: ", maxScrollWidth)

    //     console.log('scrollWidth:', slider[i].scrollWidth);
    //     console.log('clientWidth:', slider[i].clientWidth);
    //     console.log('maxScrollWidth:', maxScrollWidth);

    //     /* Per lo scorrimento dallo scrollbar */
    //     $(slider[i]).scroll(()=>{
    //         // console.log(parseInt(slider[i].scrollLeft));
    //         if(slider[i].scrollLeft == 0){
    //             console.log(slider[i].scrollLeft);
    //             bottoniSinistra[i].disabled = true;
    //         } else bottoniSinistra[i].disabled = false;

    //         if(parseInt(slider[i].scrollLeft) == maxScrollWidth){
    //             console.log(parseInt(slider[i].scrollLeft));
    //             bottoniDestra[i].disabled = true;
    //         } else bottoniDestra[i].disabled = false;

    //     });

    //     $(bottoniSinistra[i]).click(()=>{
    //         // console.log("Tasto sinistro");

    //         if(slider[i].scrollLeft == 0){
    //             bottoniSinistra[i].disabled = true;
    //         } else {
    //             bottoniSinistra[i].disabled = false;
    //             let passo;
    //             switch (i) {
    //                 case 0:
    //                     passo = maxScrollWidth / 7;
    //                     // console.log("passo:", passo)
    //                     break;
    //                 case 1:
    //                     passo = maxScrollWidth / 5;
    //                     break;
    //                 case 2:
    //                     passo = maxScrollWidth / 3;
    //                     break;
    //                 default:
    //                     slider[i].scrollLeft -= 300;
    //             }

    //             slider[i].scrollLeft -= passo;

    //         }

    //     });

    //     $(bottoniDestra[i]).click(() => {
    //         console.log("Tasto destro");
    //         console.log("passo: "+ slider[i].scrollLeft)
    //         if (slider[i].scrollLeft >= (maxScrollWidth - tolleranza)) {
    //             // slider[i].scrollLeft = maxScrollWidth;
    //             bottoniDestra[i].disabled = true;
    //         } else {
    //             bottoniDestra[i].disabled = false;

    //             let passo;
    //             switch (i) {
    //                 case 0:
    //                     passo = maxScrollWidth / 7;
    //                     // console.log("passo:", passo)
    //                     break;
    //                 case 1:
    //                     passo = maxScrollWidth / 5;
    //                     break;
    //                 case 2:
    //                     passo = maxScrollWidth / 3;
    //                     break;
    //                 default:
    //                     slider[i].scrollLeft += 300;
    //             }

    //             slider[i].scrollLeft += passo + tolleranza;

    //             // Se lo slider ha superato la fine, correggi il valore (in caso di arrotondamenti)
    //             if (slider[i].scrollLeft >= maxScrollWidth - tolleranza) {
    //                 slider[i].scrollLeft = maxScrollWidth;
    //                 bottoniDestra[i].disabled = true;
    //             }
    //         }
    //     });

    // }

// Con il forEach
    

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

    // Gestione sfondo blur
    $(".voce-grande-header").hover(()=>{
        $(".blur").css({
            "opacity":1,
            "z-index":9,
            "height":"100%"
        });
    });

    $(".voce-grande-header").mouseleave(()=>{
        $(".blur").css({
            "opacity":0,
            "z-index":-1,
            "height":0
        });
    }); // Lo sfondo blur scompare quando il mouse non punta sulle voci dell'header

    // Gestione header "sticky"
    let ultimoScroll = 0; // posizione precedente dello scroll
    const banner = document.querySelector("#banner-hero"); // Il Banner
    const header = document.querySelector("#grande-header"); // L'Header

    window.addEventListener("scroll", ()=>{
        /* console.log("scroll", document.documentElement.scrollTop); */
        let scrollAttuale = window.scrollY; // Posizione dello scroll attuale

        /* per far funzionare la header sticky */
        if (scrollAttuale > ultimoScroll && scrollAttuale > 10) {
            // Scrolling verso il basso
            header.style.top = '-60px';  // Nasconde l'header
        } else if (scrollAttuale < ultimoScroll) {
            // Scrolling verso l'alto
            if(scrollAttuale < 40){
                banner.style.marginTop = "0";
                header.style.position = 'relative';

                header.style.top = '';
                header.style.zIndex = '';

            } else {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.zIndex = '10';
                banner.style.marginTop = "60px";
            }
        }

        // Aggiornamento ultima posizione dello scroll
        ultimoScroll = scrollAttuale <= 0 ? 0 : scrollAttuale;
    }); // Window scroll
    
}); // DOMContentLoaded

