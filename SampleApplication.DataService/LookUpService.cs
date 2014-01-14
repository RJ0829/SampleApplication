using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SampleApplication.Models;
using SampleApplication.DataAccess.Repositories;
using SampleApplication.DataAccess.Models;

namespace SampleApplication.DataService
{
    public class LookUpService
    {
        private ILookUpRepository _repository;

        public LookUpService()
        {
            this._repository = new LookUpRepository();
        }

        public LookUpService(ILookUpRepository repository)
        {
            this._repository = repository;
        }

        /// <summary>
        /// Get all data in the look up table
        /// </summary>
        /// <returns></returns>
        public List<Models.LookUp> GetAllLookUpData()
        {
            //return object
            List<Models.LookUp> cLookUp = new List<Models.LookUp>();
            List<DataAccess.Models.LookUp> rLookUp = _repository.GetAll().OrderBy(l => l.DisplayOrder).ToList();

            for (int ctr = 0; ctr <= rLookUp.Count - 1; ctr++) {

                Models.LookUp lookUp = new Models.LookUp();

                lookUp.Counter = ctr;
                lookUp.GroupID = rLookUp[ctr].GroupID;
                lookUp.TableName = rLookUp[ctr].TableName;
                lookUp.FieldName = rLookUp[ctr].FieldName;
                lookUp.ValueCode = rLookUp[ctr].ValueCode;
                lookUp.DisplayOrder = rLookUp[ctr].DisplayOrder;
                lookUp.ValueDescription = rLookUp[ctr].ValueDescription;
                lookUp.OwnerFieldName = rLookUp[ctr].OwnerFieldName;
                lookUp.OwnerValue = rLookUp[ctr].OwnerValue;
                lookUp.DefaultValue = rLookUp[ctr].DefaultValue;
                lookUp.SystemRequired = rLookUp[ctr].SystemRequired;
                lookUp.Aliased = rLookUp[ctr].Aliased;
                lookUp.ValueForAction = rLookUp[ctr].ValueForAction;
                lookUp.RecordLastUpdated = rLookUp[ctr].RecordLastUpdated;

                cLookUp.Add(lookUp);

            }

            return cLookUp;
        }

        public List<Models.LookUp> GetFilteredLookUpData(string pTableName, string pFieldName)
        {
            //return object
            List<Models.LookUp> cLookUp = new List<Models.LookUp>();
            List<DataAccess.Models.LookUp> rLookUp = this._repository.Query(l => l.TableName == pTableName && l.FieldName == pFieldName).OrderBy(l => l.DisplayOrder).ToList();

            for (int ctr = 0; ctr <= rLookUp.Count - 1; ctr++)
            {

                Models.LookUp lookUp = new Models.LookUp();

                lookUp.Counter = ctr;
                lookUp.GroupID = rLookUp[ctr].GroupID;
                lookUp.TableName = rLookUp[ctr].TableName;
                lookUp.FieldName = rLookUp[ctr].FieldName;
                lookUp.ValueCode = rLookUp[ctr].ValueCode;
                lookUp.DisplayOrder = rLookUp[ctr].DisplayOrder;
                lookUp.ValueDescription = rLookUp[ctr].ValueDescription;
                lookUp.OwnerFieldName = rLookUp[ctr].OwnerFieldName;
                lookUp.OwnerValue = rLookUp[ctr].OwnerValue;
                lookUp.DefaultValue = rLookUp[ctr].DefaultValue;
                lookUp.SystemRequired = rLookUp[ctr].SystemRequired;
                lookUp.Aliased = rLookUp[ctr].Aliased;
                lookUp.ValueForAction = rLookUp[ctr].ValueForAction;
                lookUp.RecordLastUpdated = rLookUp[ctr].RecordLastUpdated;

                cLookUp.Add(lookUp);

            }

            return cLookUp;
        }

        public Models.LookUp Insert(Models.LookUp lookupData)
        {
            DataAccess.Models.LookUp entity = new DataAccess.Models.LookUp();

            entity.GroupID = lookupData.GroupID;
            entity.TableName = lookupData.TableName;
            entity.FieldName = lookupData.FieldName;
            entity.ValueCode = lookupData.ValueCode;
            entity.ValueDescription = lookupData.ValueDescription;
            entity.DisplayOrder = lookupData.DisplayOrder;
            entity.OwnerFieldName = lookupData.OwnerFieldName;
            entity.OwnerValue = lookupData.OwnerValue;
            entity.DefaultValue = lookupData.DefaultValue;
            entity.SystemRequired = lookupData.SystemRequired;
            entity.Aliased = lookupData.Aliased;
            entity.ValueForAction = lookupData.ValueForAction;

            this._repository.Insert(entity);

            return lookupData;
        }

        public Models.LookUp Update(Models.LookUp lookupData)
        {
            DataAccess.Models.LookUp entity = new DataAccess.Models.LookUp();

            entity.GroupID = lookupData.GroupID;
            entity.TableName = lookupData.TableName;
            entity.FieldName = lookupData.FieldName;
            entity.ValueCode = lookupData.ValueCode;
            entity.ValueDescription = lookupData.ValueDescription;
            entity.DisplayOrder = lookupData.DisplayOrder;
            entity.OwnerFieldName = lookupData.OwnerFieldName;
            entity.OwnerValue = lookupData.OwnerValue;
            entity.DefaultValue = lookupData.DefaultValue;
            entity.SystemRequired = lookupData.SystemRequired;
            entity.Aliased = lookupData.Aliased;
            entity.ValueForAction = lookupData.ValueForAction;

            this._repository.Update(entity);

            return lookupData;
        }

        public int Delete(Models.LookUp lookupData)
        {
            DataAccess.Models.LookUp entity = new DataAccess.Models.LookUp();

            entity.GroupID = lookupData.GroupID;
            entity.TableName = lookupData.TableName;
            entity.FieldName = lookupData.FieldName;
            entity.ValueCode = lookupData.ValueCode;
            entity.ValueDescription = lookupData.ValueDescription;
            entity.DisplayOrder = lookupData.DisplayOrder;
            entity.OwnerFieldName = lookupData.OwnerFieldName;
            entity.OwnerValue = lookupData.OwnerValue;
            entity.DefaultValue = lookupData.DefaultValue;
            entity.SystemRequired = lookupData.SystemRequired;
            entity.Aliased = lookupData.Aliased;
            entity.ValueForAction = lookupData.ValueForAction;

            this._repository.Delete(entity);

            return 1;
        }
    }
}
