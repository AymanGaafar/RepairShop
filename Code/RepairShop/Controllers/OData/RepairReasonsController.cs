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

    public class RepairReasonsController : ODataController
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

        private bool RepairReasonExists(Guid key)
        {
            return db.RepairReasons.Count(e => e.RepairReasonId == key) > 0;
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

        // DELETE: odata/RepairReasons(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            RepairReason repairReason = await db.RepairReasons.FindAsync(key);
            if (repairReason == null)
            {
                return NotFound();
            }

            db.RepairReasons.Remove(repairReason);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }
        
        // GET: odata/RepairReasons(5)
        [EnableQuery]
        public SingleResult<RepairReason> GetRepairReason([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.RepairReasons.Where(repairReason => repairReason.RepairReasonId == key));
        }

        // GET: odata/RepairReasons
        [EnableQuery(MaxExpansionDepth = 3, PageSize = 20)]
        public IQueryable<RepairReason> GetRepairReasons()
        {
            return db.RepairReasons;
        }

        // PATCH: odata/RepairReasons(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<RepairReason> patch)
        {
            RepairReason repairReason = await db.RepairReasons.FindAsync(key);
            if (repairReason == null)
            {
                return NotFound();
            }

            patch.GetEntity().RepairReasonId = key;
            patch.Patch(repairReason);

            Validate(repairReason);

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
                if (!RepairReasonExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(repairReason);
        }

        // POST: odata/RepairReasons
        public async Task<IHttpActionResult> Post(RepairReason repairReason)
        {
            repairReason.RepairReasonId = Guid.NewGuid();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RepairReasons.Add(repairReason);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RepairReasonExists(repairReason.RepairReasonId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(repairReason);
        }

        #endregion
    }
}
