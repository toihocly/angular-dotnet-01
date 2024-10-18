using System;
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<MemberDto>> GetUserId(int id)
    {
        var user = await userRepository.GetUserByIdAsync(id);

        var usersToReturn = mapper.Map<MemberDto>(user);

        if (usersToReturn == null) return NotFound();

        return usersToReturn;
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUserId(string username)
    {
        var user = await userRepository.GetMemberByNameAsync(username);

        if (user == null) return NotFound();

        return user;
    }

    [HttpPut()]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (username == null) return BadRequest("No username find in token");

        var user = await userRepository.GetUserByUsernameAsync(username);
        if (user == null) return BadRequest("couldn not find user");

        mapper.Map(memberUpdateDto, user);

        if (await userRepository.SaveAllAsync()) return NoContent();


        return BadRequest("Can't update!");
    }
}
