let lessons = [];

function addLesson() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const exampleCode = document.getElementById('exampleCode').value;

  if (title && content) {
    const id = `lesson${lessons.length + 1}`;
    const lesson = { id, title, content, exampleCode: exampleCode || null };
    lessons.push(lesson);

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('exampleCode').value = '';

    displayJSON();
  } else {
    alert('Please enter both title and content.');
  }
}

function displayJSON() {
  const jsonOutput = document.getElementById('jsonOutput');
  jsonOutput.textContent = JSON.stringify({ lessons }, null, 2);
}

function downloadJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ lessons }, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "lessons.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
