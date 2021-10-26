// COnfiguracion e inicializacion de la base de datos
import { initializeApp } from 'firebase/app'
// Referencia a la base de datos
import { getFirestore } from 'firebase/firestore'
// Referencia al paquete de autenticacion
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
// Metodos de interaccion con la base de datos
import { addDoc, collection, getDocs, query, getDoc, doc, updateDoc, deleteDoc, where } from 'firebase/firestore'
import { useHistory } from 'react-router';

const firebaseConfig = {
  apiKey: "AIzaSyC2-I3QyI3VfrCHyjAE5vK81LzCxNeCycE",
  authDomain: "misiontic2022-df733.firebaseapp.com",
  projectId: "misiontic2022-df733",
  storageBucket: "misiontic2022-df733.appspot.com",
  messagingSenderId: "883830207830",
  appId: "1:883830207830:web:cfae93fc9d5629e23f92f7",
  measurementId: "G-RWESBZBJMY"
};

initializeApp(firebaseConfig);
const database = getFirestore();
const auth = getAuth();
export let usuario;



// Guardar base de datos
export const guardarDatabase = async (nombreColeccion, data) => {

  try {
    const respuesta = await addDoc(collection(database, nombreColeccion), data)
   
    return respuesta
  } catch (e) {
    throw new Error(e)
  }

}

// getAll()
export const consultarDatabase = async (nombreColeccion) => {
  try {
    const respuesta = await getDocs(query(collection(database, nombreColeccion)))
   

    const coleccionDatos = respuesta.docs.map((documento) => {
      
      const documentoTemporal = {
        id: documento.id,
        ...documento.data()
      }
     
      return documentoTemporal
    })

    return coleccionDatos
  } catch (e) {
    throw new Error(e)
  }
}

// gteDocumentById()
// Consultar un documento
export const consultarDocumentoDatabase = async (nombreColeccion, id) => {
  try {
    const respuesta = await getDoc(doc(database, nombreColeccion, id))
    

    const documentoTemporal = {
      id: respuesta.id,
      ...respuesta.data()
    }

    
    return documentoTemporal
  } catch (e) {
    throw new Error(e)
  }
}

// Actualizacion de un documento
export const actualizarDocumentoDatabase = async (nombreColeccion, id, data) => {
  try {
   
    const respuesta = await updateDoc(doc(database, nombreColeccion, id), data)
    
  } catch (e) {
    throw new Error(e)
  }
}

// Eliminacion de un documento
export const eliminarDocumentoDatabase = async (nombreColeccion, id) => {
  try {
    const respuesta = await deleteDoc(doc(database, nombreColeccion, id))
    
  } catch (e) {
    throw new Error(e)
  }
}

// CrearUsuarios
export const crearUsuario = async (data) => {
  try {
    const credencialesUsuario = await createUserWithEmailAndPassword(auth, data.email, data.password)
    
    const user = {
      codigo: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email,
      nombres: data.nombres,
      apellidos: data.apellidos,
      activo: data.estado,
      perfil: data.perfil
    }
    guardarDatabase('usuarios', user)
    return user
  } catch (e) {
    throw new Error(e)
  }
}

// CrearUsuarios
export const editarUsuarios = async (data) => {
  try {
    /*if (!(data.password === undefined){
      const credencialesUsuario = await auth.updatePassword() updateUserWithEmailAndPassword(auth, data.email, data.password)
    }*/
    
    const user = {
      email: data.email,
      nombres: data.nombres,
      apellidos: data.apellidos,
      activo: data.estado,
      perfil: data.perfil
    }
    
    actualizarDocumentoDatabase('usuarios',data.id, user)
    return user
  } catch (e) {
    throw new Error(e)
  }
}

// Login Usuarios
export const loginUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await signInWithEmailAndPassword(auth, email, password)
    

    return credencialesUsuario.user
  } catch (e) {
    return undefined
  }
}


// LogOut -> salir
export const logOutUsuario = async () => {
  try {
    const respuesta = await signOut(auth)
   
  } catch (e) {
    throw new Error(e)
  }
}



//permite validar usuarios
export const validarUsuario = async (nombreColeccion, email1) => {
  try {
    const emailRef = collection(database, nombreColeccion);

    const q = query(emailRef, where("email", "==", email1));
    const querySnapshot = await getDocs(q);
    let documentoTemporal
    querySnapshot.forEach((doc) => {

      documentoTemporal = {
        id: doc.id,
        ...doc.data()
      }

    });

    return documentoTemporal

  } catch (e) {
    return undefined
  }


}


//permite la búsqueda de clientes por número de documento
export const buscarCliente = async (nombreColeccion, documento) => {
  try {
    const emailRef = collection(database, nombreColeccion);

    const q = query(emailRef, where("documento", "==", documento));
    const querySnapshot = await getDocs(q);
    let documentoTemporal
    querySnapshot.forEach((doc) => {

      documentoTemporal = {
        id: doc.id,
        ...doc.data()
      }

    });

    return documentoTemporal

  } catch (e) {
    return undefined
  }


}

//  datos usuario
export const datosUsuario = async () => {
  try {
    const user = auth.currentUser
    

    if (user) {
     
      return user
    } else {
      
      return undefined

    }

  } catch (e) {
    throw new Error(e)
  }
}


// el.addEventListener('click', function)
// Usuario Activo
onAuthStateChanged(auth, (user) => {

  if (user) {
    usuario = user
    
  } else {
    
    usuario = undefined

  }

})