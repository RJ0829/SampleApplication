-- LookUp
-- delete from mp.LookUp;
if((select count(*) from mp.LookUp) = 0) begin

	insert into mp.LookUp (GroupID,TableName,FieldName,ValueCode,DisplayOrder,ValueDescription,OwnerFieldName,
										OwnerValue,DefaultValue,SystemRequired,Aliased,ValueForAction)
	values
		(2, 'Patient', 'StateId','SA',1,'South Australia',null,null,1,0,null,null),
		(2, 'Patient', 'StateId','NSW',2,'New South Wales',null,null,0,0,null,null),
		(2, 'Patient', 'Gender','M',1,'Male',null,null,0,0,null,null),
		(2, 'Patient', 'Gender','F',2,'Female',null,null,0,0,null,null),
		(2, 'Test', 'TestCategoryId','1',1,'Blood',null,null,0,0,null,null),
		(2, 'Test', 'TestCategoryId','2',2,'Glucose',null,null,0,0,null,null),
		(2, 'Patient', 'StateId','QLD',2,'Queensland',null,null,0,0,null,null),
		(2, 'Test', 'Laboratory','B',1,'Biochemistry ',null,null,0,0,null,null),
		(2, 'Test', 'Laboratory','C',1,'Clinical Laboratory',null,null,0,0,null,null),
		(2, 'TestSample', 'Unit','ml',1,'Milliliters',null,null,0,0,null,null),
		(2, 'TestSample', 'Unit','oz',2,'Ounces',null,null,0,0,null,null),
		(2, 'TestSample', 'SampleSampClassRule','adult',1,'Adult',null,null,0,0,null,null),
		(2, 'TestSample', 'SampleSampClassRule','pedia',2,'Pediatric',null,null,0,0,null,null),
		(2, 'TestStep', 'CompetencyLevelID','B',1,'Beginner',null,null,0,0,null,null),
		(2, 'TestStep', 'CompetencyLevelID','E',2,'Expert',null,null,0,0,null,null),
		(2, 'TestSample', 'SampleType','Blood',1,'Blood',null,null,0,0,null,null),
		(2, 'TestSample', 'SampleType','Faeces',2,'Faeces',null,null,0,0,null,null),
		(2, 'TestSample', 'AnalysisSampleType','Plasma',1,'Plasma','SampleType','Blood',0,0,null,null),
		(2, 'TestSample', 'AnalysisSampleType','Serum',2,'Serum','SampleType','Blood',0,0,null,null),
		(2, 'TestSample', 'AnalysisSampleType','Plasma1',1,'Plasma','SampleType','Faeces',0,0,null,null),
		(2, 'TestSample', 'AnalysisSampleType','Serum1',2,'Serum','SampleType','Faeces',0,0,null,null),
		(2, 'SampleTransportCondition', 'StandardCondition','cold',1,'Cold Temperature',null,null,0,0,null,null),
		(2, 'SampleTransportCondition', 'StandardCondition','hot',2,'Hot Temperature',null,null,0,0,null,null),
		(2, 'SampleTransportCondition', 'StandardCondition','other',3,'Other Condition',null,null,0,0,null,null),
		(2, 'TestRequirement', 'RequirementType','pp',1,'Patient Preparation',null,null,0,0,null,null),
		(2, 'TestRequirement', 'RequirementType','sr',2,'Special Requirement',null,null,0,0,null,null),
		(2, 'TestRequirement', 'StandardRequirement','ppsr1',1,'Should be Fasting','RequirementType','pp',0,0,null,null),
		(2, 'TestRequirement', 'StandardRequirement','ppsr2',2,'Lying down','RequirementType','pp',0,0,null,null),
		(2, 'TestRequirement', 'StandardRequirement','ppother',3,'Other Requirement','RequirementType','pp',0,0,null,null),
		(2, 'TestRequirement', 'StandardRequirement','srsr1',1,'Should be sleeping','RequirementType','sr',0,0,null,null),
		(2, 'TestRequirement', 'StandardRequirement','srother',2,'Other Requirement','RequirementType','sr',0,0,null,null)
	
end;

-- Equipment
-- delete from mp.Equipment;
if((select count(*) from mp.Equipment) = 0) begin

	set identity_insert mp.Equipment on;

	insert into mp.Equipment (EquipmentID,DomainID,Descriptor,[Description],CreatedDate,CreatedUserId,IsDeleted)
	values
		(1,1,'Vial','Vial',getdate(),1,0),
		(2,1,'Tube','Tube',getdate(),1,0)
				
	set identity_insert mp.Equipment off;

end;


-- Test
-- delete from mp.Test;
if((select count(*) from mp.Test) = 0) begin

	set identity_insert mp.Test on;

	insert into mp.Test (TestID,DomainID,TestCategoryID,TestCode,[Description],GuideVersion,EstimatedDuration,CreatedDate,CreatedUserId,IsDeleted)
	values
		(1, 1, 1,'AGB','',1,1,getdate(),1,0),
		(2, 1, 2,'GTT','',1,1,getdate(),1,0);
		

	set identity_insert mp.Test off;

end;

-- Test
-- delete from mp.TestSynonyms;
if((select count(*) from mp.TestSynonyms) = 0) begin

	set identity_insert mp.TestSynonyms on;

	insert into mp.TestSynonyms (SynonymId,TestID,PrimaryCode, Code,AlternateName,CreatedDate,CreatedUserId,IsDeleted)
	values
		(1, 1,'AGB','be','Base Excess',getdate(),1,0),
		(2, 1,'AGB','AGB','Blood gases',getdate(),1,0),
		(3, 1,'AGB','pCO2','pCO2',getdate(),1,0),
		(4, 1,'AGB','pH','pH',getdate(),1,0),
		(5, 1,'AGB','p02','p02',getdate(),1,0),
		(6, 2,'GTT','GTT','GTT',getdate(),1,0);
			
	set identity_insert mp.TestSynonyms off;

end;





