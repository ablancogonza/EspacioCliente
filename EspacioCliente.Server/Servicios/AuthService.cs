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
        public Usuario? Autenticar(string email, string password)
        {
            string pass = Utils.Hash.sha512Hex(password);
            try
            {
                var res = context.Database.SqlQuery<string>($"SELECT [dbo].[AutenticarUsuario]({email},{pass}) as value").FirstOrDefault();
                if (!string.IsNullOrEmpty(res))
                {
                    var usuarios = Newtonsoft.Json.JsonConvert.DeserializeObject<ResultadoAutenticacion[]>(res);
                    if (usuarios?.Length > 0)
                    {
                        var usuario = usuarios.First();
                        return new Usuario(usuario.Id, usuario.Login, usuario.IdRol, usuario.Nodos.Split(',').Select(u => int.Parse(u)).ToList());
                    }                    
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }            
        }
               
    }

    public record Usuario(int IdUsuario, string Email, int Rol, List<int> Nodos);
    public record ResultadoAutenticacion(int Id, string Login, int IdRol, string Nodos);
}
