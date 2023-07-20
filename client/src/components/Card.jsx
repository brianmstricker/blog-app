const Card = () => {
  return (
    <div className="bg-gray-300 max-w-[350px] rounded-xl mb-8 m-2 mx-auto xs:mx-2">
      <img
        className="w-50 h-50 rounded-t-xl"
        src="https://images.unsplash.com/photo-1689656966481-043a970b7c76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      />
      <div className="p-3">
        <h1 className="text-center font-bold text-2xl ">Hello World</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
          cupiditate magnam distinctio maxime pariatur illum vero perspiciatis
          quis aperiam quo!
        </p>
      </div>
    </div>
  );
};
export default Card;
