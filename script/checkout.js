// Gestire il controllo degli input con le regex

const regexForm = [
    /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)/, /* Nome e cognome - Buono*/
    /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)/, /* Nome e cognome - Buono*/
    /^(Via|Viale|Corso|Piazza|Strada|Largo|Lungomare|Piazzale)\s+[A-Za-zàèéìòóùüÀÈÉÌÒÓÙÜ\s]+(\s\d+[A-Za-z]?)?$/, /* Indirizzo - OK*/
    /^\d{5}$/, /* CAP - Beh*/
    /^[A-Z][a-z]+(?:[\s-][a-zA-Z]+)*$/, /* Città - Nice*/
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/, /* E-mail - preso su Stack Overflow (link: https://emailregex.com/) */
    /^3[0-9]{8,9}$/ /* Telefono */
];

const regexCarta = [
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/, /* Carta di credito */
    /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, /* Mese/Anno Carta */
    /^[0-9]{3,4}$/ /* CVV */
];

/* Numero di carta da testare: 4111111111111111 */

// Messaggi di errore all'evento "input" degli input del form
const msgErroreOn = [
    "Inserisci un nome valido.",
    "Inserisci un cognome valido.",
    "Inserisci un indirizzo valido.",
    "Inserisci un CAP valido.",
    "Sono richiesti almeno 2 caratteri.",
    "Inserisci un indirizzo e-mail valido.",
    "Inserisci un numero di telefono valido."
];

// Messaggi di errore all'evento "blur" degli input del form
const msgErroreOff = [
    "Inserisci il tuo nome.",
    "Inserisci il tuo cognome.",
    "Inserisci un indirizzo valido.",
    "Inserisci il tuo CAP.",
    "Inserisci una città valida.",
    "Inserisci un indirizzo e-mail valido.",
    "Inserisci un numero di telefono valido."
];

// Utilizzato per contenere i check delle regex sugli input della form
let checkForm = [
    false,
    false,
    false,
    false,
    false,
    false,
    false
];

// Messaggi di errore degli input della carta
const msgErroreCarta = [
    "Inserisci il numero di carta valido",
    "Inserisci la data.",
    "Inserisci il CVV."
];

// Utilizzato per contenere i check delle regex sugli input della carta
let checkCarta = [
    false,
    false,
    false
]

