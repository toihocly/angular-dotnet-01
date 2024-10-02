using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(8), MinLength(4)]
    public string Password { get; set; } = string.Empty;
}
