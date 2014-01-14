/*!
* Infragistics.Web.ClientUI data source localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.DataSourceLocale) {
	$.ig.DataSourceLocale = {};

	$.extend($.ig.DataSourceLocale, {

		locale: {
			invalidDataSource: "Источник данных неизвестен. Скалярные данные не поддерживаются.",
			unknownDataSource: "Невозможно определить тип источника данных. Установите тип данных: JSON или XML.",
			errorParsingArrays: "Произошла ошибка при обработке массива данных. Схема не соответствует: ",
			errorParsingJson: "Произошла ошибка при обработке данных формата JSON. Схема не соответствует: ",
			errorParsingXml: "Произошла ошибка при обработке данных формата XML. Схема не соответствует: ",
			errorParsingHtmlTable: "Произошла ошибка при извлечении данных из HTML таблицы. Схема не соответствует: ",
			errorExpectedTbodyParameter: "Ожидаемый параметр: tbody или table элемент.",
			errorTableWithIdNotFound: "Не найдена HTML таблица соответствующая идентификатору: ",
			errorParsingHtmlTableNoSchema: "Произошла ошибка при извлечении данных из DOM таблицы: ",
			errorParsingJsonNoSchema: "Произошла ошибка при извлечении данных из JSON текста: ",
			errorParsingXmlNoSchema: "Произошла ошибка при извлечении данных из XML текста: ",
			errorXmlSourceWithoutSchema: "Источник данных является XML документом, но схема для документа не определена ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " Предоставленное условие фильтра нераспознаваемо: ",
			errorRemoteRequest: "Удаленный запрос на извлечение данных не удался: ",
			errorSchemaMismatch: "Входные данные не соответствуют схеме, это поле не может быть сопоставлено: ",
			errorSchemaFieldCountMismatch: "Входные данные не соответствуют схеме по числу полей. ",
			errorUnrecognizedResponseType: "Тип ответа указан некорректно или невозможно определить автоматически. Пожалуйста установите settings.responseDataType и/или settings.responseContentType.",
			hierarchicalTablesNotSupported: "Таблицы в HierarchicalSchema не поддерживаются.",
			cannotBuildTemplate: "Шаблон jQuery не может быть сконструирован. В источнике данных отсутствуют записи и колонки неопределены.",
			unrecognizedCondition: "Нераспозноваемое условие фильтровки в следующем выражении: ",
			fieldMismatch: "Следующее выражение содержит ошибочное поле или условие фильтровки: ",
			noSortingFields: "Поля не установлены. Необходимо установить хотя бы одно поле для сортировки перед использованием функции sort().",
			filteringNoSchema: "Схема/поля не установлены. Необходимо установить схему с определением полей и типов перед фильтровкой источника данных."
		}
	});

}

/*!
* Infragistics.Web.ClientUI common DV widget localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Chart) {
	$.ig.Chart = {};

	$.extend($.ig.Chart, {

		locale: {
			unsupportedBrowser: "Ваш браузер не поддерживает HTML5 canvas элемент. <br/>Попробуйте воспользоваться следующими версиями браузеров:",
			currentBrowser: "Ваш браузер: {0}",
			ie9: "Microsoft Internet Explorer 9+",
			chrome8: "Google Chrome 8+",
			firefox36: "Mozilla Firefox 3.6+",
			safari5: "Apple Safari 5+",
			opera11: "Opera 11+",
			ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			operaDownload: "http://www.opera.com/download/",
			chromeDownload: "http://www.google.com/chrome",
			firefoxDownload: "http://www.mozilla.com/",
			safariDownload: "http://www.apple.com/safari/download/",
			seriesName: "необходимо установить опцию name при определении серий.",
			axisName: "необходимо установить опцию name при определении осей.",
			close: "Закрыть",
			overview: "Обзор"
		}
	});

}

/*!
* Infragistics.Web.ClientUI shared localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*jQuery must be defined before this. If it is not the $ variable is created*/
$ = $ || {};

$.ig = $.ig || {};

if (!$.ig.SharedLocale) {
	$.ig.SharedLocale = {};

	$.extend($.ig.SharedLocale, {

		locale: {
			popoverOptionChangeNotSupported: "Изменение этой опции невозможно после инициализации igPopover:"
		}
	});

}

