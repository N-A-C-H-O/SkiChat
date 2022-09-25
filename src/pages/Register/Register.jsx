export const Register = () => {
    return(
        <div className="form-container">
            <form>
                <input type="text" placeholder="Ingrese su usuario"/>
                <input type="email" placeholder="Ingrese su correo"/>
                <input type="password" placeholder="Ingrese su contraseña"/>
                <input type="file"/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}