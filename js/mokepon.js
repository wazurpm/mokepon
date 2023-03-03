let ataqueJugador = ""
let ataqueEnemigo = ""
let vidasJugador = 3
let vidasEnemigo = 3

const aleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const iniciarJuego = () => {
    const btnMascota = document.getElementById("btn-seleccionar-mascota").addEventListener("click", seleccionarMascotaJugador)
    const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    seccionSeleccionarAtaque.style.display = "none"
    const seccionReiniciar = document.getElementById("reiniciar")
    seccionReiniciar.style.display = "none"
}

const crearMensaje = (veredictoFinal) => {
    let seccionMensajes = document.getElementById("resultado")
    let ataquesJugador = document.getElementById("ataques-del-jugador")
    let ataquesEnemigo = document.getElementById("ataques-del-enemigo")
    
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
    const inputHipodoge = document.getElementById("hipodoge").checked
    const inputCapipepo = document.getElementById("capipepo").checked
    const inputRatigueya = document.getElementById("ratigueya").checked
    let spanMascotaJugador = document.getElementById("mascota-jugador")

    if(inputHipodoge){
        resp = "Hipodoge"
    }else if(inputCapipepo){
        resp = "Capipepo"
    }else if(inputRatigueya){
        resp = "Ratigueya"
    }else{
        alert("Debes elegir una mascota")
    }

    if(resp !== ""){
        spanMascotaJugador.innerHTML = resp
        const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
        seccionSeleccionarAtaque.style.display = "flex"
        const seccionSeleccionarMascota = document.getElementById("seleccionar-mascota")
        seccionSeleccionarMascota.style.display = "none"
        seleccionarMascotaEnemigo()
    }
}

const seleccionarMascotaEnemigo = () => {
    const mascota = aleatorio(0, 2)
    const mascotas = ["Hipodoge", "Capipepo", "Ratigueya"]
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")
    spanMascotaEnemigo.innerHTML = mascotas[mascota]
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
    let btnSeleccionarMascota = document.getElementById("btn-seleccionar-mascota")
    let radioHipodoge = document.getElementById("hipodoge")
    let radioCapipepo = document.getElementById("capipepo")
    let radioRatigueya = document.getElementById("ratigueya")
    btnSeleccionarMascota.disabled = true
    radioHipodoge.disabled = true
    radioCapipepo.disabled = true
    radioRatigueya.disabled = true

    if(elemento === "fuego"){
        ataqueJugador = "FUEGO"
    }else if(elemento === "agua"){
        ataqueJugador = "AGUA"
    }else if(elemento === "tierra"){
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
    
    let spanVidasEnemigo = document.getElementById("vidas-enemigo")
    let spanVidasJugador = document.getElementById("vidas-jugador")
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
    let seccionMensajes = document.getElementById("resultado")
    const seccionReiniciar = document.getElementById("reiniciar")
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
    let btnFuego = document.getElementById("btn-fuego")
    let btnAgua = document.getElementById("btn-agua")
    let btnTierra = document.getElementById("btn-tierra")

    btnFuego.disabled = true
    btnAgua.disabled = true
    btnTierra.disabled = true
}

const reiniciarJuego = () => {
    window.location.reload()
}

window.addEventListener("load", iniciarJuego)