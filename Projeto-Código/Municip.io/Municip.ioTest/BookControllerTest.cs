using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Municip.io.Server.Controllers;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
using Newtonsoft.Json;
using NuGet.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using Xunit;
using static System.Reflection.Metadata.BlobBuilder;

namespace Municip.ioTest
{
    public class BookControllerTest
    {
        private readonly ApplicationDbContext _context;
        private readonly BookController _bookController;


        private List<Citizen> _citizens = new List<Citizen>
{
    new Citizen
    {
        Email = "test1@example.com",
        firstName = "Filipe",
        status = CitizenStatus.Approved,
        Address = "123 Avenida",
        Gender = "M",
        Municipality = "City",
        Nif = "123456789",
        Surname = "Fonseca",
        photo = "path/to/photo",
        postalCode1 = "1234",
        postalCode2 = "678"
    },
    new Citizen
    {
        Email = "test2@example.com",
        firstName = "Teresa",
        status = CitizenStatus.Approved,
        Address = "123 Rua",
        Gender = "F",
        Municipality = "City",
        Nif = "123456789",
        Surname = "Raquel",
        photo = "path/to/photo",
        postalCode1 = "1235",
        postalCode2 = "678"
    },
    new Citizen
    {
        Email = "test3@example.com",
        firstName = "Pedro",
        status = CitizenStatus.Approved,
        Address = "123 Avenida 456",
        Gender = "M",
        Municipality = "City",
        Nif = "123456789",
        Surname = "Moura",
        photo = "path/",
        postalCode1 = "1234",
        postalCode2 = "679"
    }
};

        private List<Book> _books = new List<Book>{ new Book
                {
                    Id = 1,
                    Title = "Introdução à Programação em C#",
                    Author = new string[] { "Maria Silva" },
                    Publisher = "LivrosTech",
                    ISBN = "1111111111",
                    Genre = new string[] { "Programação", "Tecnologia" },
                    Sinopsis = "Um guia abrangente para a linguagem de programação C#.",
                    CoverImage = "imagem_capa_url.jpg",
                    Language = "Português",
                    Edition = "1ª Edição",
                    PublicationDate = new DateTime(2022, 3, 15),
                    Copies = 50,
                    AvailableCopies = 25,
                    Status = BookStatus.Available,
                    Municipality = "City"
                },
                new Book
                {
                    Id = 2,
                    Title = "A Arte da Ficção",
                    Author = new string[] { "Carlos Oliveira" },
                    Publisher = "Editora Imaginação",
                    ISBN = "2222222222",
                    Genre = new string[] { "Ficção", "Literatura" },
                    Sinopsis = "Um romance envolvente que explora a imaginação e os limites da realidade.",
                    CoverImage = "arte_ficcao.jpg",
                    Language = "Português",
                    Edition = "2ª Edição",
                    PublicationDate = new DateTime(2021, 10, 20),
                    Copies = 30,
                    AvailableCopies = 15,
                    Status = BookStatus.Available,
                    Municipality = "City"
                },
                new Book
                {
                    Id = 3,
                    Title = "O Mistério de Setúbal",
                    Author = new string[] { "Ana Santos" },
                    Publisher = "Edições Mistério",
                    ISBN = "3333333333",
                    Genre = new string[] { "Mistério", "Suspense" },
                    Sinopsis = "Um suspense emocionante que se desenrola nas ruas pitorescas de Setúbal.",
                    CoverImage = "mistério_setúbal.jpg",
                    Language = "Português",
                    Edition = "1ª Edição",
                    PublicationDate = new DateTime(2022, 2, 5),
                    Copies = 20,
                    AvailableCopies = 10,
                    Status = BookStatus.Available,
                    Municipality = "City"
                },
                new Book
                {
                        Id = 4,
                        Title = "Um Drama",
                        Author = new string[] { "Matias Mateus" },
                        Publisher = "Edições Dramáticas",
                        ISBN = "4444444444",
                        Genre = new string[] { "Drama" },
                        Sinopsis = "UM drama muito dramático.",
                        CoverImage = "drama.jpg",
                        Language = "Português",
                        Edition = "1ª Edição",
                        PublicationDate = new DateTime(2022, 2, 5),
                        Copies = 20,
                        AvailableCopies = 10,
                        Status = BookStatus.Available,
                        Municipality = "City"
                }};

        public BookControllerTest()
        {
            // Configurar o contexto do banco de dados em memória
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _context = new ApplicationDbContext(options);
            SeedDatabase(); 
   
            var httpClientFactory = new FakeHttpClientFactory();

            
            _bookController = new BookController(httpClientFactory, _context);
        }

