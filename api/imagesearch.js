'use strict';
var express = require("express");
var router = express.Router();
const bingSearch = require('bing.search');

/* Use api. */
router.get('/:query', function(req, res, next) {
	// var googleSearch = new GoogleSearch({
	// 	key: "AIzaSyA7yupL9KmGoMg5YDoJ_fMeIJ3SouCSejQ",
	// 	cx : "009830855656326863918:vtzvxakikfc"
	// });
	// googleSearch.build({

	// })
	//res.render('index', { title: 'Express' });
	//Bing Search API account key: EdEXsCqeg2fravgkyIfA+UNsRPscRit5FU+gXsdoVpM
	var query = req.params.query;
	console.log(query);
	var offset = req.query.offset || 10;
	console.log(offset);
	var search  = new bingSearch("EdEXsCqeg2fravgkyIfA+UNsRPscRit5FU+gXsdoVpM");
	
	search.images(query, {top: offset}, function(err, images){
		if(err) console.error(err);
		// for(var i = 0; i < images.length; ++i){
		// 	var resObj = {
		// 		'url': images[i].url,
		// 		'snippet': images[i].title,
		// 		'thumbnail': images[i].thumbnail.url,
		// 		'context': images[i].sourceUrl
		// 	};
		// 	res.send(resObj);

		// // }
		res.send(images.map(function(img){
			return {
				"url": img.url,
			    "snippet": img.title,
			    "thumbnail": img.thumbnail.url,
			    "context": img.sourceUrl	
			} 
		}));

		console.log('get request successed!')
	})
	console.log("connected!");
	//res.end();

});
module.exports = router;