using EspacioCliente.Server.Servicios;
using EspacioCliente.Server.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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
        ClockSkew = TimeSpan.Zero 
    };
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer",
        new OpenApiSecurityScheme
        {
            Description = "Web API protegida con JWT",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
{
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference()
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            },
            Scheme = "oauth2",
            Name = "Bearer",
            In = ParameterLocation.Header,
        },
        new List<string>()
    }
});
});

builder.Services.AddDbContext<EspacioCliente.Data.Models.EspacioClienteContext>(options => options.UseSqlServer(builder.Configuration["DB_Conexion"]));

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
