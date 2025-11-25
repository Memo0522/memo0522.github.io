//service worker
if ('serviceWorker' in navigator) {
    console.log('Puedes usar los serviceworker del navegador');

    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('service worker registrado correctamente', res))
        .catch(err => console.log('service worker no se ha podido registrar', err));
}else {
    console.log('No puedes usar los serviceworker del navegador');
}

//scroll suavizado
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
});



import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, updateDoc, deleteDoc, getDoc, onSnapshot, doc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcPD7gkNcYtx-vQy_9s-jZqkjPZYUAzhI",
    authDomain: "pwap-896cb.firebaseapp.com",
    projectId: "pwap-896cb",
    storageBucket: "pwap-896cb.firebasestorage.app",
    messagingSenderId: "324492811632",
    appId: "1:324492811632:web:fc1f3698f7b3c96c5e43b5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------------------
// LISTAR USUARIOS
// ------------------------------
function cargarUsuarios() {
    const tabla = document.getElementById("tabla");

    onSnapshot(collection(db, "crudpwa"), (snapshot) => {
        tabla.innerHTML = "";
        snapshot.forEach(docSnap => {
            const user = docSnap.data();
            tabla.innerHTML += `
                <tr>
                    <td>${user.nombre}</td>
                    <td>${user.correo}</td>
                    <td>${user.telefono}</td>
                    <td>${user.edad}</td>
                    <td>${user.direccion}</td>
                    <td>
                        <button onclick="editar('${docSnap.id}')">Editar</button>
                        <button onclick="eliminar('${docSnap.id}')">Eliminar</button>
                    </td>
                </tr>`;
        });
    });
}
cargarUsuarios();

// ------------------------------
// CREAR / EDITAR
// ------------------------------
document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const datos = {
        nombre: nombre.value,
        correo: correo.value,
        telefono: Number(telefono.value),
        edad: Number(edad.value),
        direccion: direccion.value
    };

    if (id === "") {
        await addDoc(collection(db, "crudpwa"), datos);
    } else {
        await updateDoc(doc(db, "crudpwa", id), datos);
    }

    userForm.reset();
    id.value = "";
});

// ------------------------------
// EDITAR
// ------------------------------
window.editar = async (id) => {
    const docSnap = await getDoc(doc(db, "crudpwa", id));
    const user = docSnap.data();

    document.getElementById("id").value = id;
    nombre.value = user.nombre;
    correo.value = user.correo;
    telefono.value = user.telefono;
    edad.value = user.edad;
    direccion.value = user.direccion;
};

// ------------------------------
// ELIMINAR
// ------------------------------
window.eliminar = async (id) => {
    if (confirm("¿Eliminar este usuario?")) {
        await deleteDoc(doc(db, "crudpwa", id));
    }
};
