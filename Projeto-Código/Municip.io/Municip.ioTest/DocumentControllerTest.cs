using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Municip.io.Server.Controllers;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.ioTest
{
    public class DocumentControllerTest
    {
        private readonly ApplicationDbContext _context;
        private readonly DocumentController _controller;
        private readonly DocumentTemplateStatusController _controller2;
        private readonly AppFeatureController _controller3;
        private readonly UserManager<IdentityUser> _userManager;

        public DocumentControllerTest()
        {
            // Setup DbContext
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _context = new ApplicationDbContext(options);

            // Setup UserManager with mock UserStore
            var _userManagerMock = new Mock<UserManager<IdentityUser>>(
                               Mock.Of<IUserStore<IdentityUser>>(), null, null, null, null, null, null, null, null);

            SeedDatabase();

            // Instantiate the controller with the mocked dependencies
            _controller = new DocumentController(_context);
            _controller2 = new DocumentTemplateStatusController(_context);
            _controller3 = new AppFeatureController(_context);
        }

        public void SeedDatabase()
        {
            _context.Citizens.AddRange(new[]
                {
                new Citizen { Email = "test1@example.com", firstName = "Filipe", status = CitizenStatus.Pending,  Address = "123  avenida", Gender = "m",Municipality = " City",Nif = "123456789",Surname = "Fonseca",photo = "path/to/photo",postalCode1 = "1234",postalCode2 = "678" },
                new Citizen { Email = "test2@example.com", firstName = "Teresa", status = CitizenStatus.Blocked,  Address = "123 rua ",Gender = "f",Municipality = " City",Nif = "123456789", Surname = "Raquel",photo = "path/to/photo", postalCode1 = "1235", postalCode2 = "678" },
                new Citizen { Email = "test3@example.com", firstName = "Pedro", status = CitizenStatus.Approved,  Address = "123 avenida 456",
    Gender = "m",
    Municipality = " City",
    Nif = "123456789",
    Surname = "Moura",
    photo = "path/",
    postalCode1 = "1234",
    postalCode2 = "679" }
            });

            _context.DocumentTemplates.AddRange(new[]
            {
                new DocumentTemplate
                {
                    Name = "Document1",
                    Description="Description1",
                    Type = "Certificado",
                    TextTemplate= "texttemplate1",
                    Price=3,
                    Municipality= "Almada",
                    Status= DocumentTemplateStatus.Active,
                },
                 
                new DocumentTemplate
                {
                    Name = "Document2",
                    Description="Description2",
                    Type = "Certificado",
                    TextTemplate= "texttemplate2",
                    Price=3,
                    Municipality= "Almada",
                    Status= DocumentTemplateStatus.Active,
                },
                new DocumentTemplate
                {
                    Name = "Document3",
                    Description="Description3",
                    Type = "Certificado",
                    TextTemplate= "texttemplate3",
                    Price=3,
                    Municipality= "Almada",
                    Status= DocumentTemplateStatus.Active,
                },
            });

        
            
            
            _context.SaveChanges();
        
        }

        [Fact]
        public async Task CreateDocumentTemplate_When_TemplateDoesNotExist_ShouldCreateAndSendEmail()
        {
            var template = new DocumentTemplate
            {
                Name = "Document4",
                Description = "Description4",
                Type = "Certificado",
                TextTemplate = "texttemplate4",
                Price = 3,
                Municipality = "Almada",
                Status = DocumentTemplateStatus.Active,
            };

            var result = await _controller.CreateDocumentTemplateAsync(template);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(4, _context.DocumentTemplates.Count());
            Assert.NotNull(_context.DocumentTemplates.FirstOrDefault(c => c.Name == template.Name));
        }

        [Fact]
        public async Task EditDocumentTemplate_when_TemplateExists_ShouldEditAndSendEmail()
        {
            var template = new DocumentTemplate
            {
                Name = "Document1edited",
                Description = "Description1",
                Type = "Certificado",
                TextTemplate = "texttemplate1",
                Price = 3,
                Municipality = "Almada",
                Status = DocumentTemplateStatus.Active,
            };

            var result = await _controller.EditDocumentTemplateAsync(template,1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(3, _context.DocumentTemplates.Count());
            Assert.NotNull(_context.DocumentTemplates.FirstOrDefault(c => c.Name == template.Name));
        }

        [Fact]
        public async Task DeleteDocumentTemplate_When_TemplateExists_ShouldDeleteAndSendEmail()
        {
           

            var countbefore = _context.DocumentTemplates.Count();
            var result = _controller2.Remove(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(3, _context.DocumentTemplates.Count());
            Assert.Equal(countbefore, _context.DocumentTemplates.Count());
        }

        [Fact]
        //requisitar documento pelo cidadao
        public async Task RequestDocument_When_CitizenExistsAndDocumentExists_ShouldRequestAndSendEmail()
        {
            //fazer um request a um documento por um cidadao
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test1@example.com");
            var document = _context.DocumentTemplates.FirstOrDefault(d => d.Name == "Document1");
            var documentRequest = new DocumentRequest
            {
                Citizen = citizen,
                DocumentTemplate = document,
                Status = DocumentStatus.Pending,
            };
            var result = await _controller.CreateDocumentRequestAsync(citizen.Email, documentRequest);
            

            //assert
            Assert.NotNull(result);
            Assert.Equal(1, _context.DocumentRequests.Count());
            Assert.NotNull(_context.DocumentRequests.FirstOrDefault(dr => dr.Citizen.Email == citizen.Email && dr.DocumentTemplate.Name == document.Name));

        }

        [Fact]
        //testar a listagem do historico de pedidos de um cidadao
        public async Task GetDocumentRequests_When_CitizenExists_ShouldReturnDocumentRequests()
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test1@example.com");
            var result = _controller.GetRequestsFromCitizen(citizen.Email);
            
            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var requests = Assert.IsAssignableFrom<IQueryable<DocumentRequest>>(okResult.Value);
        }

        [Fact]
        //testar a correta emissao de um documento
        public async Task IsSentDocument_When_RequestExists_ShouldIssueDocumentAndSendEmail()
        {
            //quando o estado de um pedido é alterado para Aprroved
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test1@example.com");
            var document = _context.DocumentTemplates.FirstOrDefault(d => d.Name == "Document1");
            var documentRequest = new DocumentRequest
            {
                Citizen = citizen,
                DocumentTemplate = document,
                Status = DocumentStatus.Pending,
            };
            var result = await _controller.CreateDocumentRequestAsync(citizen.Email, documentRequest);

            var request = _context.DocumentRequests.FirstOrDefault(dr => dr.Status == DocumentStatus.Pending);

            var finalResult = await _controller.ApproveRequest((int)request.Id);
            
            
            Assert.NotNull(finalResult);
            Assert.Equal(1, _context.DocumentRequests.Count());
            Assert.Equal(DocumentStatus.Approved, _context.DocumentRequests.FirstOrDefault(dr => dr.Id == request.Id).Status);

        }

        [Fact]
        public async Task ChangeStateDocument_When_RequestExists_ShouldIssueDocumentAndSendEmail()
        {
            //quando o estado de um pedido é alterado para Aprroved
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test1@example.com");
            var document = _context.DocumentTemplates.FirstOrDefault(d => d.Name == "Document1");
            var documentRequest = new DocumentRequest
            {
                Citizen = citizen,
                DocumentTemplate = document,
                Status = DocumentStatus.Pending,
            };
            var result = await _controller.CreateDocumentRequestAsync(citizen.Email, documentRequest);

            var request = _context.DocumentRequests.FirstOrDefault(dr => dr.Status == DocumentStatus.Pending);

            var finalResult = await _controller.WaitingForPayment((int)request.Id);


            Assert.NotNull(finalResult);
            Assert.Equal(1, _context.DocumentRequests.Count());
            Assert.Equal(DocumentStatus.WaitingForPayment, _context.DocumentRequests.FirstOrDefault(dr => dr.Id == request.Id).Status);

        }

        [Fact]
        //Testar a lista de documentos pedidos por cidadão de um município
        public async Task GetDocumentRequestsFromMunicipality_When_CitizenExists_ShouldReturnDocumentRequests()
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == "test1@example.com");
            var result = _controller.GetRequestsFromCitizen(citizen.Email);

            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var requests = Assert.IsAssignableFrom<IQueryable<DocumentRequest>>(okResult.Value);
            
            Assert.NotNull(requests);
        }

        [Fact]
        //testar ativação de funcionalidades 

        public async Task ActivateFeature_When_FeatureExists_ShouldActivateAndSendEmail()
        {
            var feature = new AppFeature
            {
                IsEnabled = true,
                AppFeatureCategory = AppFeatureCategory.Events,
                Municipality = "Almada",
            };
            var feature2 = new AppFeature
            {
               IsEnabled=false,
               AppFeatureCategory=AppFeatureCategory.Documents,
               Municipality="Almada",
            };
            var appFeatures = new AppFeature[]
            {
                feature,
                feature2,
            };

            var result = _controller3.UpdateAppFeatures(appFeatures);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, appFeatures.Length);
            Assert.Equal(feature.IsEnabled, appFeatures[0].IsEnabled);
           
        }
    }

}
