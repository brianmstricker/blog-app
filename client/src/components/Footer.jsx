const Footer = () => {
  return (
    <footer className="bg-gray-200 container mx-auto rounded-t-xl">
      <div className="xl:flex justify-between p-4">
        <div className="flex xl:gap-16 gap-4">
          <div>
            <h6 className="font-bold text-lg">About</h6>
          </div>
          <div>
            <h6 className="font-bold text-lg">Legal</h6>
          </div>
          <div>
            <h6 className="font-bold text-lg">Community</h6>
          </div>
        </div>
        <div>social links</div>
      </div>
    </footer>
  );
};
export default Footer;
