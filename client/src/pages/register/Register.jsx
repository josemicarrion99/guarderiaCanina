import "./register.scss"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        type: "",
        phone: ""
    });

    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if(inputs.email.trim().length === 0) return setErr("Rellene el campo email");
        if(inputs.username.trim().length === 0) return setErr("Rellene el nombre de usuario");
        if(inputs.name.trim().length === 0) return setErr("Rellene el campo nombre");
        if(inputs.password.trim().length === 0) return setErr("Rellene el campo contraseña");
        if(inputs.type === "" || inputs.type === "vacia") return setErr("Escoja un tipo");
        if(isNaN(+inputs.phone) || inputs.phone.trim().length === 0) return setErr("El número de teléfono no es válido");


        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            navigate("/login");

        }catch(err){
            console.log(err);
        }
    };

    
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Bienvenido a guardería canina!</h1>
                    {/* <p>asdfafiowejfiojfweoijfewaoijfoiwaeefjoiafsj</p> */}
                    <span>¿Ya tienes una cuenta?</span>
                    <Link to="/login">
                        <button>Iniciar sesión</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Registrese a continuación:</h1>
                    <form action="">
                        <input type="text" placeholder="Nombre de usuario" name="username" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
                        <input type="text" placeholder="Nombre" name="name" onChange={handleChange} />
                        <input type="text" placeholder="Número de teléfono" name="phone" onChange={handleChange} />
                        <span>¿Desea cuidar o buscar cuidador?</span>
                        <select name="type" defaultValue="Vacia" onChange={handleChange}>
                            <option value="vacia">Escoja una opción...</option>
                            <option value="cliente">Cliente</option>
                            <option value="cuidador">Cuidador</option>
                        </select>                        
                        {err && err}
                        <button className="button-29-purple" onClick={handleClick}>Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register