const Footer = () => {
  return (
    <footer className="bg-gray-300 container mx-auto rounded-t-xl">
      <div className="xs:flex justify-between p-8">
        <div className="flex xl:gap-16 gap-4">
          <div>
            <h6 className="font-bold text-lg">About</h6>
          </div>
          <div>
            <h6 className="font-bold text-lg w-max">View All Posts</h6>
          </div>
          <div>
            <h6 className="font-bold text-lg">Users</h6>
          </div>
        </div>
        <div className="mt-8 xs:mt-0">social links</div>
      </div>
    </footer>
  );
};
export default Footer;
