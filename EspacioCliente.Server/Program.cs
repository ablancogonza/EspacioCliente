using EspacioCliente.Server.Servicios;
using EspacioCliente.Server.Utils;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//var builder = WebApplication.CreateBuilder(new WebApplicationOptions()
//{
//    WebRootPath = "wwwroot/browser"
//});

if (!builder.Environment.IsProduction())
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
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string? connectionString = "Data Source=Window11vm;Initial Catalog=EspacioCliente;Integrated Security=True;Trust Server Certificate=True";
    //builder.Configuration.GetConnectionString("DB:conexion");
builder.Services.AddDbContext<EspacioCliente.Data.Models.EspacioClienteContext>(options => options.UseSqlServer(connectionString));
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

if (!app.Environment.IsProduction())
{
    app.UseCors();
}

app.UseAuthorization();

if (!app.Environment.IsProduction())
{
    app.MapControllers().RequireCors("_todos");
}
else
{
    app.MapControllers();
}

app.MapFallbackToFile("/index.html");

app.Run();
