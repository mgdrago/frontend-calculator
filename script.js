// Wait until the page is fully ready so we can safely find the buttons and screen
document.addEventListener("DOMContentLoaded", () => {
    // This is the calculator screen where we show the current numbers
    const inputDisplay = document.getElementById("number-screen");
    // All the number and symbol buttons sit inside elements with the class "number-button"
    const numberButtons = document.querySelectorAll(".number-button");
    // The clear and equal buttons also have wrapping elements, so we grab those wrappers
    const clearButton = document.getElementById("clear");
    const equalButton = document.getElementById("equal");

    // We keep the things the user pressed inside this list
    let input = [];

    // Show the current input on the screen in the same order the user typed
    const updateDisplay = () => {
        inputDisplay.value = input.join("");
    };

    // When a number or symbol button is clicked we add its text to the input list
    numberButtons.forEach((buttonContainer) => {
        buttonContainer.addEventListener("click", (event) => {
            event.preventDefault(); // Stop the form from reloading the page
            const button = buttonContainer.querySelector("button"); // Find the real <button> inside the wrapper
            const value = button ? button.textContent.trim() : ""; // Read the text that is on the button
            if (!value) {
                return; // If the button has no text we do nothing
            }
            input.push(value); // Save the value so we can build the math problem
            updateDisplay(); // Update the screen so the user sees what they pressed
        });
    });

    // When the equal button is pressed we try to solve the math problem
    if (equalButton) {
        equalButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (input.length === 0) {
                return; // Nothing to solve if the user did not type anything
            }

            const expression = input.join(""); // Turn the list into one string like "8+2"

            try {
                const result = eval(expression); // Ask JavaScript to solve the string as math
                inputDisplay.value = result; // Show the answer on the screen
                input = [result.toString()]; // Keep the result so the user can continue from it
            } catch (error) {
                inputDisplay.value = "error"; // Tell the user something went wrong
                input = []; // Reset the input so they can start again
            }
        });
    }

    // When the clear button is pressed we wipe everything
    if (clearButton) {
        clearButton.addEventListener("click", (event) => {
            event.preventDefault();
            input = []; // Remove all saved values
            inputDisplay.value = ""; // Empty the screen
        });
    }
});
