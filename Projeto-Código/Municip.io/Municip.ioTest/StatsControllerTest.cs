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
    public class StatsControllerTest
    {
        private readonly ApplicationDbContext _context;
        private readonly StatsController _statsController;


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

        private List<DocumentTemplate> _documentTemplates = new List<DocumentTemplate> {
                new DocumentTemplate
                {
                    Name = "Document1",
                    Description="Description1",
                    Type = "Certificado",
                    TextTemplate= "texttemplate1",
                    Price=3,
                    Municipality= "City",
                    Status= DocumentTemplateStatus.Active,
                },

                new DocumentTemplate
                {
                    Name = "Document2",
                    Description="Description2",
                    Type = "Certificado",
                    TextTemplate= "texttemplate2",
                    Price=3,
                    Municipality= "City",
                    Status= DocumentTemplateStatus.Active,
                },
                new DocumentTemplate
                {
                    Name = "Document3",
                    Description="Description3",
                    Type = "Certificado",
                    TextTemplate= "texttemplate3",
                    Price=3,
                    Municipality= "City",
                    Status= DocumentTemplateStatus.Active,
                }};

        public StatsControllerTest()
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _context = new ApplicationDbContext(options);
            SeedDatabase();

            _statsController = new StatsController(_context);
        }

        private void SeedDatabase()
        {
            // Adicionar cidadãos fictícios e livros fictícios ao contexto em memória
            _context.Citizens.AddRange(_citizens);
            _context.DocumentTemplates.AddRange(_documentTemplates);
            _context.SaveChanges();


            _context.DocumentRequests.AddRange(new[]
            {
                new DocumentRequest
            {
                Municipality = "City",
                Name = "Pedido1",
                Citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test1@example.com"),
                DocumentTemplate = _context.DocumentTemplates.FirstOrDefault(d => d.Name == "Document1"),
                Status = DocumentStatus.Pending,
                Date = DateTime.Now,
            },
                new DocumentRequest
            {
                Municipality = "City",
                Name = "Pedido2",
                Citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test2@example.com"),
                DocumentTemplate = _context.DocumentTemplates.FirstOrDefault(d => d.Name == "Document2"),
                Status = DocumentStatus.Pending,
                Date = DateTime.Now,
            },
                new DocumentRequest
            {
                Municipality = "City",
                Name = "Pedido3",
                Citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test3@example.com"),
                DocumentTemplate = _context.DocumentTemplates.FirstOrDefault(d => d.Name == "Document3"),
                Status = DocumentStatus.Pending,
                Date = DateTime.Now,
            },
                new DocumentRequest
            {
                Municipality = "City",
                Name = "Pedido4",
                Citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test1@example.com"),
                DocumentTemplate = _context.DocumentTemplates.FirstOrDefault(d => d.Name == "Document1"),
                Status = DocumentStatus.WaitingForPayment,
                Date = DateTime.Now,
            },
                new DocumentRequest
            {
                Municipality = "City",
                Name = "Pedido5",
                Citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test2@example.com"),
                DocumentTemplate = _context.DocumentTemplates.FirstOrDefault(d => d.Name == "Document2"),
                Status = DocumentStatus.WaitingForPayment,
                Date = DateTime.Now,
            },
            });

            _context.SaveChanges();
        }

        [Fact]
        public void Test_GetAllCitizens()
        {
            // Act
            var actionResultCitizens = _statsController.getAllCitizens();


            // Arrange
            Assert.NotNull(actionResultCitizens);
            var result = Assert.IsType<OkObjectResult>(actionResultCitizens);
            var resultBooks = Assert.IsAssignableFrom<IEnumerable<Citizen>>(result.Value);
            Assert.Equal(_citizens, resultBooks.OrderBy(c => c.Email));
        }

        [Fact]
        public void Test_GetPendingRequestsByMunicipality()
        {
            // Act
            var actionResult = _statsController.getPendingRequestsByMunicipality("City");


            // Arrange
            Assert.NotNull(actionResult);
            var result = Assert.IsType<OkObjectResult>(actionResult);
            var resultValue = Assert.IsAssignableFrom<int>(result.Value);
            Assert.Equal(3, resultValue);
        }

        [Fact]
        public void Test_GetWaitingForPaymentRequestsByMunicipality()
        {
            // Act
            var actionResult = _statsController.getWaitingForPaymentRequestsByMunicipality("City");


            // Arrange
            Assert.NotNull(actionResult);
            var result = Assert.IsType<OkObjectResult>(actionResult);
            var resultValue = Assert.IsAssignableFrom<int>(result.Value);
            Assert.Equal(2, resultValue);
        }
    }



}



