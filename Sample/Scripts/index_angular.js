


var school = angular.module("school", []);
school
  .config(function ($httpProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });


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






school.service(
    "get_schools",
    function($http,$q)
    {
        return ({
         get_details:get_details,
         send_pledge:send_pledge,
         get_scroll: get_scroll,
         get_count: get_count,
         


        })
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

        function get_scroll() {

            var request = $http({
                method: "get",
                url: "/Home/get_scroll",
                params: {
                 action:"scroll"
                }
            });
            return (request.then(handleSuccess, handleError));

        }

        function send_pledge(school_code, type) {

            var request = $http({
                method: "post",
                url: "Home/send_pledge",
                params: {
                    action: "add"
                },
                data: {
                    school_code: school_code,
                    category:type
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


var detail_controller = function ($scope, get_schools, $rootScope, $log) {
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
    $scope.school_list = function (pageno) {
       
        $log.log(localStorage.getItem('state'));

    

        get_schools.get_details($scope.State, $scope.District, $scope.category,pageno).then(function (response) {
    
            $scope.school_detail = response.data;
        });
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

        foreach(school in $scope.school_detail)
        {
            if (school.SchoolCode == school_code) {

                localStorage.setItem('selected_school', school);
                return;
            }
        }

    }
    $scope.generate_pledge = function (school_code) {
        category = $scope.category;
        $scope.find_school(school_code);
        $window.location.href = '/Home/pledge';
    }
    
  

    init = function () {

        $scope.calculate_pages();
      
        }
        init();
    
       

    }



var pledge_controller = function ($scope, $window, $log, get_schools) {
    $scope.selected_school = localStorage.getItem('selected_school');
    $scope.category = localStorage.getItem('type');
    var init  =function(){
   
    }
$scope.pledge = function () {
    get_schools.send_pledge($scope.selected_school.SchoolCode,$scope.category,$scope.pledge_form).then(function (response) {

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