export const Login = () => {
    return(
        <div className="form-container">
            <form>
                <input type="email" placeholder="Ingrese su correo"/>
                <input type="password" placeholder="Ingrese su contraseña"/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}