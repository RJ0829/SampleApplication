CREATE TABLE [mp].[TestTutorialSteps] (
    [TutorialStepID]  INT           IDENTITY (1, 1) NOT NULL,
    [TestID]          INT           NOT NULL,
    [StepDescription] VARCHAR (255) NOT NULL,
    [StepOrderID]     INT           NOT NULL,
    [VideoURL]        VARCHAR (250) NULL,
    [ImageURL]        VARCHAR (250) NULL,
    [DomainID]        INT           NOT NULL,
    [CreatedDate]     DATETIME      NOT NULL,
    [CreatedUserId]   INT           NOT NULL,
    [DeletedDate]     DATETIME      NULL,
    [DeletedUserId]   INT           NULL,
    [IsDeleted]       BIT           NOT NULL,
    CONSTRAINT [PK_TestTutorialSteps] PRIMARY KEY CLUSTERED ([TutorialStepID] ASC),
    CONSTRAINT [FK_TestTutorialSteps_Tests] FOREIGN KEY ([TestID]) REFERENCES [mp].[Test] ([TestID])
);



