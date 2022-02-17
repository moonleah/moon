<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
			<div class="container-fluid">
			                  <!-- Page Heading -->
			 <h1 class="h3 mb-2 text-gray-800">STORE</h1>
			   <div class="card">
						<div class="card-header py-3">
						    <h6 class="m-0 font-weight-bold text-primary">상점 등록하기</h6>
						</div>
					 <div class="card-body">
				 	 <div class="es_padding_10">  
							<!-- 엑셀 업로드 form -->
							<a class="btn btn-info" id="formDown" type="button" value="FormDownload"/>엑셀형식다운</a>
							<input class="btn mr-1" id="importExcel" type="file" value="Excel Import"/>
				
						<div>
				
							<form action="/user/storeInsert" method="post" id="docForm">
							<div class="es_padding_10 table-responsive">  
								<table id="formTable" class="table">
									  <thead>
									    <tr>
									      <th scope="col">업종명</th>
									      <th scope="col">인허가번호</th>
									      <th scope="col">업소명</th>
									      <th scope="col">영업자</th>
									      <th scope="col">소재지(도로명)</th>
									      <th scope="col">소재지(지번)</th>
									      <th scope="col">영업장면적</th>
									      <th scope="col">우편번호(도로명)</th>
									    </tr>
									  </thead>
									  <tbody>
									  </tbody>
								</table>
							</div>
							<div class="form-row float-right">
								<input class="es_btn_save mr-1" id="importExcel" type="submit" value="등록"/>
							</div>
							</form>
				      </div>
				   </div>
				 </div>
				</div>
			</div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.3/xlsx.full.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
 <script> 
 const excelDownload = document.querySelector('#formDown');

	document.addEventListener('DOMContentLoaded', ()=>{
	    excelDownload.addEventListener('click', exportExcel);
	});

	function exportExcel(){ 
	  // step 1. workbook 생성
	  var wb = XLSX.utils.book_new();

	  // step 2. 시트 만들기 
	  var newWorksheet = excelHandler.getWorksheet();

	  // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
	  XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

	  // step 4. 엑셀 파일 만들기 
	  var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

	  // step 5. 엑셀 파일 내보내기 
	  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
	}

	var excelHandler = {
	    getExcelFileName : function(){
	        return 'docForm.xlsx';	//파일명
	    },
	    getSheetName : function(){
	        return 'Sheet';	//시트명
	    },
	    getExcelData : function(){
	        return document.getElementById('formTable'); 	//TABLE id
	    },
	    getWorksheet : function(){
	        return XLSX.utils.table_to_sheet(this.getExcelData());
	    }
	}

	function s2ab(s) { 
	  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	  var view = new Uint8Array(buf);  //create uint8array as viewer
	  for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	  return buf;    
	}
	
	
	
	var reader = new FileReader(); 
	var excelFileData = null; 
	var inputElement = document.getElementById('importExcel'); 
	inputElement.addEventListener('change', function() {
		console.log(event.target.files); 
		reader.readAsArrayBuffer(event.target.files[0]); 
	},false);
	reader.onload = function (e) { 
		var data = e.target.result; 
		var workbook = XLSX.read(data, { type: "array" }); 
		var sheetName = workbook.SheetNames; 
		var sheet = workbook.Sheets[sheetName]; 
		excelFileData = XLSX.utils.sheet_to_json(sheet); 
	
		console.log(excelFileData) ; 	
		
		
		
		
		for ( i=0; i < excelFileData.length; i++  ) {
			var obj = excelFileData[i]; 
			let storeTypeName = obj[Object.keys(obj)[0]];
			let pmsNum = obj[Object.keys(obj)[1]];
			let storeName = obj[Object.keys(obj)[2]];
			let ownerName =obj[Object.keys(obj)[3]];
			let storeAddressRoad =obj[Object.keys(obj)[4]];
			let storeAddress =obj[Object.keys(obj)[5]];
			let storeArea =obj[Object.keys(obj)[6]];
			let postalCode =obj[Object.keys(obj)[7]];
			
			let str = $("<tr/>").addClass('trTag').append(
					/* $("<th>").html($("<input/>").addClass('formCheck').attr({type:"checkbox"})), */
					$("<td>").html($("<input class='es_input' readonly/>").attr({type:"text", name:"storeList["+i+"].storeTypeName", value:storeTypeName})),
					$("<td>").html($("<input class='es_input' readonly/>").attr({type:"text", name:"storeList["+i+"].pmsNum", value:pmsNum})),
					$("<td>").html($("<input class='es_input' readonly/>").attr({type:"text", name:"storeList["+i+"].storeName", value:storeName})),
					$("<td>").html($("<input class='es_input' readonly/>").attr({type:"text", name:"storeList["+i+"].ownerName", value:ownerName})),
					$("<td>").html($("<input class='es_input' readonly/>").attr({type:"text", name:"storeList["+i+"].storeAddressRoad", value:storeAddressRoad})),
					$("<td>").html($("<input class='es_input' readonly/>").attr({type:"text", name:"storeList["+i+"].storeAddress", value:storeAddress})),
					$("<td>").html($("<input class='es_input' readonly/>").attr({type:"text", name:"storeList["+i+"].storeArea", value:storeArea})),
					$("<td>").html($("<input class='es_input' readonly/>").attr({type:"text", name:"storeList["+i+"].postalCode", value:postalCode})),
			);
			$("#formTable tbody").append(str);
		};
		
		
		
		
		
		
	};

</script>