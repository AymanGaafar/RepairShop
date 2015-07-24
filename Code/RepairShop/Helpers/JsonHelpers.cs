namespace RepairShop.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Script.Serialization;

    public static class JsonHelpers
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

        public static string ToJson(this object obj)
        {
            return new JavaScriptSerializer().Serialize(obj);
        }

        public static string ToJson(this object obj, int RecursionDepth)
        {
            return new JavaScriptSerializer() { RecursionLimit = RecursionDepth }.Serialize(obj);
        }

        #endregion

        #region Private Methods
        #endregion

        #region Public Methods
        #endregion
    }
}