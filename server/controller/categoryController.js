const categories = require ('../models/Category');
const Recipe = require('../models/Recipe');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

exports.create = async(req, res) => {
  try{

    const catData = new categories(req.body);

    if(!catData){
      return res.status(404).json({msg: "User data not found"});
    }

    const savedData = await catData.save();
    res.status(200).json(savedData);

  }catch (error) {
    res.status(500).json({error: error});
  }
}

exports.fetchAll = async(req, res) => {
  try{
    const catData = await categories.find();
    if(!catData){
      return res.status(404).json({msg: "User data not found"});
    }
    res.status(200).json(catData);
  } catch(error) {
    res.status(500).json({error: error});
  }
}

exports.fetchOne = async(req, res) => {
  try{
    const id = req.params.id;
    const catExist = await categories.findById(id);
    if(!catExist){
      return res.status(404).json({msg: "User not found"});
    }
    res.status(200).json(catExist);
  } catch(error) {
    res.status(500).json({error: error});
  }
}


exports.fetchAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    if (!allRecipes || allRecipes.length === 0) {
      return res.status(404).json({ msg: "Recipes not found" });
    }
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error occurred while fetching recipes" });
  }
};



exports.exploreRecipesByID = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipes = await Recipe.findById(recipeId);
    if (!recipes) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error occurred while fetching recipe" });
  }
}


exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipes = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ msg: "No latest recipes found" });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message || "Error occurred while fetching latest recipes" });
  }
};



exports.exploreRandom = async (req, res) => {
  try {
    const count = await Recipe.countDocuments();
    const random = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(random).exec();
    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred" });
  }
};


exports.getAllRecipes = async (req, res) => {
  try {
    // Fetch all recipes and populate the 'category' field
    const recipes = await Recipe.find().populate('category', 'name'); // Assuming 'category' is a reference field to the Category model

    // Handle response
    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ msg: "No recipes found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error occurred while fetching recipes" });
  }
};


exports.searchRecipes = async (req, res) => {
  try {
    const { searchTerm } = req.body; // Destructure search term

    if (!searchTerm) {
      return res.status(400).json({ msg: "Missing search term in request body" });
    }

    const recipes = await Recipe.find(
      { $text: { $search: searchTerm, $diacriticSensitive: true } }, 
      { _id: 1, name: 1, image: 1 /* add other fields you want to include in the response */ }
    );

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ msg: "No recipes found matching '" + searchTerm + "'" });
    }

    res.status(200).json(recipes); // Send found recipes in the response
  } catch (error) {
    console.error('Search error:', error); // Log the error for debugging
    res.status(500).send({ error: error.message || "Error occurred while searching" });
  }
};

exports.moveImage = (filename) => {
  return new Promise((resolve, reject) => {
    const sourcePath = path.join(__dirname, '../public/uploads/', filename);
    const destinationPath = path.join(__dirname, '../../client/public/uploads/', filename);

    if (!fs.existsSync(sourcePath)) {
      reject('Image not found in server-side upload folder.');
    }

    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        reject('Error moving image: ' + err);
      } else {
        resolve('Image moved successfully.');
      }
    });
  });
};



const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const extension = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image file type'));
    }
  }
}).single('image');

exports.upload = upload;


exports.submitRecipe= (req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'FlavourFeed - Submit Recipe', infoErrorsObj, infoSubmitObj });
};

exports.submitRecipeOnPost = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'An error occurred during file upload.' });
      } else if (err) {
        console.error('Unknown error:', err);
        return res.status(500).json({ error: 'An unknown error occurred.' });
      }

      const { name, ingredients, description, category, email } = req.body;
      let imageData = ''; 

      if (!name || !ingredients || !description || !category || !email ) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Image is required.' });
      }

      if (!req.file.filename) {
        return res.status(400).json({ error: 'An error occurred during image upload.' });
      }
      imageData = req.file.filename;

      await this.moveImage(imageData);
      
      
      const recipe = new Recipe({
        name,
        ingredients,
        description,
        category,
        email,
        image: imageData
      });

      await recipe.save(); // Save the recipe to the database

      setTimeout(() => {
        res.status(200).json({ message: 'Recipe has been added.' });
      }, 5000);
    } catch (error) {
      console.error('Error submitting recipe:', error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  });
};



// async function insertRecipe() {
//   try {
//       const recipes = [
// {
//         name: "Dark chocolate ricciarelli",
//         description: `
// 1. Start your biscuits the night before. Preheat the oven to 100ºC/gas ¼.

