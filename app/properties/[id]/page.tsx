interface PropertyPageProps {
  params: {
    id: string;
  };
}

const PropertyPage: React.FC<PropertyPageProps> = ({ params }) => {
  return (
    <div>
      <h1>Property page {params.id}</h1>
    </div>
  );
};

export default PropertyPage;
