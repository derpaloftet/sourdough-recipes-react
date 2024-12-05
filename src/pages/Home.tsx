import breadCut from "../assets/bread-recipe.jpg"
import breadTowel from "../assets/bread-recipe2.jpg"
import breadWhite from "../assets/bread-recipe3.jpg"
import { NavLink } from "react-router-dom"

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-intro">
        <img className="home-img" src={breadTowel} alt="The image of bread" />
        <div className="section-text">
          <h2>What is Sourdough?</h2>
          <p>
            Sourdough is a type of bread made using a natural fermentation
            process that involves wild yeast and lactic acid bacteria. Unlike
            commercial breads that rely on packaged yeast for rising, sourdough
            uses a "starter" – a fermented mixture of flour and water that
            captures wild yeast from the environment. The process of making
            sourdough involves longer fermentation times, which gives the bread
            its distinct tangy flavor and chewy texture. Sourdough has been a
            traditional method of bread-making for thousands of years, predating
            modern yeast-based baking. It's prized for its complexity of flavor,
            artisanal quality, and the skill required to maintain a healthy
            starter and achieve the perfect loaf.
          </p>
          <NavLink to="/recipes" className="basic-btn">
            Check the Recipes
          </NavLink>
        </div>
      </section>
      <section className="home-benefits">
        <img className="home-img" src={breadWhite} alt="The image of bread" />
        <div className="section-text">
          <h2>Why is Sourdough good for you?</h2>
          <p>
            Sourdough is not only delicious but also offers several health
            benefits. The long fermentation process helps break down gluten,
            making the bread easier to digest for some people with gluten
            sensitivity (though it’s not suitable for those with celiac
            disease). The lactic acid bacteria in sourdough improve the
            availability of nutrients such as B vitamins, magnesium, and iron.
            Additionally, the fermentation process produces probiotics, which
            support gut health. Sourdough also has a lower glycemic index
            compared to many other types of bread, meaning it leads to a slower
            rise in blood sugar. These factors make sourdough a nutritious
            choice for those seeking wholesome, traditionally prepared bread.
          </p>
        </div>
      </section>
      <section className="home-features">
        <img className="home-img" src={breadCut} alt="The image of bread" />
        <div className="section-text">
          <h2>What can you find on our website?</h2>
          <p>
            Do you want to learn how to make your own starter? Or you want some
            good recipes to try out? You can find it all here on our website!
            You have some amazing recipes to share? Feel free to contribute
            adding your own recipes on our website!
          </p>
          <p>
            Let the others taste your best sourdough recipes! Share with the
            world your knowledge!
          </p>
          <NavLink to="/add-recipes" className="basic-btn">
            Go to Add Recipe
          </NavLink>
        </div>
      </section>
    </main>
  )
}
