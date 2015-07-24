namespace RepairShop.Controllers
{
    using System;
    using System.Data;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.OData;
    using RepairShop.Components;
    using RepairShop.Models;
    using System.Web.Http.Controllers;
    using System.Net.Http;

    public class JobsController : BaseController
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

        private Task<bool> CodeExists(string Code)
        {
            return db.Jobs.AnyAsync(e => e.Code == Code);
        }

        private Task<bool> JobExists(Guid key)
        {
            return db.Jobs.AnyAsync(e => e.JobId == key);
        }

        private void Validate(object model, Type type)
        {
            var validator = Configuration.Services.GetBodyModelValidator();
            var metadataProvider = Configuration.Services.GetModelMetadataProvider();

            HttpActionContext actionContext = new HttpActionContext(ControllerContext, Request.GetActionDescriptor());

            validator.Validate(model, type, metadataProvider, actionContext, String.Empty);
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

        // DELETE: odata/Jobs(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Job job = await db.Jobs.FindAsync(key);
            if (job == null)
            {
                return NotFound();
            }
            
            db.Jobs.Remove(job);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: odata/FomrLookups
        public async Task<IHttpActionResult> FormLookups()
        {
            var clients = (await db.Clients.ToListAsync())
                .OrderBy(CLI => CLI.DisplayName)
                .Select(CLI => new KeyValueResult<string, string> { Key = CLI.ClientId.ToString(), Value = CLI.DisplayName });

            var conditions = (await db.Conditions.ToListAsync())
                .OrderBy(CON => CON.Name)
                .Select(CON => new KeyValueResult<string, string> { Key = CON.ConditionId.ToString(), Value = CON.Name });

            var models = (await db.Models.ToListAsync())
                .OrderBy(MOD => MOD.Name)
                .Select(MOD => new KeyValueResult<string, string> { Key = MOD.ModelId.ToString(), Value = MOD.FullName });

            var repairReasons = (await db.RepairReasons.ToListAsync())
                .OrderBy(RR => RR.Title)
                .Select(RR => new KeyValueResult<string, string> { Key = RR.RepairReasonId.ToString(), Value = RR.Title });

            var users = (await db.Users.ToListAsync())
                .OrderBy(USR => USR.DisplayName)
                .Select(USR => new KeyValueResult<string, string> { Key = USR.Id, Value = USR.DisplayName });

            var workDone = (await db.WorkDone.ToListAsync())
                .OrderBy(WD => WD.Title)
                .Select(WD => new KeyValueResult<string, string> { Key = WD.WorkDoneId.ToString(), Value = WD.Title });

            var result = new JobFormLookups()
            {
                clients = clients,
                conditions = conditions,
                models = models,
                repairReasons = repairReasons,
                users = users,
                workDone = workDone
            };

            return Ok(result);
        }

        // GET: odata/Jobs(5)/Condition
        [EnableQuery]
        public SingleResult<Condition> GetCondition([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Jobs.Where(m => m.JobId == key).Select(m => m.Condition));
        }

        // GET: odata/Jobs(5)
        [EnableQuery]
        public SingleResult<Job> GetJob([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Jobs.Where(job => job.JobId == key));
        }

        // GET: odata/Jobs
        [EnableQuery(MaxExpansionDepth = 3, PageSize = 20)]
        public IQueryable<Job> GetJobs()
        {
            return db.Jobs;
        }

        // PATCH: odata/Jobs(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Job> patch)
        {
            Job job = await db.Jobs.FindAsync(key);
            if (job == null)
            {
                return NotFound();
            }

            patch.GetEntity().JobId = key;
            patch.Patch(job);

            Validate(job);

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
                if (!await JobExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(job);
        }

        // POST: odata/Jobs
        public async Task<IHttpActionResult> Post(Job job)
        {
            job.JobId = Guid.NewGuid();
            
            var atempts = 1;
            do
            {
                if (atempts++ == 11)
                {
                    return Conflict();
                }

                job.Code = Job.GenerateUniqueCode();
            } while (await CodeExists(job.Code));

            ModelState.Clear();
            Validate(job);
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Jobs.Add(job);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (await JobExists(job.JobId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(job);
        }

        #endregion
    }
}
