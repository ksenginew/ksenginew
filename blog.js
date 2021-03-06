let fs = require('fs');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

fetch('https://dev.to/api/articles?username=ksengine')
  .then((response) => response.json())
  .then((data) => {
    fs.writeFileSync(
      'README.md',
      fs
        .readFileSync('README.md')
        .toString()
        .replace(
          /<!--\s*blog\s*posts\s*start\s*-->[^]*?<!--\s*blog\s*posts\s*end\s*-->/,
          '<!-- blog  posts start -->' + data
            .slice(0, 3)
            .map(
              (post) => `
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
`
            )
            .join('\n\n') + '<!-- blog  posts end -->'
        )
    );
  });
