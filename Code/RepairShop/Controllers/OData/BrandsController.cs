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
    using RepairShop.Components;
    using System.Web.Http.OData;
    //using System.Web.OData;

    public class BrandsController : ODataController
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

        private bool BrandExists(Guid key)
        {
            return db.Brands.Any(e => e.BrandId == key);
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

        // DELETE: odata/Brands(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Brand brand = await db.Brands.FindAsync(key);
            if (brand == null)
            {
                return NotFound();
            }

            db.Brands.Remove(brand);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }
        
        // POST: odata/FormLookups
        public async Task<IHttpActionResult> FormLookups()
        {
            var companies = (await db.Companies.ToListAsync())
                .OrderBy(COM => COM.Name)
                .Select(COM => new KeyValueResult<string, string> { Key = COM.CompanyId.ToString(), Value = COM.Name });

            var result = new BrandFormLookups()
            {
                companies = companies,
            };

            return Ok(result);
        }

        // GET: odata/Brands
        [EnableQuery(PageSize = 20)]
        public IQueryable<Brand> GetBrands()
        {
            return db.Brands;
        }

        // GET: odata/Brands(5)
        [EnableQuery]
        public SingleResult<Brand> GetBrand([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Brands.Where(brand => brand.BrandId == key));
        }

        // PATCH: odata/Brands(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Brand> patch)
        {
            Brand brand = await db.Brands.FindAsync(key);
            if (brand == null)
            {
                return NotFound();
            }

            patch.GetEntity().BrandId = key;
            patch.Patch(brand);

            Validate(brand);

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
                if (!BrandExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(brand);
        }

        // POST: odata/Brands
        public async Task<IHttpActionResult> Post(Brand brand)
        {
            brand.BrandId = Guid.NewGuid();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Brands.Add(brand);
            await db.SaveChangesAsync();

            return Created(brand);
        }

        #endregion
    }
}
