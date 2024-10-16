using EspacioCliente.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace EspacioCliente.Server.Servicios
{
    public class AuthService
    {
        private readonly EspacioClienteContext context;

        public AuthService(EspacioClienteContext context)
        {
            this.context = context;
        }
        public async Task<Usuario?> Autenticar(string email, string password)
        {
            string pass = Utils.Hash.sha512Hex(password);
            var usuario = await context.Usuario.FirstOrDefaultAsync(u => u.Login == email && u.Password == pass);            
            return usuario != null ? new Usuario(usuario.Id, usuario.Login, usuario.IdRol, usuario.UsuarioNodo.Select(un => un.IdNodo).ToList()) : null;
        }
               
    }

    public record Usuario(int IdUsuario, string Email, int Rol, List<int> Nodos);
}
