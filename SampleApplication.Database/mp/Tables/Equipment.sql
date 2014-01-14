CREATE TABLE [mp].[Equipment] (
    [EquipmentID]    INT           IDENTITY (1, 1) NOT NULL,
    [DomainID]       INT           NOT NULL,
    [Descriptor]     VARCHAR (100) NOT NULL,
    [Description]    VARCHAR (255) NULL,
    [IsTestKit]      BIT           NULL,
    [Supplier]       VARCHAR (10)  NULL,
    [SupplierCode]   VARCHAR (30)  NULL,
    [EquipmentClass] VARCHAR (10)  NULL,
    [SmallImage]     VARCHAR (500) NULL,
    [MediumImage]    VARCHAR (500) NULL,
    [LargeImage]     VARCHAR (500) NULL,
    [CreatedDate]    DATETIME      NOT NULL,
    [CreatedUserId]  INT           NULL,
    [DeletedDate]    DATETIME      NULL,
    [DeletedUserId]  INT           NULL,
    [IsDeleted]      BIT           NULL,
    CONSTRAINT [PK_Equipment] PRIMARY KEY CLUSTERED ([EquipmentID] ASC)
    
);