        private void SeedDatabase()
        {
            _context.Citizens.AddRange(_citizens);
            _context.SaveChanges();

            _context.Books.AddRange(_books);
            _context.SaveChanges();


            _context.BookRequests.AddRange(new[]
               {
                new BookRequest
                {
                    Citizen = _context.Citizens.First(c => c.firstName == "Filipe"),
                    Book = _context.Books.First(b => b.Title == "Introdução à Programação em C#"),
                    ReservedDate = new DateTime(2022, 3, 16),
                    ReservationLimitDate = new DateTime(2022, 3, 16).AddHours(2),
                    Municipality = "City",
                    Status = BookRequestStatus.Reserved
                },
                new BookRequest
                {
                    Citizen = _context.Citizens.First(c => c.firstName == "Teresa"),
                    Book = _context.Books.First(b => b.Title == "A Arte da Ficção"),
                    BorrowedDate = new DateTime(2022, 3, 16),
                    ReturnDate = new DateTime(2022, 3, 16).AddDays(14),
                    Municipality = "City",
                    Status = BookRequestStatus.Borrowed
                },
                new BookRequest
                {
                    Citizen = _context.Citizens.First(c => c.firstName == "Teresa"),
                    Book = _context.Books.First(b => b.Title == "A Arte da Ficção"),
                    DeliveredDate = new DateTime(2022, 3, 16),
                    Municipality = "City",
                    Status = BookRequestStatus.Delivered
                },
                new BookRequest
                {
                    Citizen = _context.Citizens.First(c => c.firstName == "Filipe"),
                    Book = _context.Books.First(b => b.Title == "Introdução à Programação em C#"),
                    Municipality = "City",
                    Status = BookRequestStatus.Denied
                },
                new BookRequest
                {
                    Citizen = _context.Citizens.First(c => c.firstName == "Teresa"),
                    Book = _context.Books.First(b => b.Title == "A Arte da Ficção"),
                    ReservationLimitDate = new DateTime(2022, 3, 16).AddDays(-5),
                    Municipality = "City",
                    Status = BookRequestStatus.Delayed
                }});


            _context.SaveChanges();
        }

        [Fact]
        public void Test_GetBooks()
        {
   
            // Act
            var actionResult = _bookController.GetBooks("City");

            // Assert
            Assert.NotNull(actionResult);
            var result = Assert.IsType<JsonResult>(actionResult);
            var resultBooks = Assert.IsAssignableFrom<IEnumerable<Book>>(result.Value);
            Assert.Equal(_books, resultBooks.OrderBy(b => b.Id));
            Assert.Equal(_books.Count(), resultBooks.Count());
        }


        [Fact]
        public void Test_CreateBook()
        {
            Book newBook = new Book
            {
                Title = "Novo Livro",
                Author = new string[] { "Novo Autor" },
                Publisher = "LivrosTech",
                ISBN = "9750803310",
                Genre = new string[] { "Programação", "Tecnologia" },
                Sinopsis = "Um guia abrangente para a linguagem de programação C#.",
                CoverImage = "imagem_capa_url.jpg",
                Language = "Português",
                Edition = "1ª Edição",
                PublicationDate = new DateTime(2022, 3, 15),
                Copies = 50,
                AvailableCopies = 25,
                Status = BookStatus.Available,
                Municipality = "City"
            };

            // Act
            var actionResult = _bookController.CreateBook(newBook);

            // Assert
            Assert.IsType<OkResult>(actionResult);
        }

        [Fact]
        public void Test_CreateBook_DuplicateBook()
        {
            // Arrange
            var existingBook = new Book
            {
                Title = "Livro Existente",
                Author = new string[] { "Autor Existente" },
                Publisher = "LivrosTech",
                ISBN = "1234567890",
                Genre = new string[] { "Ficção" },
                Sinopsis = "Um livro já existente.",
                CoverImage = "imagem_capa_url.jpg",
                Language = "Português",
                Edition = "1ª Edição",
                PublicationDate = new DateTime(2021, 1, 1),
                Copies = 20,
                AvailableCopies = 10,
                Status = BookStatus.Available,
                Municipality = "City"
            };

            _context.Books.Add(existingBook);
            _context.SaveChanges();
            int oldContextCounter = _context.Books.Count();

            // Act
            var newBook = new Book
            {
                Title = "Novo Livro",
                Author = new string[] { "Novo Autor" },
                Publisher = "LivrosTech",
                ISBN = "1234567890", // ISBN duplicado
                Genre = new string[] { "Programação", "Tecnologia" },
                Sinopsis = "Um novo livro com ISBN duplicado.",
                CoverImage = "outra_imagem_capa.jpg",
                Language = "Português",
                Edition = "1ª Edição",
                PublicationDate = new DateTime(2022, 3, 15),
                Copies = 50,
                AvailableCopies = 25,
                Status = BookStatus.Available,
                Municipality = "City"
            };

            var result = _bookController.CreateBook(newBook);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(oldContextCounter, _context.Books.Count());
        }


