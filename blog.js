let fs = require('fs');

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    fs.writeFileSync(
      'README.md',
      fs.readFileSync('README.md').replace(
        /<!--\s*blog\s*posts\s*start\s*-->[^]*?<!--\s*blog\s*posts\s*end\s*-->/,
        JSON.parse(this.responseText)
          .slice(0, 3)
          .map(
            (post) => `
<!-- blog  posts start -->
<a href="${post.url}">
<table>
<thead>
<tr>
<th>
<img src="${post.cover_image}" alt="cover image of post" width="500px" height="auto"/>
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<h3>${post.title}</h3>
${post.description}
</td>
</tr>
</tbody>
</table>
</a>
<!-- blog  posts end -->
`
          )
          .join('\n\n')
      )
    );
  }
};
xhttp.open('GET', 'https://dev.to/api/articles?username=ksengine', true);
xhttp.send();
