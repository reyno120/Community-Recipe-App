const ingredients = [
    { value: 'apple', label: 'apple'},
    { value: 'apricot', label: 'apricot'},
    { value: 'avacado', label: 'avacado'},
    { value: 'banana', label: 'banana'},
    { value: 'blackberries', label: 'blackberries'},
    { value: 'blackcurrant', label: 'blueberries'},
    { value: 'strawberries', label: 'strawberries'},
    { value: 'peaches', label: 'peaches'},
    { value: 'mangoes', label: 'mangoes'},
    { value: 'dates', label: 'dates'},
    { value: 'raisins', label: 'raisins'},
    { value: 'dried fruit', label: 'dried fruit'},
    { value: 'dried apricots', label: 'dried apricots'},
    { value: 'figs', label: 'figs'},
    { value: 'dulse seaweed flakes', label: 'dulse seaweed flakes'},
    { value: 'goji berries', label: 'goji Berries'},
    { value: 'black beans', label: 'black beans'},
    { value: 'chickpeas', label: 'chickpeas'},
    { value: 'kidney beans', label: 'kidney beans'},
    { value: 'navy beans', label: 'naby beans'},
    { value: 'blacked-eyed peas', label: 'black-eyed peas'},
    { value: 'pinto beans', label: 'pinto beans'},
    { value: 'green peas', label: 'green peas'},
    { value: 'cannallini beans', label: 'cannallini beans'},
    { value: 'beans', label: 'beans'},
    { value: 'lentils', label: 'lentils'},
    { value: 'green lentils', label: 'green lentils'},
    { value: 'red lentils', label: 'red lentils'},
    { value: 'yellow lentils', label: 'yellow lentils'},
    { value: 'black lentils', label: 'black lentils'},
    { value: 'brown lentils', label: 'brown lentils'},
    { value: 'chickpea flour', label: 'chickpea flour'},
    { value: 'chipotle chilies', label: 'chipotle chilies'},
    { value: 'date sugar', label: 'date sugar'},
    { value: 'cocoa powder', label: 'cocoa powder'},
    { value: 'cocoa powder (unsweetened)', label: 'cocoa powder (unsweetened'},
    { value: 'curry powder', label: 'curry powder'},
    { value: 'dried chilies', label: 'dried chilies'},
    { value: 'rice', label: 'rice'},
    { value: 'white rice', label: 'white rice'},
    { value: 'brown rice', label: 'brown rice'},
    { value: 'brown rice flour', label: 'brown rice flour'},
    { value: 'red rice', label: 'red rice'},
    { value: 'black rice', label: 'black rice'},
    { value: 'wild rice', label: 'wild rice'},
    { value: 'oats', label: 'oats'},
    { value: 'old-fashioned rolled oats', label: 'old-fashioned rolled oats'},
    { value: 'oat flour', label: 'oat flour'},
    { value: 'oat bran', label: 'oat bran'},
    { value: 'quinoa', label: 'quinoa'},
    { value: 'red quinoa', label: 'red quinoa'},
    { value: 'white quinoa', label: 'white quinoa'},
    { value: 'black quinoa', label: 'black quinoa'},
    { value: 'miso paste', label: 'miso paste'},
    { value: 'miso paste (white)', label: 'miso paste (white)'},
    { value: 'mustard', label: 'mustard'},
    { value: 'mustard (stone-ground)', label: 'mustard (stone-ground)'},
    { value: 'tahini', label: 'tahini'},
    { value: 'almond butter', label: 'almond butter'},
    { value: 'cashew butter', label: 'cashew butter'},
    { value: 'peanut butter', label: 'peanut butter'},
    { value: 'almonds', label: 'almonds'},
    { value: 'cashews', label: 'cashews'},
    { value: 'peanuts', label: 'peanuts'},
    { value: 'walnuts', label: 'walnuts'},
    { value: 'pecans', label: 'pecans'},
    { value: 'flaxseeds', label: 'flaxseeds'},
    { value: 'sesame seeds', label: 'sesame seeds'},
    { value: 'hemp seeds', label: 'hemp seeds'},
    { value: 'pumpkin seeds', label: 'pumpkin seeds'},
    { value: 'sunflower seeds', label: 'sunflower seeds'},
    { value: 'almond flour', label: 'almond flour'},
    { value: 'nutritional yeast', label: 'nutrional yeast'},
    { value: 'pasta', label: 'pasta'},
    { value: 'pasta (whole-grain)', label: 'pasta (whole-grain)'},
    { value: 'spaghetti', label: 'spaghetti'},
    { value: 'spaghetti (whole-grain)', label: 'spaghetti (whole-grain)'},
    { value: 'linguine', label: 'linguine'},
    { value: 'linguine (whole-grain)', label: 'linguine (whole-grain)'},
    { value: 'fusilli', label: 'fusilli'},
    { value: 'fusilli (whole-grain)', label: 'fusilli (whole-grain)'},
    { value: 'lasagna', label: 'lasagna'},
    { value: 'lasagna (whole-grain)', label: 'lasagna (whole-grain)'},
    { value: 'soba', label: 'soba'},
    { value: 'soba (whole-grain)', label: 'soba (whole-grain)'},
    { value: 'elbow macaroni', label: 'elbow macaroni'},
    { value: 'elbow macaroni (whole-grain)', label: 'elbow macaroni (whole-grain)'},
    { value: 'roasted red peppers, jarred', label: 'roasted red peppers, jarred'},
    { value: 'tomatoes', label: 'tomatoes'},
    { value: 'tomatoes (diced, canned)', label: 'tomatoes (diced, canned)'},
    { value: 'tomatoes (whole, canned)', label: 'tomatoes (whole, canned)'},
    { value: 'tomato paste', label: 'tomato paste'},
    { value: 'fire roasted tomatoes', label: 'fire roasted tomatoes'},
    { value: 'marinara sauce', label: 'marinara sauce'},
    { value: 'tortillas', label: 'tortillas'},
    { value: 'tortillas (whole-grain)', label: 'tortillas (whole-grain)'},
    { value: 'tortillas (corn)', label: 'tortillas (corn)'},
    { value: 'vanilla beans', label: 'vanilla beans'},
    { value: 'vinegar', label: 'vinegar'},
    { value: 'balsamic vinegar', label: 'balsamic vinegar'},
    { value: 'rice vinegar', label: 'rice vinegar'},
    { value: 'tarragon vinegar', label: 'tarragon vinegar'},
    { value: 'onions', label: 'onions'},
    { value: 'yellow onions', label: 'yellow onions'},
    { value: 'red onions', label: 'red onions'},
    { value: 'sweet onions', label: 'sweet onions'},
    { value: 'green onions', label: 'green onions'},
    { value: 'garlic', label: 'garlic'},
    { value: 'carrots', label: 'carrots'},
    { value: 'potatoes', label: 'potatoes'},
    { value: 'red potatoes', label: 'red potatoes'},
    { value: 'white potatoes', label: 'white potatoes'},
    { value: 'yukon gold potatoes', label: 'yukon gold potatoes'},
    { value: 'russet potatoes', label: 'russet potatoes'},
    { value: 'sweet potatoes', label: 'sweet potatoes'},
    { value: 'japanese sweet potatoes', label: 'japanese sweet potatoes'},
    { value: 'celery', label: 'celery'},
    { value: 'lemons', label: 'lemons'},
    { value: 'limes', label: 'limes'},
    { value: 'gingerroot', label: 'gingerroot'},
    { value: 'kale', label: 'kale'},
    { value: 'baby spinach', label: 'baby spinach'},
    { value: 'spinach', label: 'spinach'},
    { value: 'arugula', label: 'arugula'},
    { value: 'cauliflower', label: 'cauliflower'},
    { value: 'cabbage', label: 'cabbage'},
    { value: 'purple cabbage', label: 'purple cabbage'},
    { value: 'broccoli', label: 'broccoli'},
    { value: 'lettuce', label: 'lettuce'},
    { value: 'romaine lettuce', label: 'romaine lettuce'},
    { value: 'iceburg lettuce', label: 'iceburg lettuce'},
    { value: 'cucumber', label: 'cucumber'},
    { value: 'bell pepper', label: 'bell pepper'},
    { value: 'green bell pepper', label: 'green bell pepper'},
    { value: 'yellow bell pepper', label: 'yellow bell pepper'},
    { value: 'red bell pepper', label: 'red bell pepper'},
    { value: 'orange bell pepper', label: 'orange bell pepper'},
    { value: 'asparagus', label: 'asparagus'},
    { value: 'green beans', label: 'green beans'},
    { value: 'mushrooms', label: 'mushrooms'},
    { value: 'white mushrooms', label: 'white mushrooms'},
    { value: 'shitaki mushrooms', label: 'shitaki mushrooms'},
    { value: 'portabella mushrooms', label: 'portabella mushrooms'},
    { value: 'mushrooms caps', label: 'mushroom caps'},
    { value: 'squash', label: 'squash'},
    { value: 'butternut squash', label: 'butternut squash'},
    { value: 'zuchinni', label: 'zuchinni'},
    { value: 'corn', label: 'corn'},
    { value: 'tempeh', label: 'tempeh'},
    { value: 'tofu', label: 'tofu'},
    { value: 'tofu (silken)', label: 'tofu (silken)'},
    { value: 'tofu (firm)', label: 'tofu (firm)'},
    { value: 'tofu (regular)', label: 'tofu (regular)'},
    { value: 'tofu (extra-firm)', label: 'tofu (extra-firm)'},
    { value: 'tofu (super-firm)', label: 'tofu (super-firm)'},
    { value: 'edamame', label: 'edamame'},
    { value: 'vegetable broth', label: 'vegetable broth'},
    { value: 'parsley', label: 'parsley'},
    { value: 'salt', label: 'salt'},
    { value: 'sage', label: 'sage'},
    { value: 'garlic powder', label: 'garlic powder'},
    { value: 'onion powder', label: 'onion powder'},
    { value: 'black pepper', label: 'black pepper'},
    { value: 'cinammon', label: 'cinnamon'},
    { value: 'cardamom', label: 'cardamom'},
    { value: 'cayenne pepper', label: 'cayenne pepper'},
    { value: 'chia seeds', label: 'chia seeds'},
    { value: 'cloves', label: 'cloves'},
    { value: 'coriander', label: 'coriander'},
    { value: 'cumin', label: 'cumin'},
    { value: 'black cumin', label: 'black cumin'},
    { value: 'saffron', label: 'saffron'},
    { value: 'fennel seed', label: 'fennel seed'},
    { value: 'ginger', label: 'ginger'},
    { value: 'nutmeg', label: 'nutmeg'},
    { value: 'oregano', label: 'oregano'},
    { value: 'paprika', label: 'paprika'},
    { value: 'smoked paprika', label: 'smoked paprika'},
    { value: 'peppercorns', label: 'peppercorns'},
    { value: 'rosemary', label: 'rosemary'},
    { value: 'turmeric', label: 'turmeric'},
    { value: 'thyme', label: 'thyme'},
    { value: 'basil', label: 'basil'},
    { value: 'chives', label: 'chives'},
    { value: 'cilantro', label: 'cilantro'},
    { value: 'dill', label: 'dill'},
    { value: 'marjoram', label: 'marjoram'},
    { value: 'mint', label: 'mint'},
    { value: 'tarragon', label: 'tarragon'},
    { value: 'chili powder', label: 'chili powder'},
    { value: 'yellow curry powder', label: 'yellow curry powder'},
    { value: 'poblano pepper', label: 'poblano pepper'},
    { value: 'plant milk', label: 'plant milk'},
    { value: 'plant milk (unsweetened)', label: 'plant milk (unsweetened)'},
    { value: 'oat milk', label: 'oat milk'},
    { value: 'oat milk (unsweetened)', label: 'oat milk (unsweetened)'},
    { value: 'oat milk (chocolate)', label: 'oat milk (chocolate)'},
    { value: 'oat milk (vanilla)', label: 'oat milk (vanilla)'},
    { value: 'almond milk', label: 'almond milk'},
    { value: 'almond milk (unsweetened)', label: 'almond milk (unsweetened)'},
    { value: 'almond milk (chocolate)', label: 'almond milk (chocolate)'},
    { value: 'almond milk (vanilla)', label: 'almond milk (vanilla)'},
    { value: 'pea milk', label: 'oat milk'},
    { value: 'pea milk (unsweetened)', label: 'pea milk (unsweetened)'},
    { value: 'pea milk (chocolate)', label: 'pea milk (chocolate)'},
    { value: 'pea milk (vanilla)', label: 'pea milk (vanilla)'},
    { value: 'soy milk', label: 'soy milk'},
    { value: 'soy milk (unsweetened)', label: 'soy milk (unsweetened)'},
    { value: 'soy milk (chocolate)', label: 'soy milk (chocolate)'},
    { value: 'soy milk (vanilla)', label: 'soy milk (vanilla)'},
    { value: 'rice milk', label: 'rice milk'},
    { value: 'rice milk (unsweetened)', label: 'rice milk (unsweetened)'},
    { value: 'coconut milk', label: 'coconut milk'},
    { value: 'coconut milk (unsweetened)', label: 'coconut milk (unsweetened)'},
    { value: 'cashew milk', label: 'cashew milk'},
    { value: 'cashew milk (unsweetened)', label: 'cashew milk (unsweetened)'},
    { value: 'hemp milk', label: 'hemp milk'},
    { value: 'hemp milk (unsweetened)', label: 'hemp milk (unsweetened)'},
    { value: 'water', label: 'water'},
    { value: 'soy sauce', label: 'soy sauce'},
    { value: 'dijon mustard', label: 'dijon mustard'},
    { value: 'vegan worcestershire sauce', label: 'vegan worcestershire sauce'},
    { value: 'brown sugar', label: 'brown sugar'},
    { value: 'vegetable stock', label: 'vegetable stock'},
    { value: 'peanut sauce', label: 'peanut sauce'},
    { value: 'tortilla chips', label: 'tortilla chips'},
    { value: 'salsa', label: 'salsa'},
    { value: 'baking powder', label: 'baking powder'},
    { value: 'oat flour', label: 'oat flour'},
    { value: 'white wine vinegar', label: 'white wine vinegar'},
    { value: 'hot sauce', label: 'hot sauce'},
    { value: 'barbecue sauce', label: 'barbecue sauce'},
    { value: 'ketchup', label: 'ketchup'}
];

export default ingredients;