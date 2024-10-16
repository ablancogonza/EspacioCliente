using System.Security.Cryptography;
using System.Text;

namespace EspacioCliente.Server.Utils
{
    public class Hash
    {
        public static string sha512Hex(string cadena)
        {
            if (string.IsNullOrEmpty(cadena)) return string.Empty;
            byte[] data = Encoding.UTF8.GetBytes(cadena);
            using (var alg = SHA512.Create())
            {
                alg.ComputeHash(data);
                return BitConverter.ToString(alg.Hash!).Replace("-","");
            }
        }
    }
}
