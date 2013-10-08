# angular-placeholder

HTML5 placeholder polyfill for AngularJS.

This angular directive can be used to use HTML5 placeholder functionality
within in all browsers, including older version of IE. A simple working
example can be seen by opening `example/index.html` in your web browser.

## Usage

Include the `angular-placeholder.min.js` file within your project (don't
forget to add the `ngPlaceholder` DI to your app) and use the directive like:

    <input type="text" ng-placeholder placeholder="This is placeholder text" />

This will ensure the `ng-placeholder` text value works across all browsers,
using the HTML5 functionality where possible. You may also use the following
format:

    <input type="text" ng-placeholder="This is placeholder text" />

## License

This code is licensed under MIT and can be used as required.
