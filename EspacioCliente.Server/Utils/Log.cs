using EspacioCliente.Data.Models;

namespace EspacioCliente.Server.Utils
{
    public class Logging
    {
        public static void Registrar(EspacioClienteContext context, string mensaje)
        {
            try
            {
                Log log = new Log()
                {
                    Fecha = DateTime.Now,
                    Texto = mensaje
                };
                context.Log.Add(log);
                context.SaveChanges();
            }
            catch { }
        }
    }
}
