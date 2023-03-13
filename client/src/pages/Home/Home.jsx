import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/MailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.scss";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContanier">
        <Featured />
        <h1>Browser by property type</h1>
        <PropertyList />
        <h1>Home guest love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
}
