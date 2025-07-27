const Backlinks = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Backlinks</h1>
        <p className="text-muted-foreground">
          View and analyze all your generated backlinks.
        </p>
      </div>
      
      <div className="bg-gradient-card border border-border rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Backlinks Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will show your backlink database and analytics.
        </p>
      </div>
    </div>
  );
};

export default Backlinks;