'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      return models.users.insertMany([
        {
          _id : "65fd05a3f7fda25492a90842",
          name : "Hakeemshah",
          email : "hakeemshah1206@gmail.com",
          password : "$2y$10$ZSejXFL0x3h/XJypNa5aHegWoBqDeWp7HcXSEFklNVkdi1aTWoDMW"//Hakeem@123
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    

      return models.users.deleteMany({
        _id : {
          $in : [
            "65fd05a3f7fda25492a90842"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
