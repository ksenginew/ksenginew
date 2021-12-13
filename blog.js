let fs = require('fs');

http.get('https://dev.to/api/articles?username=ksengine', (res) => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync(
      'README.md',
      fs.readFileSync('README.md').replace(
        /<!--\s*blog\s*posts\s*start\s*-->[^]*?<!--\s*blog\s*posts\s*end\s*-->/,
        JSON.parse(rawData)
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
  });
});
