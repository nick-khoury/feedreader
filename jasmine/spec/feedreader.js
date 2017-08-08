/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 * 
 * No test should be dependent on the results of another.
 * Callbacks should be used to ensure that feeds are loaded before they are tested.
 * Implement error handling for undefined variables and out-of-bound array access.
 * When complete - all of your tests should pass. 
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('have defined, non-empty URLs', function() {
            allFeeds.forEach(function(element) {
				expect(element.url).toBeDefined();
				expect(element.url).not.toBe('');
				expect(element.url).toMatch("https*:\/\/");
			});
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have defined, non-empty names', function() {
            allFeeds.forEach(function(element) {
				expect(element.name).toBeDefined();
				expect(element.name).not.toBe('');
				expect(typeof element.name).toBe("string");
			});
        });
    });

    /* a test suite named "The menu" */
    describe('The menu', function() {
        /* a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var body = document.getElementsByTagName("body")[0];
		var menu = document.getElementsByClassName("menu-icon-link")[0];
			
        it('is hidden by default', function() {
			expect(body.className).toContain("menu-hidden");
		});

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('changes visibility when icon clicked', function() {
			expect(body.className).toContain("menu-hidden");
			menu.click();
			expect(body.className).not.toContain("menu-hidden");
			menu.click();
			expect(body.className).toContain("menu-hidden");
		});
    });
    
    /* a test suite named "Initial Entries" */
    describe('Initial Entries', function() {
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
       it('has at least one element', function(done) {
			var feed = document.getElementsByClassName("feed")[0];
			var entry = document.getElementsByClassName("entry");
			expect(entry.length).toBeGreaterThan(0);
			done();
		});
    });
    
    /* a test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var old;
        beforeEach(function(done) {
			loadFeed(0, function() {
				old = document.getElementsByClassName("feed")[0].innerHTML;
				loadFeed(1, function() {
					done();
				});
			});
		});
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('content changes upon load', function(done) {
			var nex = document.getElementsByClassName("feed")[0].innerHTML;
			expect(old).not.toBe(nex);
			done();
		});
    });
}());
