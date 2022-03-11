<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">LIST</h1>
                    <!-- DataTales Example -->
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">상세정보 검색하기</h6>
                        </div>
                        <div class="card-body">
                        
                         <select id="sido">
						      <option value="">선택</option>
						  </select>
						  <select id="sigugun">
						      <option value="">선택</option>
						  </select>
						  <select id="dong">
						      <option value="">선택</option>
						  </select>
						<select name="searchCapacity" id="searchCapacity">
							<option value="0">전체</option>
							<option value="4">4명</option>
							<option value="5">5명</option>
							<option value="6">6명</option>
							<option value="7">7명</option>
							<option value="8">8명</option>
							<option value="9">9명</option>
							<option value="10">10명</option>
							<option value="15">15명</option>
							<option value="20">20명</option>
							<option value="20">30명</option>
						</select>
						<input type="text" value="" name="store" id="searchStoreName"  placeholder="상호명" />
						<!-- <input name="number" id="number" /> -->
                        <button onclick = "getStoreList()">검색</button>
                         <div class="es_padding_10">  
                            <div class="storeList" id="storeList"></div>
                        </div>
                        
                        </div>
                    </div>
                </div>
        
<script type="application/javascript" src="https://zelkun.tistory.com/attachment/cfile8.uf@99BB7A3D5D45C065343307.js"></script>            
<script>

jQuery(document).ready(function(){
	  //sido option 추가
	  jQuery.each(hangjungdong.sido, function(idx, code){
	    //append를 이용하여 option 하위에 붙여넣음
	    jQuery('#sido').append(fn_option(code.sido, code.codeNm));
	  });
	 
	  //sido 변경시 시군구 option 추가
	  jQuery('#sido').change(function(){
	    jQuery('#sigugun').show();
	    jQuery('#sigugun').empty();
	    jQuery('#sigugun').append(fn_option('','선택')); //
	    jQuery.each(hangjungdong.sigugun, function(idx, code){
	      if(jQuery('#sido > option:selected').val() == code.sido)
	        jQuery('#sigugun').append(fn_option(code.sigugun, code.codeNm));
	    });
	 
	    //세종특별자치시 예외처리
	    //옵션값을 읽어 비교
	    if(jQuery('#sido option:selected').val() == '36'){
	      jQuery('#sigugun').hide();
	      //index를 이용해서 selected 속성(attr)추가
	      //기본 선택 옵션이 최상위로 index 0을 가짐
	      jQuery('#sigugun option:eq(1)').attr('selected', 'selected');
	      //trigger를 이용해 change 실행
	      jQuery('#sigugun').trigger('change');
	    }
	  });
	 
	  //시군구 변경시 행정동 옵션추가
	  jQuery('#sigugun').change(function(){
	    //option 제거
	    jQuery('#dong').empty();
	    jQuery.each(hangjungdong.dong, function(idx, code){
	      if(jQuery('#sido > option:selected').val() == code.sido && jQuery('#sigugun > option:selected').val() == code.sigugun)
	        jQuery('#dong').append(fn_option(code.dong, code.codeNm));
	    });
	    //option의 맨앞에 추가
	    jQuery('#dong').prepend(fn_option('','선택'));
	    //option중 선택을 기본으로 선택
	    jQuery('#dong option:eq("")').attr('selected', 'selected');
	 
	  });
	 
	  jQuery('#dong').change(function(){
	    var sido = jQuery('#sido option:selected').val();
	    var sigugun = jQuery('#sigugun option:selected').val();
	    var dong = jQuery('#dong option:selected').val();
	    var dongCode = sido + sigugun + dong + '00';    
	  });
	});
	 
	function fn_option(code, name){
	  return '<option value="' + code +'">' + name +'</option>';
	}


$(document).ready(function() {
	 var storeGrid;
	   
	   $(function(){
			initStoreGrid();
			getStoreList();
		
		});
	});

