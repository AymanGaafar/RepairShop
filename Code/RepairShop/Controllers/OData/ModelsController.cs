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

    public class ModelsController : ODataController
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

        private bool ModelExists(Guid key)
        {
            return db.Models.Any(e => e.ModelId == key);
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

        // DELETE: odata/Models(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Model model = await db.Models.FindAsync(key);
            if (model == null)
            {
                return NotFound();
            }

            db.Models.Remove(model);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: odata/FormLookups
        public async Task<IHttpActionResult> FormLookups()
        {
            var brands = (await db.Brands.ToListAsync())
                .OrderBy(BRD => BRD.Name)
                .Select(BRD => new KeyValueResult<string, string> { Key = BRD.BrandId.ToString(), Value = BRD.FullName });

            var result = new ModelFormLookups()
            {
                brands = brands,
            };

            return Ok(result);
        }

        // GET: odata/Models
        [EnableQuery(PageSize=20)]
        public IQueryable<Model> GetModels()
        {
            return db.Models;
        }

        // GET: odata/Models(5)
        [EnableQuery]
        public SingleResult<Model> GetModel([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Models.Where(model => model.ModelId == key));
        }

        // PATCH: odata/Models(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Model> patch)
        {
            Model model = await db.Models.FindAsync(key);
            if (model == null)
            {
                return NotFound();
            }

            patch.GetEntity().ModelId = key;
            patch.Patch(model);

            Validate(model);

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
                if (!ModelExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(model);
        }

        // POST: odata/Models
        public async Task<IHttpActionResult> Post(Model model)
        {
            model.ModelId = Guid.NewGuid();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Models.Add(model);
            await db.SaveChangesAsync();

            return Created(model);
        }

        #endregion
    }
}
