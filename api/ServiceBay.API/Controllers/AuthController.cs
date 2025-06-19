using Microsoft.AspNetCore.Mvc;

namespace ServiceBay.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (request.Email == "demo@example.com" && request.Password == "password")
        {
            var user = new { Id = 1, request.Email, Name = "Demo User" };
            var token = "fake-jwt-token";

            return Ok(new { user, token });
        }

        return Unauthorized(new { error = "Invalid credentials" });
    }
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
