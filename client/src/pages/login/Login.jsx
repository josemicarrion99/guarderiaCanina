import { useContext, useState } from "react";
import "./login.scss"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [err, setErr] = useState(null);

    const navigate = useNavigate();


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { login } = useContext(AuthContext);


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setErr(err.response.data)
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Bienvenido a guardería canina!!</h1>
                    {/* <p>asdfafiowejfiojfweoijfewaoijfoiwaeefjoiafsj</p> */}
                    <span>¿No tienes una cuenta?</span>
                    <Link to="/register">
                        <button>Registrarse</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Inicio de sesión</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        {err && err} {/*si hay un error lo mostramos*/}
                        <button className="button-29-purple" onClick={handleLogin}>Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;