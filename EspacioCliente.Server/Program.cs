using EspacioCliente.Server.Servicios;
using EspacioCliente.Server.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "_todos",
                          policy =>
                          {
                              policy.WithOrigins("https://localhost:4200")
                                    .AllowCredentials().
                                    AllowAnyHeader().
                                    AllowAnyMethod();
                          });
    });
}

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt_Issuer"],
        ValidAudience = builder.Configuration["Jwt_Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt_Key"] ?? string.Empty)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero //required if the expire time is <5 minutes
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EspacioCliente.Data.Models.EspacioClienteContext>(options => options.UseSqlServer(builder.Configuration["DB_Conexion"]));

//if (builder.Environment.IsDevelopment())
//{
//    string? connectionString = "Data Source=Window11vm;Initial Catalog=EspacioCliente;Integrated Security=True;Trust Server Certificate=True";
//    builder.Services.AddDbContext<EspacioCliente.Data.Models.EspacioClienteContext>(options => options.UseSqlServer(connectionString));
//} 
//else
//{
//    string? connectionString = "Server=tcp:espaciocliente.database.windows.net,1433;Initial Catalog=EspacioCliente;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;User ID=espaciocliente;Password=QaZwSx24.-;";
//    builder.Services.AddDbContext<EspacioCliente.Data.Models.EspacioClienteContext>(options => options.UseSqlServer(connectionString));
//}

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JwtHandler>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseCors();
}

app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.MapControllers().RequireCors("_todos");
}
else
{
    app.MapControllers();
}

app.MapFallbackToFile("/index.html");

app.Run();
