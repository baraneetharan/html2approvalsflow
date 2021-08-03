using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace callpowerautomate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploaderController : ControllerBase
    {

        private IWebHostEnvironment Environment;

        public UploaderController(IWebHostEnvironment hostingEnvironment)
        {
            this.Environment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] IList<IFormFile> files)
        {
            Console.WriteLine(files.Count);
            string path = Path.Combine(this.Environment.ContentRootPath, "Uploads");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            foreach (IFormFile source in files)
            {
                byte[] buffer = new byte[16 * 1024];
                string fileName = Path.GetFileName(source.FileName);

                using (FileStream output = System.IO.File.Create(Path.Combine(path, fileName)))
                using (Stream input = source.OpenReadStream())
                {
                    int readBytes;

                    while ((readBytes = input.Read(buffer, 0, buffer.Length)) > 0)
                    {
                        await output.WriteAsync(buffer, 0, readBytes);
                    }
                }
            }

            return new ObjectResult("File has been successfully uploaded") { StatusCode = Convert.ToInt32(HttpStatusCode.Created) };
        }

    }
}