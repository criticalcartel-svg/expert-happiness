import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer.fullName);
  const name = customer.charAt(0).toUpperCase() + customer.slice(1);

  return <h2>👋 Welcome, {name}</h2>;
}

export default Customer;
