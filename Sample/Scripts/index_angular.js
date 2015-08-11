

//Configuring For CORS
var school = angular.module("school", []);
school
  .config(function ($httpProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      delete $httpProvider.defaults.headers.post['Content-type'];
  });

//Service to share data bw controllers
school.factory('plsend', function ($rootScope) {
    var plsend = {};

    plsend.message = '';

    plsend.prepForBroadcast = function (msg) {
        this.message = msg;
        this.broadcastItem();
      //  alert(this.message);
    };

    plsend.broadcastItem = function () {
        $rootScope.$broadcast('handleBroadcast');
    };

    return plsend
});





//Service to Send AJAX CALLS to Web API 
school.service(
    "get_schools",
    function($http,$q)
    {
        return ({
         get_details:get_details,
         send_pledge:send_pledge,
         get_scroll: get_scroll,
         get_count: get_count,
         get_scroll_no: get_scroll_no
         


        })
        //Get Count of schools in Category and District 
        function get_count(state,district,type) {
            var request = $http({
                method: "get",
                url: "http://leapschool.azurewebsites.net/api/"+ type,
             
                params: {
                    state: state,
                    district: district,
                
                }
            });
            return (request.then(handleSuccess, handleError));
        }
        //Get Number of live feed scroll
        function get_scroll_no() {
            var request = $http({
                method: "get",
                url: "http://leapschool.azurewebsites.net/api/Pledge",

                params: {
                    scroll_count:"scroll_count"

                }
            });
            return (request.then(handleSuccess, handleError));
        }
        //Get School Details from API 
        function get_details(state, district, type,pageno) {
         

            var request = $http({
                method: "get",
                url: "http://leapschool.azurewebsites.net/api/"+ type,
             
                params: {
                 state: state,
                 district: district,
                pageno:pageno
                }
            });
            return (request.then(handleSuccess, handleError));
        }
        //Get Live feed 
        function get_scroll(count) {

            var request = $http({
                method: "get",
                url: "http://leapschool.azurewebsites.net/api/Pledge/Get_Scroll",
                params: {
                    
        
                }
            });
            return (request.then(handleSuccess, handleError));

        }
        //Sending Pledge to API
        function send_pledge(school_name,school_code, type,pledge_form,username) {

            var request = $http({
                method: "get",
                url: "http://leapschool.azurewebsites.net/api/Pledge",
              
                params: {
                    school_code: school_code,
                    school_name:school_name,
                    category: type,
                    org: pledge_form.organization_name,
                    pledge: pledge_form.pledge,
                    comment: pledge_form.comment,
                    user:username

                }
            });
            return (request.then(handleSuccess, handleError));

        }

        function handleError(response) {
    
            if (
                !angular.isObject(response.data) ||
                !response.data.message
                ) {
                return ($q.reject("An unknown error occurred."));
            }
    
            return ($q.reject(response.data.message));
        }

        function handleSuccess(response) {
           
            return (response);
        }

}

 );

//Controller for School Details Page 
var detail_controller = function ($scope, get_schools, $rootScope, $log, $window,$interval) {
    $scope.log = $log;
    $scope.school_detail = {};
    $scope.$log = $log;
    $scope.Math = window.Math;
    $scope.state_dictionary = { AP: 'Andhra Pradesh', Goa: 'Goa' };
    $scope.State = localStorage.getItem('state');
    $scope.District = localStorage.getItem('district');
    $scope.category = localStorage.getItem('type');
    $scope.current_page = 1;
    $scope.current_page_slider = [1, 2, 3, 4, 5];
    $scope.language_dictionary = { 4: "Hindi", 17: "Telugu", 18: "Urdu", 99: "Others", 19: "English" };
    $scope.library_dictionary = { 1: 'Has Library', 2: 'No Library in school' };
    $scope.no_of_pages = 0;
    $scope.scroll_count = 1;
    $scope.total_scroll = 1;
    $scope.current_scroll = {};
    $scope.school_list = function (pageno) {
       
        $log.log(localStorage.getItem('state'));

    

        get_schools.get_details($scope.State, $scope.District, $scope.category,pageno).then(function (response) {
    
            $scope.school_detail = response.data;
        });
    }
    $scope.update_feed = function () {

        get_schools.get_scroll($scope.current_scroll).then(function (response) {
           
         
            $scope.current_scroll = response.data;

            $scope.scroll_count = ($scope.scroll_count + 2)%($scope.total_scroll);
        })

    }

    $scope.get_total_scroll = function () {

        get_schools.get_scroll_no().then(function (response) {
            $scope.get_total_scroll = response.data.count;

        }).then(function () { $scope.update_feed($scope.scroll_count) });


    }
    $scope.set_page_count= function(page_count){
        $scope.no_of_pages = page_count;
 
        if ($scope.no_of_pages < 5) {
            $scope.current_page_slider = [];
            for (i = 1; i <= $scope.no_of_pages; i++) {
                $scope.current_page_slider[i] = i;
            }
        }
       
    }
    $scope.calculate_pages = function () {
       
        get_schools.get_count($scope.State, $scope.District,$scope.category).then(function (response) {
            $scope.row_count = response.data.count;
            $scope.no_of_pages = Math.ceil($scope.row_count / 10);
           

        }).then(function () { $scope.set_page_count($scope.no_of_pages); });
        $scope.school_list($scope.current_page);

    }
    $scope.update_page = function (pageno) {
        $scope.current_page = pageno;
        $scope.school_list($scope.current_page);
    }
    $scope.first_page = function () {
        $scope.current_page = 1;
        $scope.school_list($scope.current_page);
        $scope.current_page_slider = [1, 2, 3, 4, 5];

    }
    $scope.last_page = function () {
        $scope.current_page = $scope.no_of_pages;
        $scope.school_list($scope.current_page);
        $scope.current_page_slider = [$scope.current_page - 4, $scope.current_page - 3, $scope.current_page - 2, $scope.current_page - 1, $scope.current_page];

    }
    $scope.prev = function () {
      
        if ($scope.current_page_slider[0] > 1) {
            for (i = 0 ; i < 5; i++) {
                $scope.current_page_slider[i] = $scope.current_page_slider[i] - 5;
            }
          //  $log.log($scope.current_page_slider);
           // $scope.$apply();
        }
    }
    $scope.next = function () {
       
        if ($scope.current_page_slider[4] < $scope.no_of_pages) {
            for (i = 0 ; i < 5; i++) {
                $scope.current_page_slider[i] = $scope.current_page_slider[i] + 5;
            }
            //$log.log($scope.current_page_slider);
            //$scope.$apply();
        }
    }
    $scope.find_school = function (school_code) {

       

    }
    $scope.generate_pledge = function (school_code) {
        category = $scope.category;

        for (school_no in $scope.school_detail) {
  
            if ($scope.school_detail[school_no].SchoolCode == school_code) {

                localStorage.setItem('selected_school', JSON.stringify($scope.school_detail[school_no]));
              //  $log.log($scope.school_detail[school_no]);

            }
        }
  
           //   @Html.Action("ExternalLoginsList", new { ReturnUrl = ViewBag.ReturnUrl })
     //   $window.location.href = '/Account/ExternalLoginsList';

    }
    
  

    init = function () {

        $scope.calculate_pages();
        $scope.get_total_scroll();
        $scope.update_feed();
        }
        init();
    
       

    }



