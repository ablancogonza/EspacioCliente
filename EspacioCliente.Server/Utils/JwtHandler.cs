﻿using EspacioCliente.Server.Servicios;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EspacioCliente.Server.Utils
{
    public class JwtHandler
    {        
        private readonly IConfiguration _configuration;

        public JwtHandler(IConfiguration configuration)
        {
            _configuration = configuration;

        }
        public JwtSecurityToken GetToken(Usuario user)
        {
            var jwt = new JwtSecurityToken(
                issuer: _configuration["Jwt_Issuer"],
                audience: _configuration["Jwt_Audience"],
                claims: GetClaims(user),
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(
                    _configuration["Sesion_Minutos"])),
                signingCredentials: GetSigningCredentials());
            return jwt;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt_Key"]!);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        public static List<Claim> GetClaims(Usuario user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Sid, user.IdUsuario.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Role, user.Rol.ToString()),
                new Claim("Nodos", JsonConvert.SerializeObject(user.Nodos))
            };            
            return claims;
        }
    }
}
