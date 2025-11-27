using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Test.API.Models.Map;
using Test.API.Services.AuthServices;

namespace Test.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthServices _authServices;

        public AuthController(IAuthServices authServices)
        {
            _authServices = authServices;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserMap userMap)
        {
            var result = await _authServices.SignUp(userMap);
            return Ok(result);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] LoginRequest request)
        {
            var result = await _authServices.SignIn(request.Username, request.Password);
            return Ok(result);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var result = await _authServices.RefreshToken(request.RefreshToken);
            return Ok(result);
        }

        [HttpPost("revoke-token")]
        public async Task<IActionResult> RevokeToken([FromBody] RefreshTokenRequest request)
        {
            var result = await _authServices.RevokeToken(request.RefreshToken);
            return Ok(result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            var result = await _authServices.Logout(request.UserId);
            return Ok(result);
        }
    }
    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RefreshTokenRequest
    {
        public string RefreshToken { get; set; } = string.Empty;
    }

    public class LogoutRequest
    {
        public int UserId { get; set; }
    }
}
