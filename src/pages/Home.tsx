import breadCut from "../assets/bread-recipe.jpg"
import breadTowel from "../assets/bread-recipe2.jpg"
import breadWhite from "../assets/bread-recipe3.jpg"
import {NavLink} from "react-router-dom";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-intro">
        <img className="home-img" src={breadTowel} alt="The image of bread"/>
        <div className="section-text">
          <h2>What is Sourdough?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <NavLink to="/recipes"
            className="home-link"
          >
            Check the Recipes
          </NavLink>
        </div>
      </section>
      <section className="home-benefits">
        <img className="home-img" src={breadWhite} alt="The image of bread"/>
        <div className="section-text">
          <h2>Why is Sourdough good for you?</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui
            ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
            voluptatem.
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
            ea commodi
            consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur,
            vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
          </p>
        </div>
      </section>
      <section className="home-features">
        <img className="home-img" src={breadCut} alt="The image of bread"/>
        <div className="section-text">
          <h2>What can you find on our website?</h2>
          <p>
            Do you want to learn how to make your own starter? Or you want some good recipes to try out?
            You can find it all here on our website!
            You have some amazing recipes to share? Feel free to contribute adding your own recipes on our website!
          </p>
          <p>
            Just log in into your account and let the others taste your best sourdough recipes!
          </p>
          <NavLink to="/login"
                   className="home-link"
          >
            Go to Login
          </NavLink>
        </div>
      </section>
    </main>
  )
}