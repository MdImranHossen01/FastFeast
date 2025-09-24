const DynamicMenuDetailsPage = async ({ params }) => {
  console.log(await params);
  const { menuId} = await params
  return (
    <div>
      <h1>This is Dynamic Menu Details Page id:{menuId}</h1>
    </div>
  );
};

export default DynamicMenuDetailsPage;
