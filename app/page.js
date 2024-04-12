import CategorySearch from "./_components/CategorySearch";
import DoctorsList from "./_components/DoctorsList";
import Hero from "./_components/Hero";

export default function Home() {
  return (
  <div className="md:px-20">
    {/* Hero section */}
    <Hero />
    {/* Category + SearchBar */}
    <CategorySearch />
    {/* Popular Doctor List */}
    <DoctorsList />
  </div>
  );
}

