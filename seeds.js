var mongoose = require("mongoose");
var Place = require("./models/place");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Red Fort",
        image: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2015/08/Red-Fort.jpg",
        description: "The Red Fort is an epitome of the Mughal era in India and is the face of tourist attractions in Delhi. Built in 1638, it is an outstanding marvel of Mughal architecture made of red sandstone. Within its magnanimous walls, the chhata bazaar and every evening sound and light show are special attractions. If you are interested in the history of Red Fort, you will be thrilled to know that the Fort was built when Mughal Emperor, Shah Jahan shifted his capital to Delhi. In 2007, this Fort has declared a UNESCO World Heritage. It is one of the most famous places in Delhi"
    },
    {
        name: "India Gate",
        image: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2015/08/India-Gate.jpg",
        description: "India Gate is one monument that defines Delhi or India for that matter. It was built in 1931 as a memorial for martyrs of World War I and war in Afghanistan. At Rajpath, the structure looks amazing in evening lights. The gardens that line the structure are a must visit among the sightseeing places in Delhi. If you are in Delhi on the Republic Day, you must visit India Gate Parade which is really a prestigious and the most ceremonious event of India. Lots of international guests and national leaders are present on the occasion and pay tribute to the freedom fighters and great leaders of the country."
    },
    {
        name: "Qutub Minar",
        image: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2015/08/Qutub-Minar.jpg",
        description: "Among the other places to visit in Delhi, Qutub Minar stands tall with its 73 meter tall brick minaret. Built by Qutub-ud-din Aibak, the structure has five stories abundant with chiseled carvings and scriptures. Qutub Minar is the part of the Qutub Complex and it has been declared as the UNESCO World Heritage Site. This red stone tower is a heritage site of India is an amazing example of the beautiful Iranian architecture along with Parso-Arabic and Nagari details"
    }
]

function seedDB(){
   //Remove all campgrounds
   Place.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Places!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Place.create(seed, function(err, place){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a place");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is just great",
                                author: "Ram"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    place.comments.push(comment);
                                    place.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
