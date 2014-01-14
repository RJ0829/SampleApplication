using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
using SampleApplication.DataAccess.Models;

namespace SampleApplication.DataAccess.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    public class TestRepository : ITestRepository
    {
        private Entities dbContext;

        public TestRepository()
        {
            dbContext = new Entities();
        }

        public Models.Test GetById(int id)
        {
            return dbContext.Tests.Include("TestSamples.SampleTransportConditions").Include("TestRequirements").Include("TestSteps").Include("TestTutorialSteps").Where(t => t.TestID == id).FirstOrDefault();
        }

        public IEnumerable<Models.TestSynonym> GetTestSynonymByTestId(int testId)
        {
            return dbContext.TestSynonyms.Where(t => t.TestID == testId).ToList();
        }

        public Models.TestSynonym GetTestSynonymById(int id)
        {
            return dbContext.TestSynonyms.Where(t => t.SynonymId == id).FirstOrDefault();
        }

        public IEnumerable<Models.TestSynonym> GetTestSynonymByTestCode(string testCode)
        {
            return dbContext.TestSynonyms.Where(t => t.PrimaryCode == testCode).ToList();
        }

        public Models.TestSample GetTestSampleById(int id)
        {
            return dbContext.TestSamples.Where(t => t.SampleId == id).FirstOrDefault();
        }

        public IEnumerable<Models.SampleTransportCondition> GetTestSampleConditionBySampleId(int sampleId)
        {
            return dbContext.SampleTransportConditions.Where(s => s.SampleId == sampleId).ToList();
        }

        public Models.SampleTransportCondition GetTestSampleConditionById(int id)
        {
            return dbContext.SampleTransportConditions.Where(s => s.ConditionId == id).FirstOrDefault();
        }

        public Models.TestRequirement GetTestRequirementById(int id)
        {
            return dbContext.TestRequirements.Where(t => t.RequirementId == id).FirstOrDefault();
        }

        public Models.TestStep GetTestStepById(int id)
        {
            return dbContext.TestSteps.Where(t => t.StepID == id).FirstOrDefault();
        }

        public Models.TestTutorialStep GetTestTutorialStepById(int id)
        {
            return dbContext.TestTutorialSteps.Where(t => t.TutorialStepID == id).FirstOrDefault();
        }

        public IEnumerable<Models.Test> GetAll()
        {
            return dbContext.Tests.Where(t => t.IsDeleted == false).ToList();
        }

        public IEnumerable<Models.TestSynonym> GetAllTestSynonyms()
        {
            return dbContext.TestSynonyms.ToList();
            
        }

        public IQueryable<Models.Test> Query(Expression<Func<Models.Test, bool>> filter)
        {
            return dbContext.Tests.Where(filter);
        }

        public IQueryable<Models.TestSynonym> QueryTestSynonyms(Expression<Func<Models.TestSynonym, bool>> filter)
        {
            return dbContext.TestSynonyms.Where(filter);
        }

        /// <summary>
        /// Insert new test
        /// </summary>
        /// <param name="entity">test data entity</param>
        /// <returns></returns>
        public Models.Test Insert(Models.Test entity)
        {
            dbContext.Tests.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// update test
        /// </summary>
        /// <param name="entity">test data entity</param>
        /// <returns></returns>
        public Models.Test Update(Models.Test entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Modified;
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// delete test
        /// </summary>
        /// <param name="entity">test data entity</param>
        /// <returns></returns>
        public void Delete(Models.Test entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Deleted;
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Insert new test synonym
        /// </summary>
        /// <param name="entity">test synonym data entity</param>
        /// <returns></returns>
        public Models.TestSynonym InsertTestSynonym(Models.TestSynonym entity)
        {
            dbContext.TestSynonyms.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// update test synonym
        /// </summary>
        /// <param name="entity">test synonym data entity</param>
        /// <returns></returns>
        public Models.TestSynonym UpdateTestSynonym(Models.TestSynonym entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Modified;
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// delete test synonym
        /// </summary>
        /// <param name="entity">test synonym data entity</param>
        /// <returns></returns>
        public void DeleteTestSynonym(Models.TestSynonym entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Deleted;
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Insert new test sample
        /// </summary>
        /// <param name="entity">test samnple data entity</param>
        /// <returns></returns>
        public Models.TestSample AddTestSample(Models.TestSample entity)
        {
            dbContext.TestSamples.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// update test samples
        /// </summary>
        /// <param name="entity">test samples data entity</param>
        /// <returns></returns>
        public Models.TestSample UpdateTestSample(Models.TestSample entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Modified;
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// delete test samples
        /// </summary>
        /// <param name="entity">test samples data entity</param>
        /// <returns></returns>
        public void DeleteTestSample(Models.TestSample entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Deleted;
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Insert new test sample condition
        /// </summary>
        /// <param name="entity">test samnple condition data entity</param>
        /// <returns></returns>
        public Models.SampleTransportCondition AddTestSampleCondition(Models.SampleTransportCondition entity)
        {
            dbContext.SampleTransportConditions.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// update test samples condition
        /// </summary>
        /// <param name="entity">test samples condition data entity</param>
        /// <returns></returns>
        public Models.SampleTransportCondition UpdateTestSampleCondition(Models.SampleTransportCondition entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Modified;
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// delete sample condition
        /// </summary>
        /// <param name="entity">sample condition data entity</param>
        /// <returns></returns>
        public void DeleteTestSampleCondition(Models.SampleTransportCondition entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Deleted;
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Insert new test requirement
        /// </summary>
        /// <param name="entity">test requirement data entity</param>
        /// <returns></returns>
        public Models.TestRequirement AddTestRequirement(Models.TestRequirement entity)
        {
            dbContext.TestRequirements.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// update test requirement
        /// </summary>
        /// <param name="entity">test requirement data entity</param>
        /// <returns></returns>
        public Models.TestRequirement UpdateTestRequirement(Models.TestRequirement entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Modified;
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// delete test requirements
        /// </summary>
        /// <param name="entity">test requirements data entity</param>
        /// <returns></returns>
        public void DeleteTestRequirement(Models.TestRequirement entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Deleted;
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Insert new test step
        /// </summary>
        /// <param name="entity">test step data entity</param>
        /// <returns></returns>
        public Models.TestStep AddTestStep(Models.TestStep entity)
        {
            dbContext.TestSteps.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// update test requirement
        /// </summary>
        /// <param name="entity">test requirement data entity</param>
        /// <returns></returns>
        public Models.TestStep UpdateTestStep(Models.TestStep entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Modified;
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// delete test steps
        /// </summary>
        /// <param name="entity">test step data entity</param>
        /// <returns></returns>
        public void DeleteTestStep(Models.TestStep entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Deleted;
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Insert new test tutorial step
        /// </summary>
        /// <param name="entity">test  tutorial step data entity</param>
        /// <returns></returns>
        public Models.TestTutorialStep AddTestTutorialStep(Models.TestTutorialStep entity)
        {
            dbContext.TestTutorialSteps.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// update test tutorial steps
        /// </summary>
        /// <param name="entity">test tutorial step data entity</param>
        /// <returns></returns>
        public Models.TestTutorialStep UpdateTestTutorialStep(Models.TestTutorialStep entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Modified;
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// delete test tutorial steps
        /// </summary>
        /// <param name="entity">test tutorial step data entity</param>
        /// <returns></returns>
        public void DeleteTestTutorialStep(Models.TestTutorialStep entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Deleted;
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            if (dbContext != null)
            {
                dbContext.Dispose();
            }
        }
    }
}
