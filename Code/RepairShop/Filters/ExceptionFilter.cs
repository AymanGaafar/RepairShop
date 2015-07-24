namespace RepairShop.Filters
{
    using RepairShop.Helpers;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Web;
    using System.Web.Http.Filters;

    public class ExceptionFilter : ExceptionFilterAttribute
    {
        #region Enums
        #endregion

        #region Private Static Properties
        #endregion

        #region Public Static Properties
        #endregion

        #region Private Properties
        #endregion

        #region Public Properties
        #endregion

        #region Constructors
        #endregion

        #region Private Static Methods
        #endregion

        #region Public Static Methods
        #endregion

        #region Private Methods
        #endregion

        #region Public Methods

        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            Exception exp = actionExecutedContext.Exception;
            HttpException httpException = exp as HttpException;
            HttpResponseMessage msg;
            ErrorResponseObject ErrorObject = new ErrorResponseObject() { Code = 0, Message = exp.Message };

            // If the Exception is HTTP exception and the Status Code is BadRequest(400)
            if(httpException != null && httpException.GetHttpCode() == (int)HttpStatusCode.BadRequest)
            {
                // Get Json Error Object
                ErrorObject.Code = httpException.GetHttpCode();

                msg = new HttpResponseMessage((HttpStatusCode)httpException.GetHttpCode())
                {
                    Content = new StringContent(ErrorObject.ToJson(), System.Text.Encoding.UTF8, "application/json"),
                    ReasonPhrase = httpException.Message
                };
            }
            // Else, Any other exception
            else
            {
                msg = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent("An unhandled exception was thrown the API controller."),
                    ReasonPhrase = "An unhandled exception was thrown by the API controller."
                };
            }
            
            actionExecutedContext.Response = msg;
        }

        #endregion
    }

    internal class ErrorResponseObject
    {
        #region Enums
        #endregion

        #region Private Static Properties
        #endregion

        #region Public Static Properties
        #endregion

        #region Private Properties
        #endregion

        #region Public Properties

        public int Code { get; set; }
        public string Message { get; set; }

        #endregion

        #region Constructors
        #endregion

        #region Private Static Methods
        #endregion

        #region Public Static Methods
        #endregion

        #region Private Methods
        #endregion

        #region Public Methods
        #endregion
        
    }
}