var pledge_controller = function ($scope, $window, $log, get_schools) {
    $scope.log = $log;
    $scope.school = JSON.parse(localStorage.getItem('selected_school'));
    $scope.state_dictionary = { AP: 'Andhra Pradesh', Goa: 'Goa' };
    $scope.language_dictionary = { 4: "Hindi", 17: "Telugu", 18: "Urdu", 99: "Others", 19: "English" };
    $scope.library_dictionary = { 1: 'Has Library', 2: 'No Library in school' };
    $scope.category = localStorage.getItem('type');
    $scope.Math = window.Math;
    $scope.username = "";
    $scope.updateuser = function (username) {
        $scope.username = username;
        $log.log($scope.username);
      }
    $scope.pledge = function () {
      
        get_schools.send_pledge($scope.school.SchoolName,$scope.school.SchoolCode, $scope.category, $scope.pledge_form, $scope.username).then(function (response) {
            $log.log(response.data);
            if (response.data != null) {
                 $window.location.href = '/';
            }
    });

}


}

    var state_controller = function ($rootScope, $scope, $window, $log, plsend) {



        /*  $scope.$on('handleBroadcast', function () {
        
              $scope.message = plsend.message;
              alert($scope.message);
        
              $scope.$apply();
         });
         $log.log($scope.type); */

        $scope.save = function (state, district) {
        
             $scope.state = state;
            $scope.$log = $log;
            $scope.district = district;





            localStorage.setItem('state', $scope.state);
            localStorage.setItem('district', $scope.district)


            $window.location.href = '/Home/schoolDetail';

        }

    };
    var MainController = function ($scope, $rootScope, $http, $interval, $log, $window, plsend) {
        $scope.log = $log;

        $scope.selected_type = null;
        $scope.redirect = function (id) {



            $scope.selected_type = id;

            localStorage.setItem('type', id);


            $window.location.href = 'Home/State';

        }
        //  $scope.$on('handleBroadcast', function () {

        //$scope.message = plsend.message;
        //  alert($scope.message);
        // });


        $scope.flipped = false;

        $scope.flip = function () {
            $scope.flipped = !$scope.flipped;
        };
        $interval(function () {
            $scope.flipped = !$scope.flipped;



        }, 5000);



    };

    /*school.directive("flipper", function () {
        return {
            restrict: "E",
            template: "<div class='flipper' ng-transclude ng-class='{ flipped: flipped }'></div>",
            transclude: true,
            scope: {
                flipped: "="
            }
        };
    });
    
    school.directive("front", function () {
        return {
            restrict: "E",
            template: "<div class='front tile' ng-transclude></div>",
            transclude: true
        };
    });
    
    school.directive("back", function () {
        return {
            restrict: "E",
            template: "<div class='back tile' ng-transclude></div>",
            transclude: true
        }
    });
    
    school.directive('dynamic', function () {
        return {
            transclude: true,
            template: "<div>the template</div><div ng-transclude></div>"
        };
    
    }); */

school.controller("MainController", MainController);
school.controller("state_controller", state_controller);
school.controller("detail_controller", detail_controller);