function initStoreGrid(){
	storeGrid = $("#storeList").easiGrid({
   		columns:[
   			{caption:"NO", align:"left", width:"60px",  align:"center", allowFiltering:false,  allowSorting:false,   visible: true,
   				customizeText:function(e){   
   						return e.rowIndex+1;   
   				}   
   			}, 
   			{caption:"no", 	dataField:"storeId", 		align:"center", 		  	 width:"300px",      visible: false },
   			{caption:"상호명", 	dataField:"storeName", 		align:"center", 		  	 width:"300px",      visible: true },
   			{caption:"주소", 	dataField:"storeAddress", 		align:"center", 		  	 width:"300px",      visible: true },
   			{caption:"주소(도로명)", 	dataField:"storeAddressRoad", 		align:"center", 		  	 width:"300px",      visible: true },
   			{caption:"룸 개수", dataField:"roomId", 	align:"center", 		 width:"100px",   	 	 visible: true },
   			/* {caption:"",        	dataField:"mat_use", 		align:"center", 		 width:"100px", 		 visible: true,
   				 customizeText:function(e){
   				    return e.value == 'G001'  ? '사용 중' : '사용 중지';
   			     } 	    			
   			}, */
   			{caption:"방이름", 	dataField:"roomName", 	align:"center", 		 width:"100px", 		 visible: true },
   			{caption:"수용인원", 	dataField:"roomCapacity", 	align:"center", 		 width:"100px", 		 visible: true },
   			{caption:"방상태", 	dataField:"roomStatus", 	align:"center", 		 width:"100px", 		 visible: true },
   			{caption:"사용여부", 	dataField:"useflag", 	align:"center", 		 width:"100px", 		 visible: true },
   			
   		],
			keyExpr:"storeId",
			selection:"single",
			pageSize: 40,
			allowUpdate: true,
			allowDelete: false,
			showFilterRow: true,
			onRowDblClick:function(e){
				openStoreInsert(e.data.storeId);
			},
			onRowUpdating:function(e){
				openStoreUpdate(e.data.storeId);
			},
			onRowDeleting:function(e){
				storeDelete(e.data.storeId);
			},
			/* onSelectionChanged:function(e){
			} */
		}).easiGrid("instance");
	}
	
	function openStoreInsert(id){
		   var _width = '650';
		   var _height = '800';
		   var _left = Math.ceil(( window.screen.width - _width )/2);
		   var _top = Math.ceil(( window.screen.height - _height )/2); 
		   var win = window.open("roomInsertForm?storeId="+id, "PopupWin",  
		    		'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top) 
		
	};
	
	function openStoreUpdate(id){};
	
	function storeDelete(id){};
	
	function getStoreList(){
		
		/* var sido = $("#sido option:selected").val();
		var gugun = $("#sigugun option:selected").val();
		var dong = $("#dong option:selected").val(); */
		
		
		var sidoIdx = hangjungdong.sido.findIndex(i=>i.sido==$("#sido").val());
		var sigugunIdx =hangjungdong.sigugun.findIndex(i=>i.sigugun==$("#sigugun").val()&&i.sido==$("#sido").val());
		var dongIdx =hangjungdong.dong.findIndex(i=>i.dong==$("#dong").val()&&i.sigugun==$("#sigugun").val()&&i.sido==$("#sido").val());
		
		var sido; 
		var gungu;
		var dong;
		var searchStoreAddress;
		
		if(sidoIdx != -1 ){
			sido = hangjungdong.sido[sidoIdx].codeNm;//시
		}
		if(sigugunIdx != -1 ){
			gungu = hangjungdong.sigugun[sigugunIdx].codeNm;//시군구
		}
		if(dongIdx != -1 ){
			 dong = hangjungdong.dong[dongIdx].codeNm;//동
		}
		console.log(sido +'/' + gungu +'/' + dong)
		
		if(sido != undefined ){
			searchStoreAddress  = sido//시
		}
		if(gungu != undefined ){
			searchStoreAddress = sido +' '+gungu 
		}
		if(dong != undefined ){
			searchStoreAddress = sido +' '+gungu +' '+dong 
		}
		
		
		var searchCapacity= $("#searchCapacity option:selected").val(); 
		var searchStoreName= $("#searchStoreName").val();
	

		var param = {
				searchStoreName:searchStoreName,
				searchStoreAddress:searchStoreAddress ,
				searchCapacity:searchCapacity ,
		};
		
		$.ajax({
			type:"post",
			url:"/user/getStoreList",
			data:param,
			success:function(list){
				console.log(list)
				storeGrid.option("dataSource", list);
			}
		});
	} 
	
	
	


	 

</script>