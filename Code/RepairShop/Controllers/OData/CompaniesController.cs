namespace RepairShop.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.ModelBinding;
    using RepairShop.Models;
    using System.Web.Http.OData;
    //using System.Web.OData;

    public class CompaniesController : ODataController
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

        private bool CompanyExists(Guid key)
        {
            return db.Companies.Any(e => e.CompanyId == key);
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

        // DELETE: odata/Companies(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Company company = await db.Companies.FindAsync(key);
            if (company == null)
            {
                return NotFound();
            }

            db.Companies.Remove(company);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Companies
        [EnableQuery(PageSize = 20)]
        public IQueryable<Company> GetCompanies()
        {
            return db.Companies;
        }

        // GET: odata/Companies(5)
        [EnableQuery]
        public SingleResult<Company> GetCompany([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Companies.Where(company => company.CompanyId == key));
        }

        // PATCH: odata/Companies(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Company> patch)
        {
            Company company = await db.Companies.FindAsync(key);
            if (company == null)
            {
                return NotFound();
            }

            patch.GetEntity().CompanyId = key;
            patch.Patch(company);

            Validate(company);

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
                if (!CompanyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(company);
        }

        // POST: odata/Companies
        public async Task<IHttpActionResult> Post(Company company)
        {
            company.CompanyId = Guid.NewGuid();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Companies.Add(company);
            await db.SaveChangesAsync();

            return Created(company);
        }

        #endregion
    }
}
