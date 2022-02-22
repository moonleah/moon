<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>LIST</title>
   
</head>

<body id="page-top">
<tiles:insertAttribute name="include" />  
    <!-- Page Wrapper -->
    <div id="wrapper">
		 <tiles:insertAttribute name="sidebar" />  
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
	  		 <tiles:insertAttribute name="nav" />  
            <!-- Main Content -->
           <tiles:insertAttribute name="contents" />  
            
	 	<tiles:insertAttribute name="footer" />   
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
    <!-- Logout Modal-->
	<tiles:insertAttribute name="logout" />
   
</body>

</html>