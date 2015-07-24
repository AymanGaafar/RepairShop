namespace RepairShop.Controllers
{
    using System;
    using System.Data;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.OData;
    //using System.Web.OData;
    using RepairShop.Models;

    public class ClientsController : ODataController
    {
        #region Private Static Properties
        #endregion

        #region Public Static Properties
        #endregion

        #region Private Properties

        private RepairShopDbContext db = new RepairShopDbContext();

        #endregion

        #region Public Properties
        #endregion

        #region Constructors
        #endregion

        #region Private Methods

        private bool CodeExists(string Code)
        {
            return db.Clients.Any(e => e.Code == Code);
        }

        private bool ClientExists(Guid key)
        {
            return db.Clients.Any(e => e.ClientId == key);
        }

        #endregion

        #region Protected Methods

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }

            base.Dispose(disposing);
        }

        #endregion

        #region Public Methods

        // DELETE: odata/Clients(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Client client = await db.Clients.FindAsync(key);

            if (client == null)
            {
                return NotFound();
            }

            db.Clients.Remove(client);

            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Clients
        [EnableQuery(PageSize=20)]
        public IQueryable<Client> GetClients()
        {
            return db.Clients;
        }

        // GET: odata/Clients(5)
        [EnableQuery]
        public SingleResult<Client> GetClient([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Clients.Where(client => client.ClientId == key));
        }

        // PATCH: odata/Clients(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Client> patch)
        {
            Client client = await db.Clients.FindAsync(key);
            if (client == null)
            {
                return NotFound();
            }

            patch.GetEntity().ClientId = key;
            patch.Patch(client);

            Validate(client);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(client);
        }

        // POST: odata/Clients
        public async Task<IHttpActionResult> Post(Client client)
        {
            client.ClientId = Guid.NewGuid();

            var atempts = 1;
            do
            {
                if (atempts++ == 11)
                {
                    return Conflict();
                }

                client.Code = Client.GenerateUniqueCode();
            } while (CodeExists(client.Code));

            ModelState.Clear();
            Validate(client);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            client.RegistrationDate = DateTime.UtcNow;

            db.Clients.Add(client);
            await db.SaveChangesAsync();

            return Created(client);
        }

        #endregion
    }
}
