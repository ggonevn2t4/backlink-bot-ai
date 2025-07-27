const Campaigns = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <p className="text-muted-foreground">
          Manage and monitor your backlink automation campaigns.
        </p>
      </div>
      
      <div className="bg-gradient-card border border-border rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Campaigns Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will show your active and completed campaigns.
        </p>
      </div>
    </div>
  );
};

export default Campaigns;