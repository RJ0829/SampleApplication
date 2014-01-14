CREATE TABLE [mp].[SampleTransportCondition] (
    [ConditionId]       INT           IDENTITY (1, 1) NOT NULL,
    [SampleId]          INT           NOT NULL,
    [StandardCondition] VARCHAR (10)  NOT NULL,
    [SpecialCondition]  VARCHAR (255) NULL,
    CONSTRAINT [SampleTransportCondition_PK] PRIMARY KEY CLUSTERED ([ConditionId] ASC),
    CONSTRAINT [TestSample_SampleTransportCondition_FK1] FOREIGN KEY ([SampleId]) REFERENCES [mp].[TestSample] ([SampleId])
);



