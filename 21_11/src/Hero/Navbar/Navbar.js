const Navbar = ({ items }) => {
  return (
    <div>
      <nav>
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