document.addEventListener("DOMContentLoaded", ()=>{
    const inputDati1 = document.querySelectorAll(".input-form.input1"); // Input del form
    const inputDatiCarta = document.querySelectorAll(".input-form.input2"); // Input della carta
    const messaggiErrore1 = document.querySelectorAll("#contenitore-input-form .messaggio-errore"); // gli span che conterranno i essaggi di errore degli input del form
    const messaggiErroreCarta = document.querySelectorAll("#contenitore-input-carta .messaggio-errore"); // gli span che conterranno i essaggi di errore degli input della carta

    // I bottoni del checkout
    const btnContinua = document.querySelector("#btn-continua");
    const btnVerifica = document.querySelector("#btn-verifica");
    const btnPagamento = document.querySelector("#btn-pagamento");

    /* Controllo valori degli input della form */
    inputDati1.forEach(
        (input, indice)=>{
            /* Evento "input" per controllare il cambiamento di valore di ogni input  */
            input.addEventListener("input", ()=>{
                // console.log("Sto scrivendo sull'input: ", indice);

                // per ricavare il valore boleano della regex
                checkForm[indice] = checkValues(regexForm[indice], input, messaggiErrore1[indice], msgErroreOn[indice], checkForm[indice]);
                console.log("check specifico ", checkForm[indice]);
                /* console.log(checkForm) */

                if(checkForm.every(controlloCheck)){
                    btnContinua.disabled = false;
                }

            });

            input.addEventListener("blur", ()=>{
                // console.log("input ", indice, " uscito");

                checkForm[indice] = checkValues(regexForm[indice], input, messaggiErrore1[indice], msgErroreOff[indice], checkForm[indice]);
                console.log("check specifico ", checkForm[indice]);
                /* console.log(checkForm) */
                
                if(checkForm.every(controlloCheck)){
                    btnContinua.disabled = false;
                }
                
            });   
        }
    );
    
    /* Evento click del bottone "Salva e continua" */
    btnContinua.addEventListener("click", ()=>{
        document.querySelector(".titolo-carrello.fase2").classList.remove("disattivato");
        document.querySelector(".fase2 + .contenitore-dati-carrello .fase-nonAttiva").style.display = "block";
        
        /* document.querySelector("#contenitore-input-form").style.display = "none"; */
/*         const ctnDatiForm = document.querySelector("#container-dati");
        ctnDatiForm.classList.add("contenitore-dati-carrello");
        const dati= inputDati1.value
        ctnDatiForm.innerHTML = `
        <div class="contenitore-dati-checkout">
            <div class="contenitore-img-piccolo"><img src="MATERIALE/Scarpa/4.jpg" alt=""></div>
            <div><h4 class="font-1">Indirizzo di spedizione</h4>
                <div>
                    <p>${}</p>
                    <p>${}</p>
                    <p>${}</p>
                    <p>${}</p>
                    <p>${}</p>
                </div>
            </div>
        </div>
        `; */
    });


    // Per far apparire il form dei dati della carta
    document.querySelector("#carta-credito-debito ~ label").addEventListener("click", ()=>{
        document.querySelector("#contenitore-input-carta").style.display = "block";
        document.querySelector("#messaggio-paypal").style.display = "none";
        btnVerifica.disabled = true;
    });

    // Per il testo di paypal
    document.querySelector("#paypal ~ label").addEventListener("click", ()=>{
        document.querySelector("#messaggio-paypal").style.display = "block";
        document.querySelector("#contenitore-input-carta").style.display = "none";
        btnVerifica.disabled = false;
    });

    // Per gpay
    document.querySelector("#gpay ~ label").addEventListener("click", ()=>{
        document.querySelector("#messaggio-paypal").style.display = "none";
        document.querySelector("#contenitore-input-carta").style.display = "none";
        btnVerifica.disabled = false;
    });

    // Fa apparire l'ultima fare
    btnVerifica.addEventListener("click", ()=>{
        document.querySelector(".titolo-carrello.fase3").classList.remove("disattivato");
        document.querySelector(".fase3  + .contenitore-dati-carrello .fase-nonAttiva").style.display = "block";
    });

    // Ti porta alla thank you page
    btnPagamento.addEventListener("click", ()=>{
        location.href = "thank-you-page.html"
    });

    /* Controllo degli input della carta */
    inputDatiCarta.forEach(
        (input, indice) => {
            input.addEventListener("input", ()=>{
                // console.log("Sto scrivendo sull'input: ", indice);

                checkCarta[indice] = checkValues(regexCarta[indice], input, messaggiErroreCarta[indice], msgErroreCarta[indice], checkCarta[indice]);
                console.log("check specifico ", checkCarta[indice]);
                console.log(checkCarta)

                if(checkCarta.every(controlloCheck)){
                    btnVerifica.disabled = false;
                }

            });

            input.addEventListener("blur", ()=>{
                // console.log("input ", indice, " uscito");

                checkCarta[indice] = checkValues(regexCarta[indice], input, messaggiErroreCarta[indice], msgErroreCarta[indice], checkCarta[indice]);
                console.log("check specifico ", checkCarta[indice]);
                console.log(checkCarta)
                
                if(checkCarta.every(controlloCheck)){
                    btnVerifica.disabled = false;
                }
                
            });   
        }
    );
    
}); // DOMContentLoaded

// La funzione per controllare le values degli input
function checkValues(regex, testo, containerMsgErrore, errore, check){
    if(regex.test(testo.value) == false){
        /* console.log("AO"); */
        check = false;
        testo.classList.add("rosso");
        testo.style.borderColor = "red";
        /* console.log(containerMsgErrore) */
        containerMsgErrore.style.opacity = 1;
        containerMsgErrore.innerHTML = errore;
        
    } else {
        testo.classList.remove("rosso");
        testo.style.borderColor = "black";
        /* console.log(containerMsgErrore) */
        containerMsgErrore.style.opacity = 0;
        check = true;
    }

    /* console.log(checkForm) */

    return check;
}

function controlloCheck(x){
    return x == true;
}