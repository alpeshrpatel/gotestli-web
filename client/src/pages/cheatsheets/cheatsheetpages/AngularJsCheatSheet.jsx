import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const angularJsSections = [
  {
    heading: "What is AngularJS?",
    content: `AngularJS is a structural JavaScript framework for building dynamic web apps. Developed by Google, it extends HTML with additional attributes and binds data to HTML with expressions. It is ideal for building single-page applications (SPAs).`
  },
  {
    heading: "Core Concepts",
    content: `• MVC (Model-View-Controller) architecture
• Two-way data binding
• Directives to extend HTML functionality
• Dependency Injection (DI)
• Filters for formatting data
• Services and Factories for reusable logic
• Routing for SPAs`
  },
  {
    heading: "Setting Up AngularJS",
    code: `<!-- Include AngularJS from CDN -->
<script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js\"></script>

<!-- Create an AngularJS app -->
<div ng-app=\"myApp\" ng-controller=\"myCtrl\">
  <h1>{{ greeting }}</h1>
</div>

<script>
  angular.module('myApp', []).controller('myCtrl', function($scope) {
    $scope.greeting = 'Hello, AngularJS!';
  });
</script>`
  },
  {
    heading: "Directives",
    content: `• ng-model: Binds input fields to data
• ng-bind: Replaces the inner text of an HTML element
• ng-repeat: Iterates over collections
• ng-if / ng-show / ng-hide: Conditional rendering
• Custom directives: Create reusable HTML components`
  },
  {
    heading: "Expressions",
    content: `• AngularJS expressions are written inside {{ }}
• Can bind data, perform calculations, or call functions
• Example: {{ 5 + 5 }} → 10`
  },
  {
    heading: "Controllers",
    code: `angular.module('app', [])
.controller('MainCtrl', function($scope) {
  $scope.message = 'Welcome to AngularJS!';
});`
  },
  {
    heading: "Services & Factories",
    code: `// Defining a service
angular.module('app').service('DataService', function() {
  this.getData = function() {
    return ['Apple', 'Banana', 'Cherry'];
  };
});

// Using the service in a controller
angular.module('app')
.controller('DataCtrl', function($scope, DataService) {
  $scope.fruits = DataService.getData();
});`
  },
  {
    heading: "Routing",
    code: `<!-- Include ngRoute module -->
<script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.js\"></script>

<script>
  angular.module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutCtrl'
      });
  });
</script>`
  },
  {
    heading: "Filters",
    content: `• currency: {{ amount | currency }}
• date: {{ today | date:'MM/dd/yyyy' }}
• uppercase/lowercase: {{ name | uppercase }}
• filter: {{ items | filter:searchText }}
• orderBy: {{ items | orderBy:'name' }}`
  },
  {
    heading: "Form Handling",
    code: `<form ng-submit=\"submitForm()\">
  <input type=\"text\" ng-model=\"user.name\" required />
  <input type=\"email\" ng-model=\"user.email\" required />
  <button type=\"submit\">Submit</button>
</form>`
  },
  {
    heading: "Best Practices",
    content: `• Use modules to organize code
• Avoid polluting the global namespace
• Prefer controllers over $scope logic
• Use one-way data binding where possible
• Keep controllers thin and delegate logic to services
• Minimize the use of DOM-manipulating directives`
  },
  {
    heading: "Common Use Cases",
    content: `• CRUD apps
• Dashboards
• Admin panels
• Dynamic forms
• Real-time updates with websockets
• Data visualization with chart libraries`
  }
];

const AngularJsCheatSheet = () => {
  return (
    <CheatSheetLayout
    language='javascript'
      title="AngularJS Cheat Sheet"
      description="Detailed reference for AngularJS, the JavaScript framework for building dynamic SPAs."
      sections={angularJsSections}
    />
  );
};

export default AngularJsCheatSheet;
