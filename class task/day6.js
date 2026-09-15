// Step 1: Import events module
const EventEmitter = require("events");

// Step 2: Create a custom emitter (like a DOM element)
class Button extends EventEmitter {
    click() {
        console.log("Button clicked!");
        this.emit("click"); // emit custom event
    }
}

class InputBox extends EventEmitter {
    type(text) {
        console.log(`User typed: ${text}`);
        this.emit("input", text); // emit custom event with data
    }
}

// Step 3: Create instances
const btn = new Button();
const input = new InputBox();

// Step 4: Attach event listeners (like addEventListener in DOM)
btn.on("click", () => {
    console.log("Handling button click event...");
});

input.on("input", (value) => {
    console.log(`Handling input event, value = ${value}`);
});

// Step 5: Trigger events
btn.click();
input.type("Hello Node.js!");