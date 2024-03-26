using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookController(ApplicationDbContext context)
        {
            _context = context;
        }




        //create a new book request
        [HttpPost("CreateRequest")]
        public async Task<IActionResult> CreateRequestAsync(string email, BookRequest request)
        {
            if (ModelState.IsValid)
            {

                var citizen = await _context.Citizens.FirstOrDefaultAsync(c => c.Email == email);


                if (citizen == null) return BadRequest(new { message = "Não foi encontrado nenhum cidadão", ModelState });


                var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == request.Book.Id);


                if (book == null) return BadRequest(new { message = "Não foi encontrado nenhum livro", ModelState });

                request.Citizen = citizen;
                request.Book = book;
                request.Status = BookRequestStatus.Reserved;


                _context.BookRequests.Add(request);
                await _context.SaveChangesAsync();

                return Ok();

            }
            else
            {
                return BadRequest(new { message = "Pedido inválido", ModelState });
            }
        }


        [HttpPost("BorrowBook")]
        public async Task<IActionResult> BorrowBookAsync(int requestId)
        {
            var request = await _context.BookRequests.FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            request.Status = BookRequestStatus.Borrowed;
            request.BorrowedDate = DateTime.Now;

            //if there is no return date, set it to 15 days from now
            if (request.ReturnDate == null)
            {
                request.ReturnDate = DateTime.Now.AddDays(15);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }



        /**
         * Retorna todos os pedidos de empréstimo
         */
        [HttpGet("GetRequests")]
        public IActionResult GetRequest()
        {
            var bookRequests = _context.BookRequests.Where(b => b.Status != BookRequestStatus.Denied && b.Status != BookRequestStatus.Delivered).Include(b=> b.Book).ToList();
            return Ok(bookRequests);
        }


        /**
         * Não aceita o pedido de empréstimo
         */
        [HttpPost("DenyRequest")]
        public async Task<IActionResult> DenyRequestAsync(int requestId)
        {
            var request = await _context.BookRequests.FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            request.Status = BookRequestStatus.Denied;

            await _context.SaveChangesAsync();

            return Ok();
        }

        /**
         * Completa a entrega do livro
         */
        [HttpPost("DeliverBook")]
        public async Task<IActionResult> DeliverBookAsync(int requestId)
        {
            var request = await _context.BookRequests.FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            request.Status = BookRequestStatus.Delivered;
            request.DeliveredDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpDelete("DeleteRequest")]
        public async Task<IActionResult> DeleteRequestAsync(int requestId)
        {
            var request = await _context.BookRequests.FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            _context.BookRequests.Remove(request);
            await _context.SaveChangesAsync();

            return Ok();
        }












    }
}
