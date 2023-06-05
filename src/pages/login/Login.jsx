import "./login.scss"

const Login = () => {
    return(
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello world.</h1>
                    <p>asdfafiowejfiojfweoijfewaoijfoiwaeefjoiafsj</p>
                    <span>No tienes una cuenta?</span>
                    <button>Register</button>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form action="">
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login