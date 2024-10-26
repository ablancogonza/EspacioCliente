namespace EspacioCliente.Server.Utils
{
    public static class UsuarioExtension
    {
        public static int IdUsuario(this System.Security.Claims.ClaimsPrincipal user)
        {
            return int.Parse((user.FindFirst(System.Security.Claims.ClaimTypes.Sid)?.Value)??"0");
        }
    }
}
