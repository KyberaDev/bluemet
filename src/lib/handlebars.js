module.exports = {
    if_eq: (a, b, opts) => {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },
    buttons_users_dashboard: (a, b, habilitado, id) => {
        if (a == b && a != 1 && habilitado == 1) {
            return `
            
            <form action='/dashboard/editUser/${id}' method='get'>
                <button class="item-button" id="editUser" type='submit'>
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </form>
            <form action='/dashboard/disableUser/${id}' method='post'>
                <button class="item-button" id="disableUser" type='submit'>
                    <i class="fa-solid fa-lock-open"></i>
                </button>
            </form>
            `;
        } else if( a == b && a != 1 && habilitado != 1){
            return `
            <form action='/dashboard/editUser/${id}' method='get'>
                <button class="item-button" id="editUser" type='submit'>
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </form>
            <form action='/dashboard/enableUser/${id}' method='post'>
                <button class="item-button" id="disableUser" type='submit'>
                    <i class="fa-solid fa-lock"></i>
                </button>
            </form>
            `;
        } else if( a == b && a == 1 && habilitado != 1){
            return `
            <form action='/dashboard/enableUser/${id}' method='post'>
                <button class="item-button" id="disableUser" type='submit'>
                    <i class="fa-solid fa-lock"></i>
                </button>
            </form>
            `;
        }else if (a == b && a == 1 && habilitado == 1) {
            return `
            <form action='/dashboard/disableUser/${id}' method='post'>
                <button class="item-button" id="disableUser" type='submit'>
                    <i class="fa-solid fa-lock-open"></i>
                </button>
            </form>
            `;
        } else {
            return '';
        }
    },
    tipo_usuario: (tipo) => {
        if (tipo == 1) {
            return `
            <option value="1" selected>Administrador</option>
            <option value="2">Gestor de Productos</option>
            `;
        }else{
            return `
            <option value="1">Administrador</option>
            <option value="2" selected>Gestor de Productos</option>
            `;
        }
    },
    if_eq_or: (a, b, c, opts) => {
        if (a == b || a == c) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },
    sideBarNameLetters: (name) => {
        name = name.toUpperCase();
        const surnameLetter = name.indexOf(' ') + 1;

        return name.slice(0, 1) + name[surnameLetter]
    },
    tipoUsuario: (tipoUsuario) => {
        switch (tipoUsuario) {
            case 1:
                tipoUsuario = '<i class="fa-solid fa-hammer"></i> Administrador'
                break;
            case 2:
                tipoUsuario = '<i class="fa-solid fa-dolly"></i> Gestor de productos'
                break;
            default:
                tipoUsuario = '<i class="fa-solid fa-user-tie"></i> Desarrollador'
                break;
        }
        return tipoUsuario;
    },
    if_not: (user) => {
        if (!user) {
            return `      <a class="login-button" href="/signin"
            ><i class="fas fa-arrow-right-to-bracket"></i> Login</a
          >
          <button id="button-responsive-menu" onclick="toggleNav()"><i class="fas fa-bars"></i></button>`
        }
    },
    if_not_tipo: (tipo) => {
        if (!tipo) {
            return '-'
        } else {
            return tipo
        }
    },
    Procedencia: (procedencia) => {
        switch (procedencia) {
            case 1:
                procedencia = 'Fabricación Nacional'
                break;
            case 2:
                procedencia = 'Productos Importados'
                break;
        }
        return procedencia
    }
}
