<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html lang="en">

<head>
   	<tiles:insertAttribute name="webInclude" /> 
</head>


 
 <body>
    <div class="container-xxl bg-white p-0">
    <!-- Page Wrapper -->
	<tiles:insertAttribute name="webHeader" />
	<tiles:insertAttribute name="search" />  
 	<tiles:insertAttribute name="webcontents" />  
	<tiles:insertAttribute name="webFooter" />   

    </div>
	<!-- Back to Top -->
     <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
</body>

</html>