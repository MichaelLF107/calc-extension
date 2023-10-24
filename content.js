const expressionRegex = /calc\{[^{}]+\}/g;

function evaluateExpression(match) {
  let expression = match.slice(5, -1);
  if (/[a-zA-Z]/.test(expression)) {
    return match;
  }
  try {
    const result = eval(expression);
    if (typeof result !== "undefined") {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
  return match;
}

const inputFields = document.querySelectorAll(
  '[contenteditable], input[type="text"], textarea'
);
inputFields.forEach((input) => {
  input.addEventListener("input", function (e) {
    const content = e.target.value;
    const newContent = content.replace(expressionRegex, evaluateExpression);
    if (content !== newContent) {
      e.target.value = newContent;
    }
  });
});
