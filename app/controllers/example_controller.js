// PRIVATE VARIABLES

const baseUrl = 'http://localhost:3000'

// Controller declaration
app.controller('example-controller', ($scope, $http) => {
    // PUBLIC VARIABLES

    $scope.greeting = ''
    $scope.name = ''
    $scope.item = ''
    $scope.items = []

    // PUBLIC FUNCTIONS

    // Simple text fetch
    $scope.getGreeting = () => {
        $http.get(`${baseUrl}/`).then(({ data: greeting }) => $scope.greeting = greeting)
    }

    // Random message
    $scope.getRandom = () => {
        $http.get(`${baseUrl}/random`).then(({ data: random }) => notyf.success(random))
    }

    // Message with name from input
    $scope.getMessage = () => {
        if ($scope.name) $http.get(`${baseUrl}/message/${$scope.name}`).then(({ data: message }) => notyf.success(message))
        $scope.name = ''
    }

    // Item list with fetch and add methods
    $scope.getItems = () => {
        $http.get(`${baseUrl}/list`).then(({ data: items }) => $scope.items = items)
    }
    $scope.addItem = () => {
        if ($scope.item) $http.post(`${baseUrl}/add-item/`, { item: $scope.item }).then(({ data: { success } }) => {
            if (success) {
                notyf.success('Elemento añadido')
                $scope.getItems()
            }
        })
        $scope.item = ''
    }

    // INIT

    $scope.getGreeting()
    $scope.getItems()
})

