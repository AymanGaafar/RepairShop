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
    using System.Web.Http.OData.Extensions;
    using RepairShop.Models;
    
    public class JobRepairReasonsController : ODataController
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

        private bool JobRepairReasonExists(Guid jobId, Guid repairReasonId)
        {
            return db.JobRepairReason.Count(e => e.JobId == jobId && e.RepairReasonId == repairReasonId) > 0;
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

        // DELETE: odata/JobRepairReasons(5)
        public async Task<IHttpActionResult> Delete([FromODataUri]Guid jobId, [FromODataUri]Guid repairReasonId)
        {
            JobRepairReason jobRepairReason = 
                await db.JobRepairReason.FindAsync(new object[] { jobId, repairReasonId });
            if (jobRepairReason == null)
            {
                return NotFound();
            }

            db.JobRepairReason.Remove(jobRepairReason);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/JobRepairReasons(5)/Job
        [EnableQuery]
        public SingleResult<Job> GetJob([FromODataUri]Guid jobId, [FromODataUri]Guid repairReasonId)
        {
            var result = db.JobRepairReason
                .Where(m => m.JobId == jobId && m.RepairReasonId == repairReasonId)
                .Select(m => m.Job);

            return SingleResult.Create(result);
        }

        // GET: odata/JobRepairReasons
        [EnableQuery]
        public IQueryable<JobRepairReason> GetJobRepairReasons()
        {
            return db.JobRepairReason;
        }

        // GET: odata/JobRepairReasons(5)
        [EnableQuery]
        public SingleResult<JobRepairReason> GetJobRepairReason([FromODataUri]Guid jobId, [FromODataUri]Guid repairReasonId)
        {
            var result = db.JobRepairReason
                .Where(m => m.JobId == jobId && m.RepairReasonId == repairReasonId);

            return SingleResult.Create(result);
        }

        // GET: odata/JobRepairReasons(5)/RepairReason
        [EnableQuery]
        public SingleResult<RepairReason> GetRepairReason([FromODataUri]Guid jobId, [FromODataUri]Guid repairReasonId)
        {
            return SingleResult.Create(db.JobRepairReason
                .Where(m => m.JobId == jobId && m.RepairReasonId == repairReasonId)
                .Select(m => m.RepairReason));
        }

        // PATCH: odata/JobRepairReasons(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri]Guid jobId, [FromODataUri]Guid repairReasonId, Delta<JobRepairReason> patch)
        {
            JobRepairReason jobRepairReason =
                await db.JobRepairReason.FindAsync(new object[] { jobId, repairReasonId });
            if (jobRepairReason == null)
            {
                return NotFound();
            }

            patch.GetEntity().JobId = jobId;
            patch.GetEntity().RepairReasonId = repairReasonId;
            patch.Patch(jobRepairReason);

            Validate(patch.GetEntity());

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
                if (!JobRepairReasonExists(jobId, repairReasonId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(jobRepairReason);
        }

        // POST: odata/JobRepairReasons
        public async Task<IHttpActionResult> Post(JobRepairReason jobRepairReason)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.JobRepairReason.Add(jobRepairReason);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (JobRepairReasonExists(jobRepairReason.JobId, jobRepairReason.RepairReasonId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(jobRepairReason);
        }

        #endregion
    }
}
