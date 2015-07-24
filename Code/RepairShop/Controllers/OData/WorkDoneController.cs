namespace RepairShop.Controllers.OData
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
    using System.Web.Http.OData;
    using RepairShop.Models;

    public class WorkDoneController : ODataController
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

        private bool WorkDoneExists(Guid key)
        {
            return db.WorkDone.Count(e => e.WorkDoneId == key) > 0;
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

        // DELETE: odata/WorkDone(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            WorkDone workDone = await db.WorkDone.FindAsync(key);
            if (workDone == null)
            {
                return NotFound();
            }

            db.WorkDone.Remove(workDone);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/WorkDone(5)
        [EnableQuery]
        public SingleResult<WorkDone> GetWorkDone([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.WorkDone.Where(workDone => workDone.WorkDoneId == key));
        }

        // GET: odata/WorkDone
        [EnableQuery(MaxExpansionDepth = 3, PageSize = 20)]
        public IQueryable<WorkDone> GetWorkDone()
        {
            return db.WorkDone;
        }

        // PATCH: odata/WorkDone(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<WorkDone> patch)
        {
            WorkDone workDone = await db.WorkDone.FindAsync(key);
            if (workDone == null)
            {
                return NotFound();
            }

            patch.GetEntity().WorkDoneId = key;
            patch.Patch(workDone);

            Validate(workDone);

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
                if (!WorkDoneExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(workDone);
        }

        // POST: odata/WorkDone
        public async Task<IHttpActionResult> Post(WorkDone workDone)
        {
            workDone.WorkDoneId = Guid.NewGuid();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.WorkDone.Add(workDone);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WorkDoneExists(workDone.WorkDoneId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(workDone);
        }

        #endregion
    }
}