// 2. Arrange the almonds on a baking tray and toast in the oven for 5 minutes. Take them out (turn off the heat) and leave them to cool.

// 3. Put the nuts into a food processor with 2 tablespoons of the icing sugar and whiz until the almonds are ground to the texture of semolina. Don’t over-blitz, or the oils in the nuts will make it sticky.

// 4. Sieve another 180g of icing sugar and the cocoa into a bowl, then stir in the ground almonds. Set aside.

// 5. Melt the chocolate in a small pan over a low heat, then leave to cool slightly.

// 6. In a separate bowl, whisk the egg whites with an electric whisk until they form stiff peaks. Halve the vanilla pod lengthways, scrape out and add the seeds to the egg whites. Beat in the almond extract.

// 7. Gently fold the egg whites into the almond mix, then stir in the melted chocolate. Leave in the bowl, cover with clingfilm and chill overnight.

// 8. The next day, preheat the oven to 160ºC/gas 2½, and line 2 baking trays with greaseproof paper. Take the dough out of the fridge and leave it at room temperature for 10 minutes to soften up.

// 9. Dust the work surface with a little icing sugar and, using your hands, roll the dough into a sausage. Cut it into about 25 pieces and shape them into balls, each about 4cm in diameter.

// 10. Scatter the remaining 250g of icing sugar onto a plate. Take each ball and roll it in the sugar, making sure they’re all coated in a thick layer.

// 11. Put them on the baking trays, squashing each one very lightly, so it’s 1cm thick, and leaving some room between each one.

// 12. Bake the biscuits in the oven for 18 to 20 minutes, or until crinkled on the surface. They’ll still be soft, but don’t worry, they will set.

// 13. Leave to cool on the trays for 5 minutes then transfer to a wire rack to cool completely. Store in a tin to keep moist.

// Source: https://www.jamieoliver.com/recipes/chocolate-recipes/dark-chocolate-ricciarelli/`,
//         email: "shaikbabu2474@gmail.com",
//         ingredients: [
//             "150 g blanched almonds",
//             "450 g icing sugar , plus extra for dusting",
//             "2 tablespoons cocoa powder",
//             "100 g dark chocolate",
//             "2 free-range egg whites",
//             "1 vanilla pod",
//             "1 teaspoon almond extract"
//         ],
//         category: "Italian",
//         image: "Dark-chocolate-ricciarelli.jpg"
//     },
//     {
//         name: "Italian-style bakewell tart",
//         description: `
// 1. Halve and destone the plums and place in a bowl. Strip in the rosemary leaves, sprinkle with the icing sugar and leave to macerate for half an hour.
// 2. Meanwhile, make the frangipane. Cream the butter and caster sugar together, then beat in the eggs. Finely grate in the zest from the oranges and lemons and add the almond extract. Fold through the ground almonds and flour.
// 3. Preheat the oven to 180°C/350°F/gas 4.
// 4. Roll out the pastry on a floured surface to fit a 25cm x 35cm lined baking tray, going up the sides slightly. Bake in the middle of the oven for 15 minutes.
// 5. Remove from the oven and lower the heat to 160°C/310°F/gas 2½.
// 6. Spread the frangipane over the pastry and stud with the plums and flaked almonds. Bake for 30 minutes, then allow to cool slightly.
// 7. Combine the icing ingredients in a bowl and mix until smooth. Drizzle over the cooled tart, then serve.

// Source: https://www.jamieoliver.com/recipes/fruit-recipes/italian-style-bakewell-tart/`,
//         email: "shaikbabu2474@gmail.com",
//         ingredients: [
//             "750 g ripe plums",
//             "2 sprigs of fresh rosemary",
//             "20 g icing sugar",
//             "500 g all-butter shortcrust pastry",
//             "30 g flaked almonds",
//             "FRANGIPANE",
//             "200 g unsalted butter (at room temperature)",
//             "200 g golden caster sugar",
//             "4 large free-range eggs",
//             "2 oranges",
//             "2 lemons",
//             "2 teaspoons almond extract",
//             "200 g ground almonds",
//             "40 g plain flour , plus extra for dusting",
//             "LIMONCELLO ICING",
//             "75 g icing sugar",
//             "25 ml limoncello"
//         ],
//         category: "Italian",
//         image: "italian-style-bakewell-tart.jpg"
//     }
//       ];

//       await Recipe.insertMany(recipes); // Save the new recipe to the database
//       console.log('Recipe inserted successfully.');
//   } catch (error) {
//       console.error('Error inserting recipe:', error);
//   }
// }

// insertRecipe();