# Adding and Removing Event Listeners

A common obstacle that many JavaScript developers struggle with is understanding the timing in which they bind event listeners to DOM nodes. When we add event listeners to DOM nodes, we're only adding them to the nodes that are currently on the page. We are _not_ adding listeners to nodes that may be added to the page in the future.

## Experiment

Visit `demos/events/03-adding-and-removing`. You should see three buttons labeled "Click me!" as well as a button for adding new buttons to the page.

1. Click each of the "Click me!" buttons and verify that each one fires an `alert` notifying you that the button has in fact been clicked.
2. Add an additional button using the "Add a new button below." button.
3. Click on your new button and observe the results.

What did you notice?

The event listeners are only bound to the buttons that were present when the page code was first loaded. The buttons we added later were not around when we added the listeners.

## Your Turn

Can you modify the function that adds new buttons so that it adds an event listener to the element before appending it to the page?
