const About = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-8">About</h1>
      <p className="text-lg max-w-4xl mx-auto p-3">
        This blog website was made with the intended purpose to display my
        skills as a developer. Utilizing the MERN stack it encompasses a
        comprehensive set of CRUD operations for both posts and users.
        Additionally, a search functionality has been implemented which allows
        users to search for posts by title or tags. This site is styled using
        Tailwind CSS, and React-Router-Dom is used to handle the routing. Redux
        toolkit manages user state on the frontend, and on the backend Express
        and Mongoose are employed to handle operations, complemented by JWT for
        authentication and bcrypt for password hashing. I hope you enjoy!
      </p>
    </div>
  );
};
export default About;
