// var xray = require('x-ray');
// var x = new xray();
// var fs = require('fs');
// var rl = require('readline').createInterface({
//  input: require('fs').createReadStream('./areas_of_focus.txt')
// });
//
// rl.on('line', function(aof) {
//   Model.AoF.findOne({name: aof}, function(err, match) {
//     if (!match) {
//       console.log(aof)
//       Model.AoF.create({name: aof}, function(err, line) {
//         console.log('Line from file:', line);
//       });
//     }
//   });
// });




// var arrLinks = [];
// app.get('/organizations', function(req, res, next) {
//   x('http://www.unodc.org/ngo/list.jsp', 'tr td p', ['a@href'], [{
//     href: '@href'
//   }])(function(err, links) {
//     arrLinks = links.map(function(link) {
//       if (link != null)
//         return link;
//     });
//     res.send(arrLinks);
//   })
//   // res.send('index.html')
// });
