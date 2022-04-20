<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Start Up</title>

    <style type="text/css">

        input[type=file] {
            display: none;
        }

        .my_button {
            display: inline-block;
            width: 200px;
            text-align: center;
            padding: 10px;
            background-color: #006BCC;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }



        .imgs_wrap {

            border: 2px solid #A8A8A8;
            margin-top: 30px;
            margin-bottom: 30px;
            padding-top: 10px;
            padding-bottom: 10px;

        }
        .imgs_wrap img {
            max-width: 150px;
            margin-left: 10px;
            margin-right: 10px;
        }

    </style>

	<script src="${pageContext.request.contextPath}/static/vendor/jquery/jquery.min.js"></script>
    <script type="text/javascript">

        // 이미지 정보들을 담을 배열
        var sel_files = [];


        $(document).ready(function() {
            $("#input_imgs").on("change", handleImgFileSelect);
        }); 

        function fileUploadAction() {
            console.log("fileUploadAction");
            $("#input_imgs").trigger('click');
        }

        function handleImgFileSelect(e) {

            // 이미지 정보들을 초기화
            sel_files = [];
            $(".imgs_wrap").empty();

            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);

            var index = 0;
            filesArr.forEach(function(f) {
                if(!f.type.match("image.*")) {
                    alert("확장자는 이미지 확장자만 가능합니다.");
                    return;
                }

                sel_files.push(f);

                var reader = new FileReader();
                reader.onload = function(e) {
                    var html = "<a href=\"javascript:void(0);\" onclick=\"deleteImageAction("+index+")\" id=\"img_id_"+index+"\"><img src=\"" + e.target.result + "\" data-file='"+f.name+"' class='selProductFile' title='Click to remove'></a>";
                    $(".imgs_wrap").append(html);
                    index++;

                }
                reader.readAsDataURL(f);
                
            });
        }



        function deleteImageAction(index) {
            console.log("index : "+index);
            console.log("sel length : "+sel_files.length);

            sel_files.splice(index, 1);

            var img_id = "#img_id_"+index;
            $(img_id).remove(); 
        }

        function fileUploadAction() {
            console.log("fileUploadAction");
            $("#input_imgs").trigger('click');
        }

        function submitAction() {
            console.log("업로드 파일 갯수 : "+sel_files.length);
            var formData = new FormData();

            for(var i=0, len=sel_files.length; i<len; i++) {
                var name = "image_"+i;
                formData.append(name, sel_files[i]);
            }
            formData.append("image_count", sel_files.length);
            
            if(sel_files.length < 1) {
                alert("한개이상의 파일을 선택해주세요.");
                return;
            }           
			console.log(formData)
            
            $.ajax({
         	      type: "POST",
         	   	  enctype: "multipart/form-data",
         	      url: "/user/upRoomInfo",
             	  data : formData,
             	  contentType: false,
                  processData: false,
                  async: false,
                  crossDomain: true,
         	      success: function (data) {
         	    	if(JSON.parse(data)['result'] == "OK"){
         	    		alert("파일업로드 성공");
      			} else
      				alert("서버내 오류로 처리가 지연되고있습니다. 잠시 후 다시 시도해주세요");
         	      },
         	      error: function (xhr, status, error) {
         	    	alert("서버오류로 지연되고있습니다. 잠시 후 다시 시도해주시기 바랍니다.");
         	     return false;
         	      }
         	    });
         	    return false;
      	}


    </script>
</head>

<body>
	<form id="frm" name="frm" method="post"  action="/user/upRoomInfo" enctype="multipart/form-data">	
    <div>
    	<input type="hidden" name="storeId" value="${storeData.storeId}" />
        <label>store Name : </label><input type="text" name="storeName" value="${storeData.storeName}"  readonly/> <br>
   	 	<label>room Name : </label><input type="text" class="roomName" name="roomName"  /> <br>
    	<label>수용인원 : </label><input type="text" class="roomCapacity" name="roomCapacity" /> <br>
    	<label>사용여부 : </label>Y<input type="radio" class="useFlag" name="useFlag" value="Y"/>N<input type="radio" class="useFlag" name="useFlag" value="N"/> <br>
   <h2><b>이미지 미리보기</b></h2>
        <div class="input_wrap">
            <a href="javascript:" onclick="fileUploadAction();" class="my_button">파일 업로드</a>
            <input type="file" name="files" id="input_imgs" multiple/>
        </div>
    </div>

    <div>
        <div class="imgs_wrap">
            <img id="img" />
        </div>
    </div>

    <!-- <a href="javascript:" class="my_button" onclick="submitAction();">업로드</a> -->
    <input type="submit" id="submit" value="save" class="btn">
</form>
</body>
</html>