/*!
* Infragistics.Web.ClientUI templating localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Templating) {
	$.ig.Templating = {};

	$.extend($.ig.Templating, {
		locale: {
			undefinedArgument: 'Произошла ошибка при извлечении значения поля из источника данных: '
		}
	});
}

/*!
* Infragistics.Web.ClientUI Combo localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global $ */
$.ig = $.ig || {};

if (!$.ig.Combo) {
	$.ig.Combo = {
		locale: {
			noMatchFoundText: 'Результатов нет',
			dropDownButtonTitle: 'Показать список',
			clearButtonTitle: 'Очистить значение'
		}
	};
}

/*!
* Infragistics.Web.ClientUI Dialog localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global $ */
$.ig = $.ig || {};

if (!$.ig.Dialog) {
	$.ig.Dialog = {
		locale: {
			closeButtonTitle: "закрыть",
			minimizeButtonTitle: "минимизировать",
			maximizeButtonTitle: "максимизировать",
			pinButtonTitle: "прикрепить",
			unpinButtonTitle: "открепить",
			restoreButtonTitle: "восстановить"
		}
	};
}

/*!
* Infragistics.Web.ClientUI Editors localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global $ */
$.ig = $.ig || {};

if (!$.ig.Editor) {
	$.ig.Editor = {
		locale: {
			spinUpperTitle: 'Увеличение',
			spinLowerTitle: 'Уменьшение',
			buttonTitle: 'Показать список',
			clearTitle: 'Удалить значение',
			datePickerButtonTitle: 'Показать календарь'
		}
	};
}

