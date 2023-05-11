using ApiForTestProject.Data;
using Microsoft.AspNetCore.Mvc;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiForTestProject.Controllers
{
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly DbAccess dbAccess;

        public ClientsController(DbAccess dbAccess)
        {
            this.dbAccess = dbAccess;
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = dbAccess.GetClientInfo(id);
            if(result.Count() > 0)
            {
                return Ok(result);
            }
            return NotFound();
        }
        [HttpGet]
        public IActionResult GetAllClients()
        {
            var result = dbAccess.GetAllClients();
            return Ok(result);
        }
    }
}

