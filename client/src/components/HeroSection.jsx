import heroimg from "../assets/images/heroimg.svg";
import Searchbar from "./Searchbar";

const HeroSection = () => {
  return (
    <div className="w-full h-[600px] md:h-[500px] pt-8 lg:pt-20 max-w-5xl mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="h-[60%] md:h-full">
          <h1 className="text-4xl">
            Read a collection of different tech related articles.
          </h1>
          <p className="mt-10 max-w-[500px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            nesciunt dolores dolor asperiores sit expedita consectetur quos
            explicabo molestias perspiciatis laborum dignissimos, facere officia
            possimus!
          </p>
          <Searchbar />
        </div>
        <div className="w-full h-full mt-4 md:mt-0">
          <img
            className="max-h-[400px] md:max-h-full w-full"
            src={heroimg}
            alt="People with laptops"
          />
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
