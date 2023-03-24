const btnMascota = document.getElementById("btn-seleccionar-mascota")
const btnFuego = document.getElementById("btn-fuego")
const btnAgua = document.getElementById("btn-agua")
const btnTierra = document.getElementById("btn-tierra")

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

const mascotas = ["Hipodoge", "Capipepo", "Ratigueya"]

let mokepones = []
let opcionDeMokepones = ""
let ataqueJugador = ""
let ataqueEnemigo = ""
let mascotaJugador
let vidasJugador = 3
let vidasEnemigo = 3

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

    checkWin()
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
    ataques.forEach((ataque) => {
        opcionDeAtaque = `
        <button 
        id=${ataque.id} 
        class="boton-de-ataque" 
        onclick="ataque('${ataque.nombre}')">
        ${ataque.nombre}
        </button>
        `
        opcionesAtaques.innerHTML += opcionDeAtaque
    })
}

const seleccionarMascotaEnemigo = () => {
    const mascotaAleatoria = mokepones[aleatorio(0, mokepones.length-1)]
    mascotaEnemigo = mascotaAleatoria
    spanMascotaEnemigo.innerHTML = mascotaAleatoria.nombre
}

const ataqueAleatorioEnemigo = () => {
    const ataque = aleatorio(1, 3)
    if(ataque === 1){
        ataqueEnemigo = "FUEGO"
    } else if(ataque === 2){
        ataqueEnemigo = "AGUA"
    } else if(ataque === 3){
        ataqueEnemigo = "TIERRA"
    }
    combate()
}

const ataque = (elemento) => {
    if(elemento === "🔥"){
        ataqueJugador = "FUEGO"
    }else if(elemento === "💧"){
        ataqueJugador = "AGUA"
    }else if(elemento === "🌱"){
        ataqueJugador = "TIERRA"
    }
    ataqueAleatorioEnemigo()
}

const combate = () => {
    let veredicto = ""
    if(ataqueJugador === ataqueEnemigo){
        veredicto = "Empate 💤"
    }else if(ataqueJugador === "FUEGO" && ataqueEnemigo === "TIERRA"){
        veredicto = "Ganaste! 🎉"
    }else if(ataqueJugador === "AGUA" && ataqueEnemigo === "FUEGO"){
        veredicto = "Ganaste! 🎉"
    }else if(ataqueJugador === "TIERRA" && ataqueEnemigo === "AGUA"){
        veredicto = "Ganaste! 🎉"
    }else{
        veredicto = "Perdiste 💥"
    }
    
    if(veredicto === "Ganaste! 🎉"){
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if(veredicto === "Perdiste 💥"){
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    crearMensaje(veredicto)
}

const checkWin = () => {
    if(vidasEnemigo === 0){
        seccionMensajes.innerHTML = "🎊DERROTASTE AL ENEMIGO!🎊"
        seccionReiniciar.style.display = "flex"
        disableButtons()
    }else if(vidasJugador === 0){
        seccionMensajes.innerHTML = "💀EL ENEMIGO TE DERROTÓ!💀"
        seccionReiniciar.style.display = "flex"
        disableButtons()
    }
}

const disableButtons = () => {
    botonesDeAtaque = Array.from(document.getElementsByClassName("boton-de-ataque"))
    botonesDeAtaque.forEach((boton) => {
        boton.disabled = true
    })
}

const reiniciarJuego = () => {
    window.location.reload()
}

window.addEventListener("load", iniciarJuego)