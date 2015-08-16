---
status: Work in Progress
---

We've used callbacks before. In the section on `Array.prototype` methods, we passed in an anonymous function to `forEach`, `map`, and others that were used on each element of the array. These anonymous functions were serving as _callback functions_ for each of these methods.

When we're talking about callbacks, we're usually talking about asynchrous operations — commonly AJAX. As we discussed earlier, you don't want to block the execution of JavaScript and lock up the entire browser while we're waiting on a response from a server that may take a long time to respond or may never respond at all.

In order to avoid this, we hand an anonymous function as a callback. We're basically saying to the JavaScript engine, "Hey, I totally understand that you can't sit around and wait for a response from the server and that you have to move on. Please take this function and call it when you here back from the server."
