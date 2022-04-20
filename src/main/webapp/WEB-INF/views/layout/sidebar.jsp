        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar"  onclick="myFunction(event)">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div class="sidebar-brand-icon rotate-n-15">
               <i class="fas fa-home"></i>
                </div>
                <div class="sidebar-brand-text mx-3">GD<sup>place</sup></div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Information
            </div>


            <!-- Nav Item - Tables -->
            <li class="nav-item" >
                <a class="nav-link" href="/user/roomList">
                    <i class="fas fa-fw fa-table"></i>
                    <span>List</span></a>
            </li>
            <li class="nav-item ">
                <a class="nav-link" href="/user/roominsert">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Store Insert</span></a>
            </li>
            <li class="nav-item ">
                <a class="nav-link" href="/user/roominsert">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Room Info Insert</span></a>
            </li>
            
             <!-- Divider -->
            <!-- Heading -->

        </ul>
        <!-- End of Sidebar -->
        
        <script>
        $(document).ready(function() {
        	$(".nav-item").click(function () {
        	    $(".nav-item").removeClass("active");
        	    $(this).addClass("active");   
        	});
        	}); 
        </script>