/*!
* Infragistics.Web.ClientUI Grid localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Grid) {
	$.ig.Grid = {};

	$.extend($.ig.Grid, {

		locale: {
			noSuchWidget: "Компонент не загружен: ",
			autoGenerateColumnsNoRecords: "Установлена опция autoGenerateColumns, но исходные данные не содержат записей и поэтому невозможно определить поля",
			optionChangeNotSupported: "Динамические изменения следующей опции не поддерживаются:",
			optionChangeNotScrollingGrid: "Динамические изменения следующей опции не поддерживаются так как изначально таблица не имела ограничения размеров и необходима полная перерисовка:",
			noPrimaryKeyDefined: "Первичный ключ не определен. Чтобы использовать такие возможности как редактирование (Grid Updating), необходимо установить первичный ключ.",
			indexOutOfRange: "Индекс записи выходит за пределы допустимого.",
			noSuchColumnDefined: "Указанный идентификатор колонки не соответствует ни одной колонке в таблице.",
			columnIndexOutOfRange: "Индекс колонки выходит за пределы допустимого.",
			recordNotFound: "Указанный идентификатор записи не соответствует ни одной записи в таблице:",
			columnNotFound: "Колонка не найдена по указанному ключу:",
			colPrefix: "Колонка ",
			columnVirtualizationRequiresWidth: "Опция virtualization / columnVirtualization установлена в true, но ширина таблицы не может быть определена по колонкам. Необходимо установить a) ширину таблицы (width), b) defaultColumnWidth, c) ширину каждой колонки",
			virtualizationRequiresHeight: "Опция virtualization установлена в true, что требует определения высоты таблицы (height).",
			colVirtualizationDenied: "Установка опции columnVirtualization разрешена только при фиксированной виртуализации.",
			noColumnsButAutoGenerateTrue: "Опция autoGenerateColumns установлена в false, но таблица не содержит определений колонок. Установите autoGenerateColumns в true или определите колонки программно.",
			noPrimaryKey: "Для компонента igHierarchicalGrid необходимо задать первичный ключ.",
			templatingEnabledButNoTemplate: "Опция jQueryTemplating установлена в true, но опция rowTemplate не определена.",
			expandTooltip: "Развернуть",
			collapseTooltip: "Свернуть"
		}
	});

	$.ig.GridFiltering = $.ig.GridFiltering || {};

	$.extend($.ig.GridFiltering, {
		locale: {
			startsWithNullText: "Начинается с...",
			endsWithNullText: "Оканчивается на...",
			containsNullText: "Содержит...",
			doesNotContainNullText: "Не содержит...",
			equalsNullText: "Равно...",
			doesNotEqualNullText: "Не равно...",
			greaterThanNullText: "Больше...",
			lessThanNullText: "Меньше...",
			greaterThanOrEqualToNullText: "Больше или равно...",
			lessThanOrEqualToNullText: "Меньше или равно...",
			onNullText: "На...",
			notOnNullText: "Не на...",
			emptyNullText: "Пусто",
			notEmptyNullText: "Не пусто",
			nullNullText: "Null",
			notNullNullText: "Не null",
			startsWithLabel: "Начинается с",
			endsWithLabel: "Оканчивается на",
			containsLabel: "Содержит",
			doesNotContainLabel: "Не содержит",
			equalsLabel: "Равно",
			doesNotEqualLabel: "Не равно",
			greaterThanLabel: "Больше",
			lessThanLabel: "Меньше",
			greaterThanOrEqualToLabel: "Больше или равно",
			lessThanOrEqualToLabel: "Меньше или равно",
			trueLabel: "True",
			falseLabel: "False",
			afterLabel: "После",
			beforeLabel: "До",
			todayLabel: "Сегодня",
			yesterdayLabel: "Вчера",
			thisMonthLabel: "В этом месяце",
			lastMonthLabel: "В прошлом месяце",
			nextMonthLabel: "В следующем месяце",
			thisYearLabel: "В этом году",
			lastYearLabel: "В прошлом году",
			nextYearLabel: "В следующем году",
			clearLabel: "Очистить фильтр",
			noFilterLabel: "Нет",
			onLabel: "На",
			notOnLabel: "Не на",
			advancedButtonLabel: "Дополнительно",
			filterDialogCaptionLabel: "Усиленный поиск",
			filterDialogConditionLabel1: "Показать записи соответствующие ",
			filterDialogConditionLabel2: " из следующих условий",
			filterDialogOkLabel: "Поиск",
			filterDialogCancelLabel: "Отмена",
			filterDialogAnyLabel: "ОДНОМУ",
			filterDialogAllLabel: "КАЖДОМУ",
			filterDialogAddLabel: "Добавить",
			filterDialogErrorLabel: "Превышено допустимое количество условий.",
			filterSummaryTitleLabel: "Результаты поиска",
			filterSummaryTemplate: "${matches} найденных записей",
			filterDialogClearAllLabel: "Очистить ВСЕ",
			tooltipTemplate: "Отфильтровано по ${condition}",
			// M.H. 13 Oct. 2011 Fix for bug #91007
			featureChooserText: "Спрятать фильтр",
			featureChooserTextHide: "Показать фильтр",
			// M.H. 17 Oct. 2011 Fix for bug #91007
			featureChooserTextAdvancedFilter: "Усиленный фильтр",
			virtualizationSimpleFilteringNotAllowed: "Когда горизонтальная виртуализация включена, упрощенный режим фильтрации (фильтровочный ряд) не поддерживается. Установите 'усиленный' режим и/или не устанавливайте advancedModeEditorsVisible",
			featureChooserNotReferenced: "Скрипт модуля выбора опций отсутствует. Чтобы избежать этой ошибки, добавьте ссылку на файл ig.ui.grid.featurechooser.js, используйте загрузчик или ссылку на комбинированный скрипт."
		}
	});

	$.ig.GridGroupBy = $.ig.GridGroupBy || {};

	$.extend($.ig.GridGroupBy, {
		locale: {
			emptyGroupByAreaContent: "Поместите колонку сюда или {0} для группировки",
			emptyGroupByAreaContentSelectColumns: "выберите колонки",
			emptyGroupByAreaContentSelectColumnsCaption: "выберите колонки",
			expandTooltip: "Развернуть групповой ряд",
			collapseTooltip: "Свернуть групповой ряд",
			removeButtonTooltip: "Убрать группировочную колонку",
			featureChooserText: "Разгруппировать",
			featureChooserTextHide: "Группировать",
			modalDialogCaptionButtonDesc: "Нажмите для сортировки по возрастанию",
			modalDialogCaptionButtonAsc: "Нажмите для сортировки по убыванию",
			modalDialogCaptionButtonUngroup: "Нажмите для разгруппировки",
			modalDialogGroupByButtonText: "Добавить",
			modalDialogCaptionText: 'Добавить к группировке',
			modalDialogDropDownLabel: 'Показ:',
			modalDialogClearAllButtonLabel: 'очистить все',
			modalDialogRootLevelHierarchicalGrid: 'первый уровень',
			modalDialogDropDownButtonCaption: "Нажмите чтобы показать/спрятать",
			modalDialogButtonApplyText: 'Готово',
			modalDialogButtonCancelText: 'Отмена'
		}
	});

	$.ig.GridHiding = $.ig.GridHiding || {};

	$.extend($.ig.GridHiding, {
		locale: {
			columnChooserDisplayText: "Выбор колонок",
			hiddenColumnIndicatorTooltipText: "Скрытые колонки",
			columnHideText: "Скрыть",
			columnChooserCaptionLabel: "Выбор колонок",
			columnChooserCheckboxesHeader: "видеть",
			columnChooserColumnsHeader: "колонка",
			columnChooserCloseButtonTooltip: "Закрыть",
			hideColumnIconTooltip: "Скрыть",
			featureChooserNotReferenced: "Скрипт модуля выбора опций отсутствует. Чтобы избежать этой ошибки, добавьте ссылку на файл ig.ui.grid.featurechooser.js, используйте загрузчик или ссылку на комбинированный скрипт.",
			columnChooserShowText: "Показ",
			columnChooserHideText: "Скрыть",
			columnChooserResetButtonLabel: "сброс",
			columnChooserButtonApplyText: 'Готово',
			columnChooserButtonCancelText: 'Отмена'
		}
	});

	$.ig.GridPaging = $.ig.GridPaging || {};

	$.extend($.ig.GridPaging, {

		locale: {
			pageSizeDropDownLabel: "Показать ",
			pageSizeDropDownTrailingLabel: "записей",
			//pageSizeDropDownTemplate: "Show ${dropdown} records",
			nextPageLabelText: "след",
			prevPageLabelText: "пред",
			firstPageLabelText: "",
			lastPageLabelText: "",
			currentPageDropDownLeadingLabel: "Стр",
			currentPageDropDownTrailingLabel: "из ${count}",
			//currentPageDropDownTemplate: "Стр ${dropdown} из ${count}",
			currentPageDropDownTooltip: "Выберите номер страницы",
			pageSizeDropDownTooltip: "Выберите количество записей на страницу",
			pagerRecordsLabelTooltip: "Текущий спектр записей",
			prevPageTooltip: "перейти к предыдущей странице",
			nextPageTooltip: "перейти к следующей странице",
			firstPageTooltip: "перейти к первой странице",
			lastPageTooltip: "перейти к последней странице",
			pageTooltipFormat: "страница ${index}",
			pagerRecordsLabelTemplate: "${startRecord} - ${endRecord} из ${recordCount} записей"
		}
	});

	$.ig.GridRowSelectors = $.ig.GridRowSelectors || {};

	$.extend($.ig.GridRowSelectors, {

		locale: {
			selectionNotLoaded: "igGridSelection не включена. Чтобы избежать этого сообщения об ошибке, включите опцию селекции (Selection) в таблице или установите опцию requireSelection в модуле Row Selectors в false."
		}
	});

	$.ig.GridSorting = $.ig.GridSorting || {};

	$.extend($.ig.GridSorting, {
		locale: {
			sortedColumnTooltipFormat: 'отсортировано ${direction}',
			unsortedColumnTooltip: 'нажмите для сортировки колонки',
			ascending: 'по возрастанию',
			descending: 'по убыванию',
			modalDialogSortByButtonText: 'сортировать',
			modalDialogResetButton: "сброс",
			modalDialogCaptionButtonDesc: "Нажмите для сортировки по убыванию",
			modalDialogCaptionButtonAsc: "Нажмите для сортировки по возрастанию",
			modalDialogCaptionButtonUnsort: "Нажмите для очистки сортировки",
			featureChooserText: "Сортировать по нескольким",
			modalDialogCaptionText: "Сортировать по нескольким",
			modalDialogButtonApplyText: 'Готово',
			modalDialogButtonCancelText: 'Отмена'
			//modalDialogButtonSlideCaption: "Нажмите для показа/скрытия отсортированных колонок"
		}
	});

	$.ig.GridSummaries = $.ig.GridSummaries || {};

	$.extend($.ig.GridSummaries, {
		locale: {
			featureChooserText: "Скрыть сводки",
			featureChooserTextHide: "Показать сводки",
			dialogButtonOKText: 'OK',
			dialogButtonCancelText: 'Отмена',
			emptyCellText: '',
			summariesHeaderButtonTooltip: 'Показать/скрыть сводки',
			// M.H. 13 Oct. 2011 Fix for bug 91008
			defaultSummaryRowDisplayLabelCount: 'Кол',
			defaultSummaryRowDisplayLabelMin: 'Мин',
			defaultSummaryRowDisplayLabelMax: 'Макс',
			defaultSummaryRowDisplayLabelSum: 'Сумма',
			defaultSummaryRowDisplayLabelAvg: 'Сред',
			defaultSummaryRowDisplayLabelCustom: 'Вычисление',
			calculateSummaryColumnKeyNotSpecified: "Установите идентификатор поля (column key) для вычисления сводки",
			featureChooserNotReferenced: "Скрипт модуля выбора опций отсутствует. Чтобы избежать этой ошибки, добавьте ссылку на файл ig.ui.grid.featurechooser.js, используйте загрузчик или ссылку на комбинированный скрипт."
		}
	});

	$.ig.GridUpdating = $.ig.GridUpdating || {};

	$.extend($.ig.GridUpdating, {
		locale: {
			doneLabel: 'Готово',
			doneTooltip: 'Завершить редактирование и обновить',
			cancelLabel: 'Отмена',
			cancelTooltip: 'Завершить редактирование и не обновлять',
			addRowLabel: 'Добавить новую запись',
			addRowTooltip: 'Нажмите для редактирования новой записи',
			deleteRowLabel: '',
			deleteRowTooltip: 'Удалить запись',
			igEditorException: 'Редактирование ui.igGrid возможно только при наличии ui.igEditor',
			igComboException: 'Использование редактора спискового типа в ui.igGrid возможно только при наличии ui.igCombo',
			igRatingException: 'Использование редактора рейтингового типа в ui.igGrid возможно только при наличии ui.igRating',
			igValidatorException: 'Опции валидности в igGridUpdating доступны только при наличии ui.igValidator',
			noPrimaryKeyException: 'Обновление после удаления возможно только если установлено "primaryKey" в опциях igGrid.',
			hiddenColumnValidationException: 'Невозможно редактировать запись со скрытой колонкой и валидацией.',
			dataDirtyException: 'Таблица содержит несохраненные данные. Чтобы избежать сообщения об ошибке, установите опцию "autoCommit" в igGrid или обработайте событие "dataDirty" из igGridUpdating и возвратите false из обработчика. Обработчик также может вызвать "commit()" из igGrid.'
		}
	});

}

/*!
* Infragistics.Web.ClientUI HTML Editor localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.HtmlEditor) {
	$.ig.HtmlEditor = {};

	$.extend($.ig.HtmlEditor, {

		locale: {
			boldButtonTitle: 'Жирность',
			italicButtonTitle: 'Наклон',
			underlineButtonTitle: 'Подчеркивание',
			strikethroughButtonTitle: 'Зачеркивание',
			increaseFontSizeButtonTitle: 'Увеличить размер шрифта',
			decreaseFontSizeButtonTitle: 'Уменьшить размер шрифта',
			alignTextLeftButtonTitle: 'Выравнить влево',
			alignTextRightButtonTitle: 'Выравнить вправо',
			alignTextCenterButtonTitle: 'Выравнить по центру',
			justifyButtonTitle: 'Распределить',
			bulletsButtonTitle: 'Пункты',
			numberingButtonTitle: 'Нумеровка',
			decreaseIndentButtonTitle: 'Уменьшить отступ',
			increaseIndentButtonTitle: 'Увеличить отступ',
			insertPictureButtonTitle: 'Вставить картинку',
			fontColorButtonTitle: 'Цвет букв',
			textHighlightButtonTitle: 'Цвет отметки',
			insertLinkButtonTitle: 'Вставить ссылку',
			insertTableButtonTitle: 'Таблица',
			addRowButtonTitle: 'Добавить ряд',
			removeRowButtonTitle: 'Удалить ряд',
			addColumnButtonTitle: 'Добавить колонку',
			removeColumnButtonTitle: 'Удалить колонку',
			inserHRButtonTitle: 'Вставить разделитель',
			viewSourceButtonTitle: 'Показать HTML',
			cutButtonTitle: 'Вырезать',
			copyButtonTitle: 'Копировать',
			pasteButtonTitle: 'Вставить',
			undoButtonTitle: 'Отменить изменения',
			redoButtonTitle: 'Вернуть изменения',
			imageUrlDialogText: 'URL картинки:',
			imageAlternativeTextDialogText: 'Дополнительный текст:',
			imageWidthDialogText: 'Ширина картинки:',
			imageHeihgtDialogText: 'Высота картинки:',
			linkNavigateToUrlDialogText: 'URL адрес:',
			linkDisplayTextDialogText: 'Текст ссылки:',
			linkOpenInDialogText: 'Назначение:',
			linkTargetNewWindowDialogText: 'Новое окно',
			linkTargetSameWindowDialogText: 'Текущее окно',
			linkTargetParentWindowDialogText: 'Родительское окно',
			linkTargetTopmostWindowDialogText: 'Верхнее окно',
			applyButtonTitle: 'Применить',
			cancelButtonTitle: 'Отмена',
			collapseButtonTitle: 'Свернуть',
			fontNames: {
				win: [
						{ text: "Times New Roman", value: "Times New Roman" },
						{ text: "Arial", value: "Arial" },
						{ text: "Arial Black", value: "Arial Black" },
						{ text: "Helvetica", value: "Helvetica" },
						{ text: "Comic Sans MS", value: "Comic Sans MS" },
						{ text: "Courier New", value: "Courier New" },
						{ text: "Georgia", value: "Georgia" },
						{ text: "Impact", value: "Impact" },
						{ text: "Lucida Console", value: "Lucida Console" },
						{ text: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
						{ text: "Palatino Linotype", value: "Palatino Linotype" },
						{ text: "Tahoma", value: "Tahoma" },
						{ text: "Trebuchet MS", value: "Trebuchet MS" },
						{ text: "Verdana", value: "Verdana" },
						{ text: "Symbol", value: "Symbol" },
						{ text: "Webdings", value: "Webdings" },
						{ text: "Wingdings", value: "Wingdings" },
						{ text: "MS Sans Serif", value: "MS Sans Serif" },
						{ text: "MS Serif", value: "MS Serif" }
					],
				mac: [
						{ text: "Times New Roman", value: "Times New Roman" },
						{ text: "Arial", value: "Arial" },
						{ text: "Arial Black", value: "Arial Black" },
						{ text: "Helvetica", value: "Helvetica" },
						{ text: "Comic Sans MS", value: "Comic Sans MS" },
						{ text: "Courier New", value: "Courier New" },
						{ text: "Georgia", value: "Georgia" },
						{ text: "Impact", value: "Impact" },
						{ text: "Monaco", value: "Monaco" },
						{ text: "Lucida Grande", value: "Lucida Grande" },
						{ text: "Book Antiqua", value: "Book Antiqua" },
						{ text: "Geneva", value: "Geneva" },
						{ text: "Trebuchet MS", value: "Trebuchet" },
						{ text: "Verdana", value: "Verdana" },
						{ text: "Symbol", value: "Symbol" },
						{ text: "Webdings", value: "Webdings" },
						{ text: "Zapf Dingbats", value: "Zapf Dingbats" },
						{ text: "New York", value: "New York" }
					]
			},
			fontSizes: [
				{ text: "1", value: "1 (8pt)", style: "xx-small"},
				{ text: "2", value: "2 (9pt)", style: "x-small" },
				{ text: "3", value: "3 (10pt)", style: "small" },
				{ text: "4", value: "4 (12pt)", style: "medium" },
				{ text: "5", value: "5 (14pt)", style: "large" },
				{ text: "6", value: "6 (16pt)", style: "x-large" },
				{ text: "7", value: "7 (18pt)", style: "xx-large" }
				],
			formatsList: [
					{ text: "h1", value: "Заголовок 1" },
					{ text: "h2", value: "Заголовок 2" },
					{ text: "h3", value: "Заголовок 3" },
					{ text: "h4", value: "Заголовок 4" },
					{ text: "h5", value: "Заголовок 5" },
					{ text: "h6", value: "Заголовок 6" }
				]
		}

	});
}

/*!
* Infragistics.Web.ClientUI Tree localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Tree) {
	$.ig.Tree = {};

	$.extend($.ig.Tree, {
		locale: {
			invalidArgumentType: 'Неправильный тип аргумента.',
			errorOnRequest: 'Произошла ошибка при запросе данных: ',
			noDataSourceUrl: 'Необходимо установить опцию dataSourceUrl, чтобы igTree смог произвести запрос данных с указанного URL.',
			incorrectPath: 'Узел не найден по указанному пути: ',
			incorrectNodeObject: 'Указанный аргумент не соответствует узлу jQuery.',
			setOptionError: 'Динамические изменения следующей опции не поддерживаются: '
		}
	});

}

/*!
* Infragistics.Web.ClientUI Upload localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Upload) {
	$.ig.Upload = {};

	$.extend($.ig.Upload, {

		locale: {
			labelUploadButton: "Загрузить файл",
			labelAddButton: "Добавить",
			labelClearAllButton: "Очистить загруженные",
			// M.H. 13 May 2011 - fix bug 75042
			labelSummaryTemplate: "Загружено {0} из {1}",
			labelSummaryProgressBarTemplate: "{0}/{1}",
			labelShowDetails: "Показать подробнее",
			labelHideDetails: "Скрыть подробности",
			labelSummaryProgressButtonCancel: "Отмена",
			// M.H. 1 June 2011 Fix bug #77532
			labelSummaryProgressButtonContinue: "Загрузить",
			labelSummaryProgressButtonDone: "Готово",
			labelProgressBarFileNameContinue: "...",

			//error messages
			errorMessageFileSizeExceeded: "Файл превышает разрешенный размер.",
			errorMessageGetFileStatus: "Невозможно получить текущий статус загрузки! Возможна потеря соединения.",
			errorMessageCancelUpload: "Невозможно отправить команду на отмену загрузки! Возможна потеря соединения.",
			errorMessageNoSuchFile: "Указанный файл не найден. Возможно файл слишком большой.",
			errorMessageOther: "Произошла внутренняя ошибка при загрузке. Код ошибки: {0}.",
			errorMessageValidatingFileExtension: "Файлы с таким расширением не поддерживаются.",
			errorMessageAJAXRequestFileSize: "Ошибка удаленного запроса размера файла.",
			errorMessageMaxUploadedFiles: "Превышено разрешенное количество файлов для загрузки.",
			errorMessageMaxSimultaneousFiles: "Недопустимое значение опции maxSimultaneousFilesUploads - должно быть больше 0 и не null.",
			errorMessageTryToRemoveNonExistingFile: "Попытка удаления несуществующего файла {0}.",
			errorMessageTryToStartNonExistingFile: "Попытка загрузки несуществующего файла {0}.",

			// M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			// title attributes            
			titleUploadFileButtonInit: "Загрузить файл",
			titleAddFileButton: "Добавить",
			titleCancelUploadButton: "Отмена",
			// M.H. 1 June 2011 Fix bug #77532
			titleSummaryProgressButtonContinue: "Загрузить",
			titleClearUploaded: "Очистить загруженные",
			titleShowDetailsButton: "Показать подробнее",
			titleHideDetailsButton: "Скрыть подробности",
			titleSummaryProgressButtonCancel: "Отмена",
			titleSummaryProgressButtonDone: "Готово",
			// M.H. 1 June 2011 Fix bug #77532
			titleSingleUploadButtonContinue: "Загрузить",
			titleClearAllButton: "Очистить загруженные"
		}
	});

}

/*!
* Infragistics.Web.ClientUI Validator localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global $ */
$.ig = $.ig || {};

