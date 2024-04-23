using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly ApplicationDbContext _context;

        public BookController(IHttpClientFactory httpClientFactory, ApplicationDbContext context)
        {
            _httpClient = httpClientFactory.CreateClient();
            _context = context;
        }

        /// <summary>
        /// Obter informações do livro através da API do Google Books
        /// </summary>
        /// <param name="isbn"></param>
        /// <returns>A informação de um livro</returns>
        [HttpGet("GetBookInfoAPI")]
        public async Task<IActionResult> GetBookInfoAPI(string isbn)
        {
            var response = await _httpClient.GetAsync($"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine(content);
                return Content(content, "application/json");
            }

            return StatusCode((int)response.StatusCode, response.ReasonPhrase);
        }

        /// <summary>
        /// Obter todos os livros de um município
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns>Os livros de um município</returns>
        [HttpGet("GetBooks")]
        public IActionResult GetBooks(string municipality)
        {
            if (string.IsNullOrEmpty(municipality))
            {
                return BadRequest("O Município não pode ser nulo ou vazio");
            }

            var books = _context.Books.Where(b => b.Municipality == municipality).ToList();

            

            return new JsonResult(books);
        }


        /// <summary>
        /// Criar um novo livro
        /// </summary>
        /// <param name="newBook"></param>
        /// <returns>A mensagem de resultado</returns>
        [HttpPost("CreateBook")]
        public IActionResult CreateBook(Book newBook)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (newBook == null)
                    {
                        return BadRequest("O objeto de livro recebido está vazio.");
                    }

                    // Verificar se o ISBN não está vazio antes de realizar a verificação
                    if (!string.IsNullOrEmpty(newBook.ISBN))
                    {
                        // Verificar se já existe um livro com o mesmo ISBN, mesmo município e o livro disponível
                        var existingBook = _context.Books.FirstOrDefault(b => b.ISBN == newBook.ISBN
                                                                        && b.Municipality == newBook.Municipality
                                                                        && b.Status == BookStatus.Available);
                        if (existingBook != null)
                        {
                            // Se já existe um livro com o mesmo ISBN e município, retornar um BadRequest
                            return BadRequest("Já existe um livro com o mesmo ISBN e Município.");
                        }
                    }

                    // Adicionar o novo livro ao contexto e salvar as alterações no banco de dados
                    var created = _context.Books.Add(newBook);
                    _context.SaveChanges();

                    // Retornar um Ok para indicar que o livro foi adicionado com sucesso
                    return Ok(created.Entity);
                }

                return BadRequest(new { message = "Modelo inválido", ModelState });
            }
            catch (Exception ex)
            {
                // Lidar com exceções e retornar um código de status de erro
                return StatusCode(500, $"Erro ao criar livro: {ex.Message}");
            }
        }

        /// <summary>
        /// Obter um livro por ID
        /// </summary>
        /// <param name="bookId"></param>
        /// <returns>O livro</returns>
        [HttpGet("GetBookById")]
        public IActionResult GetBookById(int bookId)
        {
            var book = _context.Books.FirstOrDefault(b => b.Id == bookId);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        /// <summary>
        /// Atualizar um livro
        /// </summary>
        /// <param name="book"></param>
        /// <returns>A atualização de um livro</returns>
        [HttpPut("UpdateBook")]
        public IActionResult UpdateBook(Book book)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (book == null)
                    {
                        return BadRequest(new { message = "O objeto de livro recebido está vazio." });
                    }

                    // Verificar se o livro com o ID fornecido existe no banco de dados
                    var existingBook = _context.Books.Find(book.Id);
                    if (existingBook == null)
                    {
                        return NotFound(new { message = "Livro não encontrado." });
                    }


                    



                    // Atualizar os detalhes do livro existente com os detalhes do livro atualizado
                    existingBook.ISBN = book.ISBN;
                    existingBook.Title = book.Title;
                    existingBook.Author = book.Author;
                    existingBook.AvailableCopies = book.AvailableCopies;
                    existingBook.Copies = book.Copies;
                    existingBook.CoverImage = book.CoverImage;
                    existingBook.Edition = book.Edition;
                    existingBook.Genre = book.Genre;
                    existingBook.Language = book.Language;
                    existingBook.PublicationDate = book.PublicationDate;
                    existingBook.Publisher = book.Publisher;
                    existingBook.Sinopsis = book.Sinopsis;
                    existingBook.Status = book.Status;
                    existingBook.Municipality = book.Municipality;

                    // Salvar as alterações no banco de dados
                    _context.SaveChanges();

                    // Retornar um Ok para indicar que o livro foi atualizado com sucesso
                    return Ok(new { message = "O livro foi atualizado com sucesso" });
                }

                return BadRequest(new { message = "Modelo inválido", ModelState });
            }
            catch (Exception ex)
            {
                // Lidar com exceções e retornar um código de status de erro
                return StatusCode(500, $"Erro ao atualizar livro: {ex.Message}");
            }
        }

        /// <summary>
        /// Apagar um livro por ID
        /// </summary>
        /// <param name="bookId"></param>
        /// <returns>A mensagem de resultado</returns>
        [HttpDelete("DeleteBookById")]
        public async Task<IActionResult> DeleteBookById(int bookId)
        {
            var book = _context.Books.Find(bookId);
            Console.WriteLine(book);
            if (book == null)
            {
                return NotFound(new { message = "Não foi possível encontrar o livro" });
            }

            var requests = await _context.BookRequests.AnyAsync(br => br.Book.Id == bookId);

            if (requests)
            {
                book.Status = BookStatus.Unavailable;
                await _context.SaveChangesAsync();
                return Ok(new { message = "O livro foi marcado como indisponível porque existem pedidos deste livro." });
            }
            else
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
                return Ok(new { message = "O livro foi removido com sucesso" });
            }
        }




        /// <summary>
        /// Cria um pedido de requisição de livro
        /// </summary>
        /// <param name="email"></param>
        /// <param name="request"></param>
        /// <returns>A mensagem do resultado</returns>
        [HttpPost("CreateRequest")]
        public async Task<IActionResult> CreateRequestAsync(string email, BookRequest request)
        {


            if (ModelState.IsValid)
            {

                var citizen = await _context.Citizens.FirstOrDefaultAsync(c => c.Email == email);

                if (citizen == null) return BadRequest(new { message = "Cidadão não registado, Enviar convite?" });

                var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == request.Book.Id);

                if (book == null) return BadRequest(new { message = "Não foi encontrado nenhum livro", ModelState });

                if (book.Status == BookStatus.Unavailable) return BadRequest(new { message = "O livro não está disponível" });


                //if the citizen is not from the same municipality as the book
                if (citizen.Municipality != book.Municipality) return BadRequest(new { message = "O cidadão não é do mesmo município que o livro" });

                //if the citizen already has a request for the same book
                var existingRequest = await _context.BookRequests.FirstOrDefaultAsync(r => r.Citizen.Id == citizen.Id && r.Book.Id == book.Id && r.Status != BookRequestStatus.Delivered && r.Status != BookRequestStatus.Denied);
                if (existingRequest != null) return BadRequest(new { message = "O cidadão já fez um pedido para este livro" });


                

                if (book.AvailableCopies == 0) return BadRequest(new { message = "Não há cópias disponíveis deste livro" });


                request.ReservationLimitDate = DateTime.Now.AddHours(2);



                request.Citizen = citizen;
                request.Book = book;

                book.AvailableCopies--;


                _context.BookRequests.Add(request);
                await _context.SaveChangesAsync();

                EmailSender.SendBookEmail(email, "Reserva de livro", citizen.firstName, $"Reservou o livro <span style='font-weight: bold;'>{book.Title}</span> de <span style='font-weight: bold;'>{book.Author[0]}</span>. Tem até ({request.ReservationLimitDate}) para levantar o livro.",
               "wwwroot/html/BookEmail.html", book.CoverImage);

                return Ok();

            }
            else
            {
                return BadRequest(new { message = "Pedido inválido", ModelState });
            }

        }




        /// <summary>
        /// Aceita o pedido de empréstimo
        /// </summary>
        /// <param name="requestId"></param>
        /// <param name="returnDate"></param>
        /// <returns>A mensagem de resultado</returns>
        [HttpPost("BorrowBook")]
        public async Task<IActionResult> BorrowBookAsync(int requestId, [FromBody] DateTime returnDate)
        {

            //check if the return date is valid
            if (returnDate < DateTime.Now) return BadRequest(new { message = $"Data de retorno inválida, data: {returnDate}" });

            var request = await _context.BookRequests.Include(br => br.Citizen)
                                                     .Include(br => br.Book)
                                                     .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            request.Status = BookRequestStatus.Borrowed;
            request.BorrowedDate = DateTime.Now;
            request.ReturnDate = returnDate;

            //if there is no return date, set it to 15 days from now
            if (request.ReturnDate == null)
            {
                request.ReturnDate = DateTime.Now.AddDays(15);
            }

            await _context.SaveChangesAsync();

            EmailSender.SendBookEmail(request.Citizen.Email, "Requisição de livro", request.Citizen.firstName, $"Você requisitou o livro <span style='font-weight: bold;'>{request.Book.Title}</span> de <span style='font-weight: bold;'>{request.Book.Author[0]}</span>. Tem até ({request.ReturnDate}) para entregar o livro.",
               "wwwroot/html/BookEmail.html", request.Book.CoverImage);

            return Ok();
        }



        /// <summary>
        /// Obtém todos os pedidos de requisição de livro
        /// </summary>
        /// <returns>Os pedidos realizados</returns>
        [HttpGet("GetRequests")]
        public IActionResult GetRequest()
        {
            var bookRequests = _context.BookRequests.Include(b => b.Book).Include(b => b.Citizen).ToList();
            return Ok(bookRequests);
        }


        /// <summary>
        /// Obtém todos os pedidos de requisição de livro de um município
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns>Os pedidos de livros de um município</returns>
        [HttpGet("GetRequestsByMunicipality")]
        public IActionResult GetRequestsByMunicipality(string municipality)
        {
            var bookRequests = _context.BookRequests.Where(b => b.Municipality == municipality).Include(b => b.Book).Include(b => b.Citizen).ToList();
            return Ok(bookRequests);
        }


        /// <summary>
        /// Obtém todos os pedidos de requisição de livro de um cidadão
        /// </summary>
        /// <param name="email"></param>
        /// <returns>Os pedidos de um cidadão</returns>
        [HttpGet("GetRequestsByCitizen")]
        public IActionResult GetRequestsByCitizen(string email)
        {
            var bookRequests = _context.BookRequests.Where(b => b.Citizen.Email == email).Include(b => b.Book).Include(b => b.Citizen).ToList();
            return Ok(bookRequests);
        }

        /// <summary>
        /// Obtém todos as diferentes categorias de livros de um município
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns>As categorias de livros de um município</returns>
        [HttpGet("GetDistinctCategoriesByMunicipality")]
        public IActionResult GetDistinctCategoriesByMunicipality(string municipality)
        {
            var bookGenres = _context.Books
                .Where(b => b.Municipality == municipality)
                .ToList() // Convertendo para lista em memória
                .SelectMany(b => b.Genre)
                .Distinct()
                .ToList();

            if (bookGenres.Count == 0)
            {
                return NotFound("Nenhum município correspondente encontrado.");
            }

            return Ok(bookGenres);
        }





        /// <summary>
        /// Recusa o pedido de empréstimo
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns>A mensagem de resultado</returns>
        [HttpPost("DenyRequest")]
        public async Task<IActionResult> DenyRequestAsync(int requestId)
        {
            var request = await _context.BookRequests.Include(br => br.Citizen)
                                                     .Include(br => br.Book)
                                                     .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            request.Status = BookRequestStatus.Denied;

            //increase available copies of the book
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == request.Book.Id);
            book.AvailableCopies++;

            await _context.SaveChangesAsync();

            EmailSender.SendBookEmail(request.Citizen.Email, "Reserva de livro recusada", request.Citizen.firstName, $"O seu pedido de reserva, do livro <span style='font-weight: bold;'>{request.Book.Title}</span> de <span style='font-weight: bold;'>{book.Author[0]}</span>, foi recusado!",
               "wwwroot/html/BookEmail.html", request.Book.CoverImage);

            return Ok();
        }


        /// <summary>
        /// Completa o pedido de empréstimo
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns>A mensagem de resultado</returns>
        [HttpPost("DeliverBook")]
        public async Task<IActionResult> DeliverBookAsync(int requestId)
        {
            var request = await _context.BookRequests.Include(br => br.Citizen)
                                                     .Include(br => br.Book)
                                                     .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            request.Status = BookRequestStatus.Delivered;
            request.DeliveredDate = DateTime.Now;

            //increase available copies of the book
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == request.Book.Id);
            book.AvailableCopies++;

            await _context.SaveChangesAsync();
            EmailSender.SendBookEmail(request.Citizen.Email, "Livro entregue", request.Citizen.firstName, $"Você entregou o livro <span style='font-weight: bold;'>{request.Book.Title}</span> de <span style='font-weight: bold;'>{book.Author[0]}</span>.",
               "wwwroot/html/BookEmail.html", request.Book.CoverImage);
            return Ok();
        }


        /// <summary>
        /// Apaga um pedido de requisição de livro
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns>A mensagem de resultado</returns>
        [HttpDelete("DeleteRequest")]
        public async Task<IActionResult> DeleteRequestAsync(int requestId)
        {
            var request = await _context.BookRequests.Include(br => br.Citizen)
                                                     .Include(br => br.Book)
                                                     .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            //increase available copies of the book
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == request.Book.Id);
            book.AvailableCopies++;

            EmailSender.SendBookEmail(request.Citizen.Email, "Cancelamento de reserva de livro", request.Citizen.firstName, $"Você cancelou a reserva do livro <span style='font-weight: bold;'>{request.Book.Title}</span> de <span style='font-weight: bold;'>{book.Author[0]}</span>.",
               "wwwroot/html/BookEmail.html", request.Book.CoverImage);

            _context.BookRequests.Remove(request);
            await _context.SaveChangesAsync();

            return Ok();
        }


        /// <summary>
        /// Cologa a entrega em atraso
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns>A mensagem de resposta</returns>
        [HttpPost("DelayRequest")]
        public async Task<IActionResult> DelayRequestAsync(int requestId)
        {
            var request = await _context.BookRequests.FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) return BadRequest(new { message = "Pedido não encontrado" });

            request.Status = BookRequestStatus.Delayed;

            await _context.SaveChangesAsync();

            return Ok();
        }


        /// <summary>
        /// Retorna os pedidos de um livro
        /// </summary>
        /// <param name="bookId"></param>
        /// <returns>A mensagem de resposta</returns>
        [HttpGet("GetRequestsByBookId")]
        public IActionResult GetRequestsByBookId(int bookId)
        {
            var request = _context.BookRequests.Include(br => br.Citizen)
                                                     .Include(br => br.Book)
                                                     .Where(r => r.Book.Id == bookId).ToList();

            if (request == null) return NotFound(new { message = "Pedido não encontrado" });

            return Ok(request);
        }




        /// <summary>
        /// Envia email de atraso do livro
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <param name="bookImage"></param>
        /// <param name="bookName"></param>
        /// <param name="bookAuthor"></param>
        /// <param name="returnDate"></param>
        /// <returns>Email</returns>
        [HttpPost("SendDelayedEmail")]
        public IActionResult SendDelayedEmail(string email, string name, string bookImage, string bookName, string bookAuthor, string returnDate)
        {
            EmailSender.SendBookEmail(email, "Entrega de livro", name, $"Por favor, entregue o livro <span style='font-weight: bold;'>{bookName} de {bookAuthor}</span>. Uma vez que a data de entrega ({returnDate}) foi ultrapassada.",
                "wwwroot/html/BookEmail.html", bookImage);
            return Ok();
        }

        /// <summary>
        /// Envia email de convite
        /// <paramref name="email"/>
        /// <returns>Email</returns>
        [HttpPost("SendInviteEmail")]
        public IActionResult SendInviteEmail(string email) 
        {
            //email nao está na yabela cidadão
            var emailExists = _context.Citizens.Any(c => c.Email == email);
            if (emailExists) {
                return Ok();
            }
            else {
                EmailSender.SendEmailAproveDeny(email, "Registe-se Na Plataforma", "Cidadão", $"Ao realizar a reserva reparámos que ainda não tem conta na <span style='font-weight: bold;'>Municip.io</span>, Registe-se já aqui!",
    "wwwroot/html/AproveEmail.html");
                return Ok();
            }
            
        }












    }
}


