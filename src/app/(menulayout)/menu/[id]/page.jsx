const CatchAllRoutes = async ({ params }) => {
    console.log(await params);
  return (
    <div>
      <h1 className="text-4xl">CatchAllRoutes</h1>
    </div>
  );
};

export default CatchAllRoutes;
