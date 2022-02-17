(function ($) {
	$.fn.easiGrid = function(params){
		function EasiGrid(options){
			this.options = options;
		}
		
		EasiGrid.prototype._init = function($element){
			var _this = this;
			_this.isShift = false;
			_this.isCtrl = false;
			_this.internalKeyExpr = "___key___";
			$(document).on("keydown", function(e){
				if(e.keyCode == 16){
					_this.isShift = true;
				}
				if(e.keyCode == 17){
					_this.isCtrl = true;
				}
			});
			
			$(document).on("keyup", function(e){
				if(e.keyCode == 16){
					_this.isShift = false;
				}
				if(e.keyCode == 17){
					_this.isCtrl = false;
				}
			});
			
			$element.addClass("easi-grid");
			var $tableWrapper = $("<div class='easi-grid-table-wrapper'>");
			var $table = $("<table class='easi-grid-table'>");
			this._$element = $element;
			$tableWrapper.append($table);
			$element.append($tableWrapper);
			
			$table.on("mousedown", "tr", function(e){
				if(_this.isShift){
					window.getSelection().removeAllRanges();
				}
			});
			
			var filteringEmptyRow = function(dataSource, sets, resultSets){
				var resultSets = resultSets ? resultSets : new Map();
				for(var i=0;i<dataSource.length;i++){
					if(sets.delete(_this._getKey(dataSource[i]))){
						resultSets.set(_this._getKey(dataSource[i]), dataSource[i]);
					}
				}
				return resultSets;
			};
			var selectedRows = filteringEmptyRow(_this.options.dataSource, _this.options.selectedRowSets);
			_this.options.selectedRowSets.clear();
			selectedRows.forEach(function(value, key){
				_this.options.selectedRowSets.set(key, value);
			});
			
			_this._findRows(_this.options.dataSource);
			
			this._createHeader();
			this._createDataRows();
			
			if(this.options.onContentReady){
				this.options.onContentReady({
					component:this
				});
			}
		};
		
		EasiGrid.prototype._sortingRows = function(){
			var _this = this;
			var dataSource = _this.options._currentRows;
			var sortingMap = _this.options.sortingMap;
			sortingMap.sort(function(a, b){
				if(a.sortIndex > b.sortIndex){
					return 1;
				}
				if(a.sortIndex < b.sortIndex){
					return -1;
				}
				return 0;
			});
			for(var i=sortingMap.length-1;i>=0;i--){
				dataSource.sort(function(a, b){
					var sortResult = 0;
					if(a[sortingMap[i].dataField] > b[sortingMap[i].dataField] || (a[sortingMap[i].dataField] !== null && b[sortingMap[i].dataField] !== undefined && (b[sortingMap[i].dataField] === null || b[sortingMap[i].dataField] === undefined))){
						sortResult = 1;
					}
					if(a[sortingMap[i].dataField] < b[sortingMap[i].dataField] || ((a[sortingMap[i].dataField] === null || b[sortingMap[i].dataField] === undefined) && b[sortingMap[i].dataField] !== null && b[sortingMap[i].dataField] !== undefined)){
						sortResult = -1;
					}
					return sortingMap[i].sortOrder == "desc" ? sortResult*-1 : sortResult;
				});
			}
		};
		
		EasiGrid.prototype.getRowDataByKey = function(key){
			var _this = this;
			var isMultipleKey = Array.isArray(_this.options.keyExpr);
			var data;
			if(isMultipleKey){
				data = _this.options.dataSource.find(function(obj){
					var isMatched = true;
					for(var i=0;i<_this.options.keyExpr.length;i++){
						if(obj[_this.options.keyExpr[i]] != key[i]){
							isMatched = false;
							break;
						}
					}
					return isMatched;
				});
			}else{
				data = _this.options.dataSource.find(function(obj){
					return obj[_this.options.keyExpr] == key;
				});
			}
			return data;
		};
		
		EasiGrid.prototype.getRowKeyByIndex = function(index){
			if(this.options._currentRows[index]){
				return JSON.parse(this._getKey(this.options._currentRows[index]));
			}else{
				return undefined;
			}
		};
		
		EasiGrid.prototype.getRowDataByIndex = function(index){
			if(this.options._currentRows[index]){
				return this.getRowDataByKey(this.getRowKeyByIndex(index));
			}else{
				return undefined;
			}
		};
		
		EasiGrid.prototype.selectRowByIndex = function(index){
			var _this = this;
			var isAllChecked = true;
			if(_this.options._currentRows[index]){
				if(_this.options.selection == "single"){
					if(!_this.options.selectedRowSets.has(_this._getKey(_this.options._currentRows[index]))){
						var $trList = _this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table > tbody > tr");
						_this.options.selectedRowSets.clear();
						_this.options.selectedRowSets.set(_this._getKey(_this.options._currentRows[index]), _this.options._currentRows[index]);
						$trList.removeClass("selected");
						$trList.eq(index).addClass("selected");
						if(_this.options.onSelectionChanged){
							_this.options.onSelectionChanged({
								component:_this,
								selectedRowKeys:_this.getSelectedRowKeys(),
								selectedRowsData:_this.getSelectedRowsData()
							});
						}
					}
				}else if(_this.options.selection == "multiple"){
					var start = 0;
					var end = _this.options._currentRows.length;
					if(_this.options.paging){
						start = (_this.options.page-1) * _this.options.pageSize;
						end = start+_this.options.pageSize;
						if(end > _this.options._currentRows.length){
							end = _this.options._currentRows.length;
						}
					}
					var $tr = _this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table > tbody > tr:eq("+(index-start)+")");
					var $checkbox = _this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table > tbody > tr:eq("+(index-start)+") > td > .easi-grid-td-inner > .easi-grid-icon-container > .easi-grid-checkbox-wrap > .easi-grid-checkbox");
					var $allCheckbox = _this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table > thead > tr > th > .easi-grid-header-row-inner > .easi-grid-header-row-checkbox-wrap > .easi-grid-all-checkbox");
					$checkbox.prop("checked", true);
					_this.options.selectedRowSets.set(_this._getKey(_this.options._currentRows[index]), _this.options._currentRows[index]);
					$tr.addClass("selected");
					for(var i=start;i<end;i++){
						if(!_this.options.selectedRowSets.has(_this._getKey(_this.options._currentRows[i]))){
							isAllChecked = false;
						}
					}
					if(isAllChecked){
						$allCheckbox.prop("checked", true);
					}
					if(_this.options.onSelectionChanged){
						_this.options.onSelectionChanged({
							component:_this,
							selectedRowKeys:_this.getSelectedRowKeys(),
							selectedRowsData:_this.getSelectedRowsData()
						});
					}
				}
			}
		};
		
		EasiGrid.prototype._getKey = function(data){
			var _this = this;
			if(_this[_this.internalKeyExpr] !== undefined && _this[_this.internalKeyExpr] !== null){
				return data[_this[_this.internalKeyExpr]];
			}
			var key;
			if(Array.isArray(_this.options.keyExpr)){
				key = [];
				for(var i=0;i<_this.options.keyExpr.length;i++){
					key.push(data[_this.options.keyExpr[i]]);
				}
			}else{
				key = data[_this.options.keyExpr];
			}
			key = JSON.stringify(key);
			data[_this[_this.internalKeyExpr]] = key;
			return key;
		};
		
		EasiGrid.prototype._findRows = function(dataSource){
			var _this = this;
			var findRows = [];
			var findMap = _this.options.filterMap;
			var findKeys = Object.keys(findMap);
			var doFind = false;
			for(var i=0;i<findKeys.length;i++){
				if(findMap[findKeys[i]].searchText){
					doFind = true;
					break;
				}
			}
			if(!doFind){
				findRows = $.extend(true, [], dataSource);
				_this.options._currentRows = findRows;
				_this._sortingRows();
				_this._calcCurrentPage();
				return;
			}
			for(var i=0;i<dataSource.length;i++){
				var isMatched = true;
				var data = Object.assign({}, dataSource[i]);
				for(var j=0;j<findKeys.length;j++){
					var key = findKeys[j];
					var findText = findMap[key].searchText;
					var calcValue = findMap[key].calcValue;
					var orgText = data[key];
					if(calcValue){
						orgText = calcValue({component:_this, value:orgText, data:data, rowIndex:i});
					}
					if(findText && (orgText === "" || orgText === null || orgText === undefined || orgText.toString().toLowerCase().indexOf(findText.toLowerCase()) === -1)){
						isMatched = false;
						break;
					}
				}
				
				if(isMatched){
					findRows.push(data);
				}
			}
			_this.options._currentRows = findRows;
			_this._sortingRows();
			_this._calcCurrentPage();
		};
		
		EasiGrid.prototype._calcCurrentPage = function(){
			var _this = this;
			if(!_this.options.paging){
				_this.options.page = 1;
				return;
			}
			var pageSize = _this.options.pageSize;
			var currentPage = _this.options.page;
			var totalPageCnt = Math.ceil(_this.options._currentRows.length/pageSize);
			if(currentPage > totalPageCnt){
				_this.options.page = totalPageCnt;
				_this.options.page = _this.options.page > 0 ? _this.options.page : 1;
			}
		};
		
		EasiGrid.prototype._createHeader = function(){
			var _this = this;
			var $thead = $("<thead></thead>");
			var $headerRow = $("<tr>");
			var $filterRow = $("<tr>");
			$thead.append($headerRow);
			$thead.append($filterRow);
			var index = 0;
			for(var i=0;i<this.options.columns.length;i++){
				var column = this.options.columns[i];
				if(column.visible === false){
					continue;
				}
				var $th = $("<th class='easi-grid-header-row'>");
				var $thInner = $("<div class='easi-grid-header-row-inner'>");
				if(_this.options.selection == "multiple" && index == 0){
					var $thCheckboxWrap = $("<div class='easi-grid-header-row-checkbox-wrap'>");
					var $checkAll = $("<input type='checkbox' class='easi-grid-all-checkbox'>");
					_this._$allCheckbox = $checkAll;
					$checkAll.on("change", function(e){
						var dataSource = _this.options._currentRows;
						var start = 0;
						var end = dataSource.length;
						if(_this.options.paging){
							start = (_this.options.page-1) * _this.options.pageSize;
							end = start+_this.options.pageSize;
							if(end > dataSource.length){
								end = dataSource.length;
							}
						}
						if($(this).is(":checked")){
							for(var j=start;j<end;j++){
								_this.options.selectedRowSets.set(_this._getKey(dataSource[j]), dataSource[j]);
							}
							_this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table > tbody > tr").not(".easi-grid-empty-row").addClass("selected");
							_this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table .easi-grid-checkbox").prop("checked", true);
						}else{
							for(var j=start;j<end;j++){
								_this.options.selectedRowSets.delete(_this._getKey(dataSource[j]));
							}
							_this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table > tbody > tr").removeClass("selected");
							_this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table .easi-grid-checkbox").prop("checked", false);
						}
					});
					$thCheckboxWrap.append($checkAll);
					$thInner.append($thCheckboxWrap);
					index++;
				}
				var $thContent = $("<div class='easi-grid-header-row-content'>");
				if(column.dataField){
					if(column.allowSorting === false || !_this.options.allowSorting){
						var findSortingMap = _this.options.sortingMap.find(function(obj){
							return obj.dataField == column.dataField;
						});
						if(findSortingMap){
							$th.addClass(findSortingMap.sortOrder);
						}
					}else{
						$th.addClass("allow-sorting");
						(function(column, $th){
							$th.on("click", function(e){
								if($(e.target).hasClass("easi-grid-all-checkbox")){
									return;
								}
								var isShift = _this.isShift;
								var isCtrl = _this.isCtrl;
								var findIndex;
								var findSortingMap = _this.options.sortingMap.find(function(obj, index){
									var isDone = obj.dataField == column.dataField;
									if(isDone){
										findIndex = index;
										return isDone;
									}
								});
								if(isCtrl || isShift){
									if(findSortingMap){
										$th.removeClass("asc desc");
										if(findSortingMap.sortOrder == "desc"){
											_this.options.sortingMap.splice(findIndex, 1);
										}else{
											$th.addClass(findSortingMap.sortOrder == "asc" ? "desc" : "asc");
											findSortingMap.sortOrder = findSortingMap.sortOrder == "asc" ? "desc" : "asc";
										}
									}else{
										$th.addClass("asc");
										_this.options.sortingMap.push({dataField:column.dataField, sortIndex:_this.options.sortingMap[_this.options.sortingMap.length-1] ? _this.options.sortingMap[_this.options.sortingMap.length-1].sortIndex+1 : 0, sortOrder:"asc", calcValue:column.customizeText});
									}
								}else{
									_this.options.sortingMap = [];
									$th.removeClass("asc desc");
									if(findSortingMap){
										if(findSortingMap.sortOrder != "desc"){
											$th.addClass(findSortingMap.sortOrder == "asc" ? "desc" : "asc");
											_this.options.sortingMap.push({dataField:column.dataField, sortIndex:1, sortOrder:findSortingMap.sortOrder == "asc" ? "desc" : "asc", calcValue:column.customizeText})
										}
									}else{
										$th.addClass("asc");
										_this.options.sortingMap.push({dataField:column.dataField, sortIndex:1, sortOrder:"asc", calcValue:column.customizeText})
									}
								}
								_this.refresh();
							});
							$th.on("mousedown", function(e){
								if(e.originalEvent.detail > 1){
									e.preventDefault();
								}
							});
						})(column, $th);
					}
					var findSortingMap = _this.options.sortingMap.find(function(obj){
						return obj.dataField == column.dataField;
					});
					if(findSortingMap){
						$th.addClass(findSortingMap.sortOrder);
					}
					$thContent.text(column.caption);
				}else{
					$thContent.text(column.caption);
				}
				$thInner.append($thContent);
				$th.append($thInner);
				//$th.addClass(column.cssClass);
				$th.css("width", column.width);
				$th.css("min-width", column.minWidth);
				$headerRow.append($th);
			}
			
			if(this.options.allowUpdate){
				var $th = $("<th>");
				$th.text("Update");
				$th.css("width", 80);
				$th.css("min-width", 80);
				$th.css("max-width", 80);
				$headerRow.append($th);
			}
			
			if(this.options.allowDelete){
				var $th = $("<th>");
				$th.text("Delete");
				$th.css("width", 80);
				$th.css("max-width", 80);
				$headerRow.append($th);
			}
			
			this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table").append($thead);
			
			if(!this.options.showFilterRow){
				return;
			}
			for(var i=0;i<this.options.columns.length;i++){
				var column = this.options.columns[i];
				if(column.visible === false){
					continue;
				}
				var $th = $("<th class='easi-grid-filter-row'>");
				if(column.dataField && column.allowFiltering !== false){
					var $searchWrap = $("<div class='easi-grid-search-wrapper'>");
					var $searchInput = $("<input type='text' class='search-text-input' value='"+this.options.filterMap[column.dataField].searchText+"'>");
					var $searchBtn = $("<div class='search-button'><i class='fas fa-search'></i></div>");
					$searchWrap.append($searchInput);
					$searchWrap.append($searchBtn);
					$th.append($searchWrap);
				}
				//$th.addClass(column.cssClass);
				$filterRow.append($th);
				
				(function(column){
					var fnSearch = function(value){
						_this.options.filterMap[column.dataField].searchText = value;
						_this._findRows(_this.options.dataSource);
						_this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table > tbody").empty();
						_this._createDataRows();
						
						var columns = _this.options.columns;
						var isSearchResult = false;
						for(var i=0;i<columns.length;i++){
							if(columns[i].allowFiltering === false){
								continue;
							}
							if(_this.options.filterMap[columns[i].dataField].searchText){
								isSearchResult = true;
								break;
							}
						}
					};
					
					if(column.allowFiltering === false){
						return;
					}
					if(navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("Trident") > -1){
						$searchInput.on("keyup", function(e){
							if(e.keyCode == 13){
								fnSearch(e.target.value);
							}
						});
					}
					$searchInput.on("change", function(e){
						fnSearch(e.target.value);
					});
				})(column);
			}
			
			if(this.options.allowUpdate){
				var $th = $("<th class='easi-grid-filter-row'>");
				$filterRow.append($th);
			}
			
			if(this.options.allowDelete){
				var $th = $("<th class='easi-grid-filter-row'>");
				$filterRow.append($th);
			}
		};
		
		EasiGrid.prototype.getSelectedRowsData = function(){
			var selectedRowsData = [];
			this.options.selectedRowSets.forEach(function(value, key){
				selectedRowsData.push(value);
			});
			return selectedRowsData;
		};
		
		EasiGrid.prototype.getSelectedRowKeys = function(){
			var _this = this;
			var selectedRowKeys = [];
			this.options.selectedRowSets.forEach(function(value, key){
				var parsedKey = JSON.parse(key);
				var obj = {};
				if(Array.isArray(_this.options.keyExpr)){
					for(var i=0;i<_this.options.keyExpr.length;i++){
						obj[_this.options.keyExpr[i]] = parsedKey[i];
					}
				}else{
					obj[_this.options.keyExpr] = parsedKey;
				}
				selectedRowKeys.push(obj);
			});
			return selectedRowKeys;
		};
		
		EasiGrid.prototype.clearSelection = function(){
			var isChanged = this.options.selectedRowSets.size > 0;
			var $table = this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table");
			this.options.selectedRowSets.clear();
			$table.find("> tbody > tr").removeClass("selected");
			if(this.options.selection == "multiple"){
				$table.find("> tbody > tr .easi-grid-checkbox").prop("checked", false);
				$table.find("> thead > tr .easi-grid-all-checkbox").prop("checked", false);
			}
			if(this.options.onSelectionChanged && isChanged){
				this.options.onSelectionChanged({
					component:this,
					selectedRowKeys:this.getSelectedRowKeys(),
					selectedRowsData:this.getSelectedRowsData()
				});
			}
		};
		
		EasiGrid.prototype.selectAll = function(){
			var _this = this;
			var isChanged = _this.options.selectedRowSets.size == 0;
			var $table = this._$element.find("> .easi-grid-table-wrapper > .easi-grid-table");
			this.options.selectedRowSets.clear();
			this.options.dataSource.forEach(function(obj){
				_this.options.selectedRowSets.set(_this._getKey(obj), obj);
			});
			$table.find("> tbody > tr").not(".easi-grid-empty-row").addClass("selected");
			if(this.options.selection == "multiple"){
				$table.find(".easi-grid-checkbox").prop("checked", true);
			}
			if(_this.options.onSelectionChanged && isChanged){
				_this.options.onSelectionChanged({
					component:_this,
					selectedRowKeys:_this.getSelectedRowKeys(),
					selectedRowsData:_this.getSelectedRowsData()
				});
			}
		};
		
		EasiGrid.prototype._createDataRows = function(){
			var _this = this;
			var dataSource = _this.options._currentRows;
			_this._$element.find(".easi-grid-table > tbody").remove();
			var createRowElement = function(param){
				var dataSource = param.dataSource;
				var $tbody = param.$tbody;
				var start = 0;
				var end = dataSource.length;
				if(_this.options.paging){
					start = (_this.options.page-1) * _this.options.pageSize;
					end = start+_this.options.pageSize;
					if(end > dataSource.length){
						end = dataSource.length;
					}
				}
				var isAllChecked = true;
				for(var i=start;i<end;i++){
					var data = dataSource[i];
					var $tr = $("<tr>");
					if(_this.options.selection != "none"){
						(function($tr, data){
							if(_this.options.selection == "single"){
								$tr.on("click", function(){
									if(!_this.options.selectedRowSets.has(_this._getKey(data))){
										_this.options.selectedRowSets.clear();
										_this.options.selectedRowSets.set(_this._getKey(data), data);
										$tbody.find(" > tr").removeClass("selected");
										$tr.addClass("selected");
										if(_this.options.onSelectionChanged){
											_this.options.onSelectionChanged({
												component:_this,
												selectedRowKeys:_this.getSelectedRowKeys(),
												selectedRowsData:_this.getSelectedRowsData()
											});
										}
									}else if(_this.isCtrl || _this.isShift){
										_this.options.selectedRowSets.clear();
										$tbody.find(" > tr").removeClass("selected");
										if(_this.options.onSelectionChanged){
											_this.options.onSelectionChanged({
												component:_this,
												selectedRowKeys:_this.getSelectedRowKeys(),
												selectedRowsData:_this.getSelectedRowsData()
											});
										}
									}
								});
							}else if(_this.options.selection == "multiple"){
								$tr.on("click", function(e){
									if(!$(e.target).hasClass("easi-grid-checkbox") && !_this.isCtrl && !_this.isShift){
										return;
									}
									e.stopPropagation();
									var $checkbox = $(e.target).hasClass("easi-grid-checkbox") ? $(e.target) : $(this).find(".easi-grid-checkbox");
									if(_this.options.selectedRowSets.has(_this._getKey(data))){
										$checkbox.prop("checked", false);
										_this.options.selectedRowSets.delete(_this._getKey(data));
										$tr.removeClass("selected");
										_this._$allCheckbox.prop("checked", false);
										if(_this.options.onSelectionChanged){
											_this.options.onSelectionChanged({
												component:_this,
												selectedRowKeys:_this.getSelectedRowKeys(),
												selectedRowsData:_this.getSelectedRowsData()
											});
										}
									}else{
										$checkbox.prop("checked", true);
										_this.options.selectedRowSets.set(_this._getKey(data), data);
										$tr.addClass("selected");
										var isAllChecked = true;
										for(var j=start;j<end;j++){
											if(!_this.options.selectedRowSets.has(_this._getKey(dataSource[j]))){
												isAllChecked = false;
											}
										}
										if(isAllChecked){
											_this._$allCheckbox.prop("checked", true);
										}
										if(_this.options.onSelectionChanged){
											_this.options.onSelectionChanged({
												component:_this,
												selectedRowKeys:_this.getSelectedRowKeys(),
												selectedRowsData:_this.getSelectedRowsData()
											});
										}
									}
								});
							}
						})($tr, data);
					}
					
					if(_this.options.onRowDblClick){
						(function(data){
							var lastClickTime = 0;
							$tr.on("click", function(e){
								if($(e.target).hasClass("easi-grid-checkbox") || _this.isCtrl || _this.isShift){
									return;
								}
								var now = new Date();
								if(now - lastClickTime > 300){
									lastClickTime = now;
								}else{
									lastClickTime = 0;
									_this.options.onRowDblClick({
										component:_this,
										data:data
									});
								}
							});
							
							$tr.on("mousedown", function(e){
								if(e.originalEvent.detail > 1){
									e.preventDefault();
								}
							});
						})(data);
					}
					$tbody.append($tr);
					
					var index = 0;
					for(var j=0;j<_this.options.columns.length;j++){
						var column = _this.options.columns[j];
						if(column.visible === false){
							continue;
						}
						var text = data[column.dataField] == null ? undefined : data[column.dataField];
						if(column.customizeText){
							text = column.customizeText({
								component:_this,
								value:text,
								data:data,
								rowIndex:i
							});
						}
						var $td = $("<td>");
						if(index == 0){
							var $tdInner = $("<div class='easi-grid-td-inner'>");
							var $iconContainer = $("<div class='easi-grid-icon-container'>");
							var $checkbox = $("<div class='easi-grid-checkbox-wrap'><input type='checkbox' class='easi-grid-checkbox'></div>");
							var $content = $("<div class='easi-grid-content'>");
							if(column.cellTemplate){
								column.cellTemplate({
									component:_this,
									container:$content,
									column:column,
									value:text,
									data:data,
									rowIndex:i
								});
							}else{
								$content.html(text);
							}
							$content.addClass(column.cssClass);
							$content.css("text-align", column.align);
							
							$tdInner.append($iconContainer).append($content);
							$td.append($tdInner);
							
							if(_this.options.selection == "multiple"){
								$iconContainer.append($checkbox);
							}
						}else{
							if(column.cellTemplate){
								column.cellTemplate({
									component:_this,
									container:$td,
									column:column,
									value:text,
									data:data,
									rowIndex:i
								});
							}else{
								$td.html(text);
							}
							$td.addClass(column.cssClass);
							$td.css("text-align", column.align);
						}
						$tr.append($td);
						index++;
					}
					
					if(_this.options.allowUpdate){
						var $updateBtn = $("<button type='button'><i class='fas fa-pen'></i></button>");
						
						(function(data){
							$updateBtn.on("click", function(e){
								e.stopPropagation();
								if(_this.options.onRowUpdating){
									_this.options.onRowUpdating({
										component:_this,
										data:data
									});
								}
							})
						})(data);
						
						var $td = $("<td>");
						$td.append($updateBtn);
						$td.addClass("update-column");
						$tr.append($td);
					}
					
					if(_this.options.allowDelete){
						var $deleteBtn = $("<button type='button'><i class='fas fa-trash-alt'></i></button>");
						
						(function(data){
							$deleteBtn.on("click", function(e){
								e.stopPropagation();
								if(_this.options.onRowDeleting){
									_this.options.onRowDeleting({
										component:_this,
										data:data
									});
								}
							})
						})(data);
						
						var $td = $("<td>");
						$td.append($deleteBtn);
						$td.addClass("delete-column");
						$tr.append($td);
					}
					
					if(_this.options.selectedRowSets.has(_this._getKey(data))){
						$tr.addClass("selected");
						if(_this.options.selection == "multiple"){
							$tr.find(".easi-grid-checkbox").prop("checked", true);
						}
					}else{
						isAllChecked = false;
					}
					
					if(_this.options.onRowPrepared){
						_this.options.onRowPrepared({
							component:_this,
							data:data,
							rowElement:$tr
						});
					}
				}
				if(_this.options.selection == "multiple"){
					_this._$allCheckbox.prop("checked", isAllChecked);
				}
			};
			var $tbody = $("<tbody></tbody>");
			if(dataSource.length > 0){
				createRowElement({dataSource:dataSource, $tbody:$tbody});
			}else{
				var columnCnt = 0;
				for(var i=0;i<_this.options.columns.length;i++){
					if(_this.options.columns[i].visible !== false){
						columnCnt++;
					}
				}
				if(_this.options.allowUpdate){
					columnCnt++;
				}
				if(_this.options.allowDelete){
					columnCnt++;
				}
				var $tr = $("<tr class='easi-grid-empty-row'>");
				var $td = $("<td colspan='"+columnCnt+"'>No Data.</td>");
				$tr.append($td);
				$tbody.append($tr);
			}
			this._$element.find(".easi-grid-table").append($tbody);
			if(_this.options.paging){
				this._createPager();
			}
		};
		
		EasiGrid.prototype._createPager = function(){
			var _this = this;
			if(_this.options._$pager){
				_this.options._$pager.remove();
			}
			if(_this.options._$counter){
				_this.options._$counter.remove();
			}
			var dataSource = _this.options._currentRows;
			var pageBlockSize = _this.options.pageBlockSize;
			var pageSize = _this.options.pageSize;
			var page = _this.options.page;
			var pageBlock = Math.ceil(page/pageBlockSize);
			
			var totalCnt = dataSource.length;
			var totalPageCnt = Math.ceil(dataSource.length/pageSize);
			var totalPageBlockCnt = Math.ceil(totalPageCnt/pageBlockSize);
			
			var startPage = ((pageBlock-1) * pageBlockSize)+1;
			var endPage = (startPage + pageBlockSize)-1;
			endPage = endPage > totalPageCnt ? totalPageCnt : endPage;
			endPage = endPage > 0 ? endPage : 1;
			
			var $pager = $("<div class='easi-grid-pager'>");
			
			var $pageSizeSelectorWrapper = $("<div class='easi-grid-page-size-selector-wrapper'>");
			var $pageSizeSelector = $("<select class='easi-grid-page-size-selector'>");
			var isValidPageSize = _this.options.pageSelector.indexOf(_this.options.pageSize) > -1;
			for(var i=0;i<_this.options.pageSelector.length;i++){
				if(!isValidPageSize){
					if(_this.options.pageSize < _this.options.pageSelector[i]){
						$pageSizeSelector.append("<option value='"+_this.options.pageSize+"'>"+_this.options.pageSize+"</option>");
						isValidPageSize = true;
					}
				}
				$pageSizeSelector.append("<option value='"+_this.options.pageSelector[i]+"'>"+_this.options.pageSelector[i]+"</option>");
			}
			$pageSizeSelector.val(_this.options.pageSize);
			$pageSizeSelector.on("change", function(e){
				_this.options.pageSize = Number(this.value);
				_this._createDataRows();
			});
			$pageSizeSelectorWrapper.append($pageSizeSelector);
			$pager.append($pageSizeSelectorWrapper);
			
			var $pageNavigator = $("<div class='easi-grid-page-navigator'>");
			(function(){
				var $page = $("<div class='easi-grid-page-item'>");
				$page.text("<");
				$pageNavigator.append($page);
				if(pageBlock > 1){
					$page.on("click", function(){
						_this.options.page = ((pageBlock-2) * pageBlockSize) + 1;
						_this._createDataRows();
					});
				}else{
					$page.addClass("disabled");
				}
			})();
			for(var i=startPage;i<=endPage;i++){
				var $page = $("<div class='easi-grid-page-item'>");
				$page.text(i);
				if(i == page){
					$page.addClass("selected");
				}
				(function(i){
					$page.on("click", function(){
						if(_this.options.page == i){
							return;
						}
						_this.options.page = i;
						_this._createDataRows();
					});
				})(i);
				$pageNavigator.append($page);
			}
			(function(){
				var $page = $("<div class='easi-grid-page-item'>");
				$page.text(">");
				$pageNavigator.append($page);
				if(pageBlock < totalPageBlockCnt){
					$page.on("click", function(){
						_this.options.page = (pageBlock * pageBlockSize) + 1;
						_this._createDataRows();
					});
				}else{
					$page.addClass("disabled");
				}
			})();
			$pager.append($pageNavigator);
			_this.options._$pager = $pager;
			_this._$element.append($pager);
			
			var $counter = $("<div class='easi-grid-counter'><span class='easi-grid-counter-label'>Total : </span>" + totalCnt + "</div>");
			_this.options._$counter = $counter;
			_this._$element.append($counter);
		};
		
		EasiGrid.prototype.clearSorting = function(){
			var _this = this;
			_this.options.sortingMap = [];
			_this.refresh();
		}
		
		EasiGrid.prototype.clearFiltering = function(){
			var _this = this;
			var filterMap = _this.options.filterMap;
			var columns = _this.options.columns;
			for(var i=0;i<columns.length;i++){
				if(columns[i].allowFiltering === false){
					continue;
				}
				filterMap[columns[i].dataField].searchText = "";
			}
			_this._$element.find(".easi-grid-table > thead .search-text-input").val("");
			_this._findRows(_this.options.dataSource);
			this._createDataRows();
		};
		
		EasiGrid.prototype.refresh = function(){
			this.dispose();
			var $element = this._$element;
			var options = this.options;
			var easiGrid = new EasiGrid(options);
			$element.data("easiGrid", easiGrid);
			easiGrid._init($element);
		};
		
		EasiGrid.prototype.option = function(){
			var arg1 = arguments[0];
			var arg2 = arguments[1];
			if(arg1 && typeof arg2 != "undefined"){
				this.dispose();
				var $element = this._$element;
				var options = this.options;
				options[arg1] = arg2;
				var easiGrid = new EasiGrid(options);
				$element.data("easiGrid", easiGrid);
				easiGrid._init($element);
			}else if(!arg1 && typeof arg2 == "undefined"){
				return this.options;
			}else if(arg1.constructor.name === ({}).constructor.name){
				this.dispose();
				var $element = this._$element;
				var options = new Object();
				$.extend(options, this.options, arg1);
				var easiGrid = new EasiGrid(options);
				$element.data("easiGrid", easiGrid);
				easiGrid._init($element);
			}else{
				return this.options[arg1];
			}
		};
		
		EasiGrid.prototype.dispose = function(){
			$(this._$element).data("easiGrid", undefined);
			$(this._$element).empty();
		};
		
		if(params == "instance"){
			var data = $(this).data("easiGrid");
			if(!data){
				console.error("easiGrid 인스턴스가 존재하지 않습니다.");
				return;
			}
			return data;
		}
		
		$(this).each(function(){
			var $this = $(this);
			var easiGrid = $(this).data("easiGrid");
			
			if(easiGrid){
				var options = new Object();
				if(!params.dataSource){
					params.dataSource = [];
				}
				$.extend(options, easiGrid.options, params);
				easiGrid.dispose();
				var easiGrid = new EasiGrid(options);
				
				$(this).data("easiGrid", easiGrid);
				easiGrid._init($this);
			}else{
				var defaultOptions = {
					columns:[],
					dataSource:[],
					filterMap:new Object(),
					sortingMap:new Array(),
					selectedRowSets:new Map(),
					selection:"single", //single, multiple, none
					paging:true,
					pageBlockSize:5,
					pageSize:30,
					pageSelector:[20, 30, 40, 50, 100],
					page:1,
					pageBlock:1,
					allowSorting:true,
					allowUpdate:true,
					allowDelete:true,
					keyExpr:undefined,
					showFilterRow:true,
					onRowDbClick:undefined,
					onRowUpdating:undefined,
					onRowDeleting:undefined,
					onSelectionChanged:undefined
				};
				var options = new Object();
				$.extend(options, defaultOptions, params);
				options.columns.forEach(function(obj){
					if(obj.allowFiltering !== false){
						options.filterMap[obj.dataField] = {searchText:"", calcValue:obj.customizeText};
					}
					if(!isNaN(obj.sortIndex)){
						options.sortingMap.push({dataField:obj.dataField, sortIndex:obj.sortIndex, sortOrder:obj.sortOrder ? obj.sortOrder : "asc", calcValue:obj.customizeText});
					}
				});
				var easiGrid = new EasiGrid(options);
				
				$(this).data("easiGrid", easiGrid);
				easiGrid._init($this);
			}
		});
		return $(this);
	};
})($); 