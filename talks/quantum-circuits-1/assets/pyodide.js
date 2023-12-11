async function main() {
    let pyodide = await loadPyodide({
      indexURL : "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/",
      stdout: function(line) {
        if (line != "Python initialization complete") {
          document.getElementById("run-output").innerText = line;
        }
      }
    });
    document.getElementById("run-button").addEventListener("click", function() {
      pyodide.runPython(document.getElementById("run-code").innerText);
    });
  };

main();