if (!$.ig.Validator) {
	$.ig.Validator = {
		locale: {
			defaultMessage: 'Пожалуйста, исправьте это поле',
			selectMessage: 'Пожалуйста, выберите значение',
			rangeSelectMessage: 'Пожалуйста, выберите не более {0} и не менее {1} пунктов',
			minSelectMessage: 'Пожалуйста, выберите по крайней мере {0} пунктов',
			maxSelectMessage: 'Пожалуйста, выберите не более {0} пунктов',
			rangeLengthMessage: 'Пожалуйста, введите значение в диапазоне от {0} до {1} символов',
			minLengthMessage: 'Пожалуйста, введите по крайней мере {0} символов',
			maxLengthMessage: 'Пожалуйста, введите не более {0) символов',
			requiredMessage: 'Это поле является обязательным',
			maskMessage: 'Пожалуйста, заполните все необходимые позиции',
			dateFieldsMessage: 'Пожалуйста, введите значения в поля даты',
			invalidDayMessage: 'Неверный день месяца. Пожалуйста, введите правильный день',
			dateMessage: 'Пожалуйста, введите действительную дату',
			numberMessage: 'Пожалуйста, введите действительный номер',
			rangeMessage: 'Пожалуйста, введите значение в диапазоне от {0} до {1}',
			minMessage: 'Пожалуйста, введите значение больше или равно {0}',
			maxMessage: 'Пожалуйста, введите значение меньше или равно {0}'
		}
	};
}

