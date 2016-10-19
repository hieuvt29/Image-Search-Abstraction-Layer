'use strict';
const bingSearch = require('bing.search');
var router = require('express').Router();
module.exports = function (app, History){
	router.get('/latest/imagesearch',getHistory);

	router.get('/imagesearch/:query', search);

	function getHistory(req, res){
		//something to do here
		History.find({}, null, {
      		"limit": 10,
      		"sort": {
        		"when": -1
      		}
    	}, function(err, history) {
      		if (err) return console.error(err);
      		console.log(history);
      		res.send(history.map(function(h){
      			return {'term': h.term, 'when': h.when};
      		}));
    	});

	};
	function saveAction(Obj){
		var newSearch = new History(Obj);
		newSearch.save(function(err, history){
			if(err) console.error(err);
			console.log('Saved' + history);
		})
	}

	function search(req, res) {
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
		var history = {"term": query, "when": new Date().toString()};
		if(query){ 
			saveAction(history)
		};

		search.images(query, {top: offset}, function(err, images){
			if(err) console.error(err);

			res.send(images.map(function(img){
				return {
					"url": img.url,
				    "snippet": img.title,
				    "thumbnail": img.thumbnail.url,
				    "context": img.sourceUrl	
				} 
			}));

		})
		console.log("connected!");
		//res.end();

	};	
	app.use('/api', router);
}
