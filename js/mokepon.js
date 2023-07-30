const btnMascota = document.getElementById("btn-seleccionar-mascota")

const seccionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")
const seccionMensajes = document.getElementById("resultado")

const opcionesAtaques = document.getElementById("opciones-ataques")
const ataquesJugador = document.getElementById("ataques-del-jugador")
const ataquesEnemigo = document.getElementById("ataques-del-enemigo")

const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")

let mokepones = []
let opcionDeMokepones = ""
let ataqueJugador = []
let ataqueEnemigo = []
let mascotaJugador
let vidasJugador = 3
let vidasEnemigo = 3
let turnosJugador = 5

class Mokepon {
    constructor(nombre, imagen, vida) {
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/hipodoge.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/capipepo.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/ratigueya.png", 5)

hipodoge.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"}
    )

capipepo.ataques.push(
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"}
    )

ratigueya.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"}
    )

mokepones.push(hipodoge, capipepo, ratigueya)
            
const aleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const iniciarJuego = () => {

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} />
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.imagen} alt=${mokepon.nombre} />
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    btnMascota.addEventListener("click", seleccionarMascotaJugador)
    seccionSeleccionarAtaque.style.display = "none"
    seccionReiniciar.style.display = "none"
}

const crearMensaje = (veredictoFinal) => {
let nuevoAtaqueDelJugador = document.createElement("p")
let nuevoAtaqueDelEnemigo = document.createElement("p")

    seccionMensajes.innerHTML = veredictoFinal
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    checkWin(veredictoFinal)
}

const seleccionarMascotaJugador = () => {
    let resp = ""
    const inputHipodoge = document.getElementById("Hipodoge")
    const inputCapipepo = document.getElementById("Capipepo")
    const inputRatigueya = document.getElementById("Ratigueya")

    if(inputHipodoge.checked){
        mascotaJugador = mokepones[0]
        resp = inputHipodoge.id
    }else if(inputCapipepo.checked){
        mascotaJugador = mokepones[1]
        resp = inputCapipepo.id
    }else if(inputRatigueya.checked){
        mascotaJugador = mokepones[2]
        resp = inputRatigueya.id
    }else{
        alert("Debes elegir una mascota")
    }

    if(resp !== ""){
        spanMascotaJugador.innerHTML = resp
        mascotaJugador = resp
        seccionSeleccionarAtaque.style.display = "flex"
        seccionSeleccionarMascota.style.display = "none"
        extraerAtaques(mascotaJugador)
        seleccionarMascotaEnemigo()
    }
}

const extraerAtaques = (mascotaJugador) => {
    const ataques = mokepones.find(mokepon => mokepon.nombre == mascotaJugador).ataques
    let number = 0
    ataques.forEach((ataque) => {
        opcionDeAtaque = `
        <button 
        id=${ataque.id + number}
        class="boton-de-ataque" 
        onclick="ataque('${ataque.nombre}', '${ataque.id + number}')">
        ${ataque.nombre}
        </button>
        `
        opcionesAtaques.innerHTML += opcionDeAtaque
        number++
    })
}

const seleccionarMascotaEnemigo = () => {
    const mascotaAleatoria = mokepones[aleatorio(0, mokepones.length-1)]
    mascotaEnemigo = mascotaAleatoria
    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre
}

const ataqueAleatorioEnemigo = () => {
    let setAtaques = new Set()
    const ataquesMascotaEnemigo = mascotaEnemigo.ataques.map((ataqueIndividual) => {
        ataqueIndividual.id = ataqueIndividual.id + Math.random()
        return ataqueIndividual
    })
    
    while(setAtaques.size < 5){
        const ataque = ataquesMascotaEnemigo[aleatorio(0, ataquesMascotaEnemigo.length-1)]
        setAtaques.add(ataque)
    }
    arrayAtaques = Array.from(setAtaques.values())

    arrayAtaques.forEach((ataqueIndividual) => {
        ataqueEnemigo.push(ataqueIndividual.nombre)
    })
    
    combate()
}

const ataque = (elemento, btnId) => {
    ataqueJugador.push(elemento)
    turnosJugador--

    disableButtons(btnId)
    if(turnosJugador === 0){
        ataqueAleatorioEnemigo()
    }
}

const combate = () => {
    let contador = 0
    let veredicto = ""
    let puntosJugador = 0
    let puntosEnemigo = 0
    while(contador < 5){
        if(ataqueJugador[contador] === ataqueEnemigo[contador]){
            puntosEnemigo++
            puntosJugador++
        }else if(ataqueJugador[contador] === "🔥" && ataqueEnemigo[contador] === "🌱"){
            puntosJugador++
        }else if(ataqueJugador[contador] === "💧" && ataqueEnemigo[contador] === "🔥"){
            puntosJugador++
        }else if(ataqueJugador[contador] === "🌱" && ataqueEnemigo[contador] === "💧"){
            puntosJugador++
        }else {
            puntosEnemigo++
        }
        contador++
    }

    console.log(puntosJugador)
    console.log(puntosEnemigo)
    
    if(puntosJugador === puntosEnemigo){
        veredicto = "Empate! 💤"
    } else {
        veredicto = puntosJugador > puntosEnemigo ? "Ganaste! 🎉" : "Perdiste 💥"
    }
    crearMensaje(veredicto)
}

const checkWin = (veredictoFinal) => {
    if(veredictoFinal === "Ganaste! 🎉"){
        seccionMensajes.innerHTML = "🎊DERROTASTE AL ENEMIGO!🎊"
    }else if(veredictoFinal === "Perdiste 💥"){
        seccionMensajes.innerHTML = "💀EL ENEMIGO TE DERROTÓ!💀"
    }

    seccionReiniciar.style.display = "flex"
    disableButtons()
}

const disableButtons = (btnId) => {
    boton = document.getElementById(btnId)
    boton.disabled = true
}

const reiniciarJuego = () => {
    window.location.reload()
}

window.addEventListener("load", iniciarJuego)