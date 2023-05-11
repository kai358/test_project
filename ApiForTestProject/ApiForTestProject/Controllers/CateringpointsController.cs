using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiForTestProject.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiForTestProject.Controllers
{
    [Route("api/[controller]")]
    public class CateringpointsController : ControllerBase
    {
        private readonly DbAccess dbAccess;

        public CateringpointsController(DbAccess dbAccess)
        {
            this.dbAccess = dbAccess;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = dbAccess.GetCateringPointInfo(id);
            if (result.Count() > 0)
            {
                return Ok(result);
            }
            return NotFound();
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var result = dbAccess.GetAllCateringPoints();
            return Ok(result);
        }
    }
}