/*!
* Infragistics.Web.ClientUI Video Player localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.VideoPlayer) {
	$.ig.VideoPlayer = {};

	$.extend($.ig.VideoPlayer, {

		locale: {
			liveStream: "Прямой эфир",
			live: "Вживую",
			paused: "Пауза",
			playing: "Воспроизведение",
			play: 'Воспроизводить',
			volume: "Уровень звука",
			unsupportedVideoSource: "В исходных видеоклипах отсутствует клип в формате, поддерживаемом вашим браузером.",
			missingVideoSource: "Исходный видеоклип неопределен.",
			progressLabelLongFormat: "$currentTime$ / $duration$",
			progressLabelShortFormat: "$currentTime$",
			enterFullscreen: "На весь экран",
			exitFullscreen: "Вернуться в браузер",
			skipTo: "ПРОПУСТИТЬ ДО",
			unsupportedBrowser: "Ваш браузер не поддерживает HTML5 video. <br/>Попробуйте воспользоваться следующими версиями браузеров:",
			currentBrowser: "Ваш браузер: {0}",
			ie9: "Microsoft Internet Explorer 9+",
			chrome8: "Google Chrome 8+",
			firefox36: "Mozilla Firefox 3.6+",
			safari5: "Apple Safari 5+",
			opera11: "Opera 11+",
			ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			operaDownload: "http://www.opera.com/download/",
			chromeDownload: "http://www.google.com/chrome",
			firefoxDownload: "http://www.mozilla.com/",
			safariDownload: "http://www.apple.com/safari/download/",
			buffering: 'Буферизация...',
			adMessage: 'Реклама: Видео возобновиться через $duration$ секунд.',
			adMessageLong: 'Реклама: Видео возобновиться через $duration$.',
			adMessageNoDuration: 'Реклама: Видео возобновиться после рекламы.',
			adNewWindowTip: 'Реклама: Щелкните, чтобы открыть в новом окне браузера.',
			nonDivException: 'Infragistics HTML5 Video Player может быть определен только через DIV элемент.',
			relatedVideos: 'ПОХОЖИЕ КЛИПЫ',
			replayButton: 'Еще раз',
			replayTooltip: 'Щелкнить чтобы посмотреть еще раз.'
		}
	});

}


