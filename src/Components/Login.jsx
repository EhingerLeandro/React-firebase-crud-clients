import {useState} from 'react';
import users2 from '../assets/users-2.png';
import users3 from '../assets/users-3.png';
import './login.css';

import firebaseApp from '../Firebase/Firebase';
import {getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword} from 'firebase/auth';
const auth = getAuth(firebaseApp);


export const Login = () =>{

    const [register, setRegister] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const email= e.target.email.value;
        const contraseña = e.target.contraseña.value;
        
        if(register){
            await createUserWithEmailAndPassword(auth, email, contraseña);
        }else{
            await signInWithEmailAndPassword(auth, email, contraseña);
        }
    };

    return(
        <div className='row container px-4'>
            <div className="col-md-8 carousel-section ">
                <div id="carouselExampleIndicators" className="carousel slide carousel-all" data-bs-ride="carousel" data-bs-interval="4000">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={users2} className="image-login" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src={users3} className="image-login" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="col-md-4 form " >
                <div className='mt-2'>
                    <h3 >{register ? 'Registro' : 'Inicio de Sesión'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <label className='form-label'> Email</label><br/>
                            <input type='email' className='form-control' placeholder='Introduce Email' id='email' required/>
                        </div>
                        <div className='mb-2'>
                            <label className='form-label'> Contraseña</label><br/>
                            <input type='password' className='form-control' placeholder='Introduce Contraseña' id='contraseña' required/>
                        </div>
                        <button className='btn btn-primary mt-2 mb-2' >
                            {register ? 'Registrar' : 'Iniciar Sesión'}
                        </button>
                    </form>
                    <div>
                        <button className='btn btn-secondary mt-2 form-control' onClick={()=>setRegister(!register)}>
                            {register ? 'Ya tienes cuenta? Inicia Sesión':'No tienes cuenta? Registrate'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}