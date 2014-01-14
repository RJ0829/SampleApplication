CREATE TABLE [mp].[TestStep] (
    [StepID]            INT           IDENTITY (1, 1) NOT NULL,
    [TestID]            INT           NOT NULL,
    [CompetencyLevelID] INT           NOT NULL,
    [StepName]          VARCHAR (100) NOT NULL,
    [StepOrder]         INT           NOT NULL,
    [StepDescription]   VARCHAR (MAX) NULL,
    [ImageUrl]          VARCHAR (500) NULL,
    [VideoUrl]          VARCHAR (500) NULL,
    [CreatedDate]       DATETIME      NOT NULL,
    [CreatedUserId]     INT           NOT NULL,
    [DeletedDate]       DATETIME      NULL,
    [DeletedUserId]     INT           NULL,
    [IsDeleted]         BIT           NOT NULL,
    CONSTRAINT [PK_TestStep] PRIMARY KEY CLUSTERED ([StepID] ASC),
    CONSTRAINT [FK_TestStep_Test] FOREIGN KEY ([TestID]) REFERENCES [mp].[Test] ([TestID])
);