        [Fact]
        public void Test_UpdateBook()
        {
            // Arrange
            Book bootToUpdate = new Book
            {
                Id = 1,
                Title = "Livro Atualizado",
                Author = new string[] { "Novo Autor" },
                Publisher = "Nova editora",
                ISBN = "1111111111",
                Genre = new string[] { "Nova Programação", "Nova Tecnologia" },
                Sinopsis = "Nova Um guia abrangente para a linguagem de programação C#.",
                CoverImage = "Novaimagem_capa_url.jpg",
                Language = "Novo Português",
                Edition = "Nova 1ª Edição",
                PublicationDate = new DateTime(2022, 3, 16),
                Copies = 50,
                AvailableCopies = 25,
                Status = BookStatus.Available,
                Municipality = "City"
            };

            //Act
            var actionResult = _bookController.UpdateBook(bootToUpdate);
            string jsonResult = JsonConvert.SerializeObject(actionResult);
            dynamic resultObject = JsonConvert.DeserializeObject<dynamic>(jsonResult);
            string message = resultObject.Value.message;

            // Assert
            Assert.IsType<OkObjectResult>(actionResult);
            Assert.Equal("O livro foi atualizado com sucesso", message);
        }

        [Fact]
        public async void Test_DeleteBookById()
        {


            //Act
            var actionResult = await _bookController.DeleteBookById(4);
            string jsonResult = JsonConvert.SerializeObject(actionResult);
            dynamic resultObject = JsonConvert.DeserializeObject<dynamic>(jsonResult);
            string message = resultObject.Value.message;

            // Assert
            Assert.IsType<OkObjectResult>(actionResult);
            Assert.Equal("O livro foi removido com sucesso", message);
        }

        [Fact]
        public void Test_GetRequestsByCitizen()
        {
            List<BookRequest> bookRequests = new List<BookRequest>{
                new BookRequest
                {
                    Id = 2,
                    Citizen = _context.Citizens.First(c => c.firstName == "Teresa"),
                    Book = _context.Books.First(b => b.Title == "A Arte da Ficção"),
                    BorrowedDate = new DateTime(2022, 3, 16),
                    ReturnDate = new DateTime(2022, 3, 16).AddDays(14),
                    Municipality = "City",
                    Status = BookRequestStatus.Borrowed
                },
                new BookRequest
                {
                    Id = 3,
                    Citizen = _context.Citizens.First(c => c.firstName == "Teresa"),
                    Book = _context.Books.First(b => b.Title == "A Arte da Ficção"),
                    DeliveredDate = new DateTime(2022, 3, 16),
                    Municipality = "City",
                    Status = BookRequestStatus.Delivered
                },
                new BookRequest
                {
                    Id = 5,
                    Citizen = _context.Citizens.First(c => c.firstName == "Teresa"),
                    Book = _context.Books.First(b => b.Title == "A Arte da Ficção"),
                    ReservationLimitDate = new DateTime(2022, 3, 16).AddDays(-5),
                    Municipality = "City",
                    Status = BookRequestStatus.Delayed
                }


            };

            // Act
            var actionResult = _bookController.GetRequestsByCitizen("test2@example.com");

            // Assert
            Assert.NotNull(actionResult);
            var result = Assert.IsType<OkObjectResult>(actionResult);
            var resultBooks = Assert.IsAssignableFrom<IEnumerable<BookRequest>>(result.Value);
            Assert.Equal(bookRequests.Count(), resultBooks.Count());
            Assert.Equal(bookRequests, resultBooks.OrderBy(b => b.Id));
            
        }

        [Fact]
        public void Test_GetBookById()
        {
            // Arrange
            int id = 1;

            // Act
            var actionResult = _bookController.GetBookById(id);

            // Assert
            Assert.NotNull(actionResult);
            var result = Assert.IsType<OkObjectResult>(actionResult);
            var resultBooks = Assert.IsAssignableFrom<Book>(result.Value);
            Assert.Equal(_books.Find(b => b.Id == id), resultBooks);
        }
    }



    public class FakeHttpClientFactory : IHttpClientFactory
    {
        public HttpClient CreateClient(string name)
        {
            // Aqui você pode retornar uma instância de HttpClient simulada
            // para uso nos testes
            return new HttpClient();
        }
    }
}



