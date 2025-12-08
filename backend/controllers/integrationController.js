// GET integration status
const getIntegrationStatus = (req, res) => {
    res.status(200).json({
        service: "Integration Service",
        status: "Online",
        timestamp: new Date()
    });
};

// POST mock sync
const syncIntegration = (req, res) => {
    res.status(200).json({
        message: "Mock integration sync completed successfully",
        synced_at: new Date()
    });
};


module.exports ={getIntegrationStatus, syncIntegration}