import heroimg from "../assets/images/heroimg.svg";
import Card from "./Card";
import Searchbar from "./Searchbar";

const HeroSection = () => {
  return (
    <>
      <section className="w-full pt-4 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-[60%] xs:w-[75%] md:h-full flex flex-col">
            <h1 className="sm:text-4xl xs:text-3xl text-2xl font-medium mt-6">
              Check our collection of different tech related articles.
            </h1>
            <p className="mt-8 max-w-[500px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              nesciunt dolores dolor asperiores sit expedita consectetur quos
              explicabo molestias perspiciatis laborum dignissimos, facere
              officia possimus!
            </p>
            <Searchbar />
          </div>
          <div className="w-full h-full mt-4 md:mt-0">
            <img
              className="h-full w-full max-h-[400px] object-contain]"
              src={heroimg}
              alt="People with laptops"
            />
          </div>
        </div>
      </section>
      <CardSection />
    </>
  );
};
const CardSection = () => {
  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container mx-auto mt-16">
      <Card />
    </section>
  );
};
export default HeroSection;
