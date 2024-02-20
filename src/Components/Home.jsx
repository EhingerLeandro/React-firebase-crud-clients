import {useState, useEffect } from "react";
import appFirebase from '../Firebase/Firebase';
import{getAuth, signOut} from 'firebase/auth';
import {ColorRing} from 'react-loader-spinner';
import {getFirestore, collection, getDocs,
    addDoc, getDoc, doc, deleteDoc, setDoc} from 'firebase/firestore';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);


const Home =({emailUser})=>{

    const initialClient= {
        nombre:'',
        edad:'',
        profesion:''
    }

    //variables de estado
    const [loadingList, setLoadingList] = useState(false);
    const [client, setClient] = useState(initialClient);
    const [lista, setLista] = useState([]);
    const [subId, setSubId] = useState('');
    //Este setChange se usa para servir como dependencia en la actualización useState
    const [change, setChange] = useState(false);


    //Función para capturar inputs
    const handleInputs = (e)=>{
        const {name, value} =  e.target;
        setClient({...client, [name]:value});
    }

    //Función que permite guardar clientes creados en el input
    //Luego se le agrego una funcionalidad para actualizar datos
    const saveClient = async(e)=>{
        setChange(!change);
        e.preventDefault();

        if(subId== ''){
            try{
                //Aquí se agrega en la colección específicada
                await addDoc(collection(db, 'clients'), client);
            }catch(error){
                console.log(error);
            }
        }else{
            try{
                //Aquí se agrega en el documento específicado
                await setDoc(doc(db, 'clients', subId), client);
            }catch(error){
                console.log(error);
            }
        }
        
        setClient(initialClient);
        setSubId('');
    }

    //Función que permite borrar uno de los clientes
    const deleteClient= async(paramID)=>{
        setChange(!change);
        try{
           await deleteDoc(doc(db, 'clients', paramID));
        }catch(error){
            console.log(error);
        }
    }

    //Función para renderizar lista de clientes
    useEffect(()=>{
        const getLista = async() =>{
            setLoadingList(true)
            console.log('listening');
            try{
                const querySnapshot = await getDocs(collection(db, 'clients'));
                let arrDocs = [];
                querySnapshot.forEach((itemDoc)=>{
                    arrDocs = [...arrDocs, {...itemDoc.data(), id: itemDoc.id}];
                })
                setLista(arrDocs);
            }catch(error){
                console.log(error);
            }finally{
                setLoadingList(false);
            }
        }  
        getLista()
    }, [change]);

    const getOne = async(id) =>{
        try{
            const snapId = await getDoc(doc(db, 'clients', id));
            setClient(snapId.data());
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(subId !==''){
            getOne(subId); 
        }
    },[subId]);


    return(
        <div className='m-2'>
            <section>
                <p>Bienvenido, <strong> {emailUser}</strong> Sesión Iniciada.</p>
                <button className='btn btn-primary' onClick={()=>signOut(auth)}>Cerrar Sesión</button>
            </section>
            <hr/>
            <section className='row'>
                <div className="col-md-4">
                    <h3 className='text-center'>{subId==''?'Ingresar Cliente':'Actualizar Cliente'}</h3>
                    <form className='card card-body' onSubmit={saveClient}>
                        <input type='text' name='nombre' value={client.nombre} className='form-control mb-2' placeholder='Nombre del cliente' required onChange={handleInputs} autoComplete='off'/>
                        <input type='number' name='edad' value={client.edad} className='form-control mb-2' placeholder='Edad del cliente' required onChange={handleInputs} autoComplete='off'/>
                        <input type='text' name='profesion' value={client.profesion} className='form-control mb-2' placeholder='Profesión del cliente' required onChange={handleInputs} autoComplete='off'/>
                        <button className='btn btn-secondary'>{subId==''?'Guardar':'Actualizar'}</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <h3 className='text-center'>Lista de Clientes</h3>
                    {loadingList? <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}><ColorRing/></div> : 
                    <div className='container card card-body'>
                    {
                        lista.map((itemClient)=>{
                            return(
                                <div key={itemClient.id}>
                                    <p><strong>Nombre:</strong> {itemClient.nombre}</p>
                                    <p><strong>Edad:</strong> {itemClient.edad}</p>
                                    <p><strong>Profesión:</strong> {itemClient.profesion}</p>
                                    <button className='btn btn-success ms-1' onClick={()=>setSubId(itemClient.id)}>
                                        Actualizar
                                    </button>
                                    <button className='btn btn-danger ms-1' onClick={()=>deleteClient(itemClient.id)}>
                                        Eliminar
                                    </button>
                                    <hr/>
                                </div>
                            )
                        })
                    }
                    </div>
                    }
                </div>
            </section>
        </div>
    )
}

export default Home;