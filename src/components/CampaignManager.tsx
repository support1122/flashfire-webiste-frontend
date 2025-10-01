import { useState, useEffect } from 'react';
import { Check, Copy, TrendingUp, Users, MousePointerClick, Calendar, Trash2 } from 'lucide-react';
import CampaignStatsModal from './CampaignStatsModal';

interface Campaign {
  _id: string;
  campaignId: string;
  campaignName: string;
  utmSource: string;
  utmMedium: string;
  generatedUrl: string;
  totalClicks: number;
  uniqueVisitorsCount: number;
  totalBookings: number;
  isActive: boolean;
  createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.flashfirejobs.com';

export default function CampaignManager() {
  const [campaignName, setCampaignName] = useState('');
  const [utmMedium, setUtmMedium] = useState('campaign');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/campaigns`);
      const data = await response.json();
      if (data.success) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Create new campaign
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignName.trim()) {
      alert('Please enter a campaign name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignName,
          utmMedium,
          utmCampaign: utmCampaign || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Campaign created successfully!');
        setCampaignName('');
        setUtmMedium('campaign');
        setUtmCampaign('');
        fetchCampaigns();
      } else {
        alert(data.message || 'Failed to create campaign');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = async (url: string, campaignId: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(campaignId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Open stats modal
  const handleViewStats = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowStatsModal(true);
  };

  // Delete campaign
  const handleDeleteCampaign = async (campaignId: string) => {
    // First click - ask for confirmation
    if (confirmDeleteId !== campaignId) {
      setConfirmDeleteId(campaignId);
      // Reset confirmation after 3 seconds
      setTimeout(() => {
        setConfirmDeleteId(null);
      }, 3000);
      return;
    }

    // Second click - proceed with deletion
    setDeletingId(campaignId);
    try {
      const response = await fetch(`${API_BASE_URL}/api/campaigns/${campaignId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Campaign deleted successfully!');
        fetchCampaigns(); // Refresh the list
        setConfirmDeleteId(null);
      } else {
        alert(data.message || 'Failed to delete campaign');
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Failed to delete campaign. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Campaign Manager
          </h1>
          <p className="text-lg text-gray-600">
            Create and track UTM campaigns for your marketing efforts
          </p>
        </div>

        {/* Campaign Creation Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
              1
            </span>
            Create New Campaign
          </h2>
          
          <form onSubmit={handleCreateCampaign} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="campaignName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  id="campaignName"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., LinkedIn Q4 Campaign"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="utmMedium" className="block text-sm font-semibold text-gray-700 mb-2">
                  UTM Medium
                </label>
                <input
                  type="text"
                  id="utmMedium"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  placeholder="e.g., social, email, cpc"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="utmCampaign" className="block text-sm font-semibold text-gray-700 mb-2">
                  UTM Campaign (Optional)
                </label>
                <input
                  type="text"
                  id="utmCampaign"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="e.g., fall_promotion, product_launch"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all transform hover:scale-[1.02] ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? 'Creating Campaign...' : 'Generate Campaign URL'}
            </button>
          </form>
        </div>

        {/* Campaign Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
              2
            </span>
            Your Campaigns ({campaigns.length})
          </h2>

          {campaigns.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-200">
              <div className="text-gray-400 mb-4">
                <TrendingUp size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No campaigns yet
              </h3>
              <p className="text-gray-500">
                Create your first campaign to start tracking!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border border-orange-100 overflow-hidden group"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                    <h3 className="font-bold text-white text-lg truncate" title={campaign.campaignName}>
                      {campaign.campaignName}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-orange-100 text-sm">
                        {campaign.utmMedium}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          campaign.isActive
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-700'
                        }`}
                      >
                        {campaign.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-4 grid grid-cols-3 gap-2 text-center border-b border-gray-100">
                    <div>
                      <div className="flex items-center justify-center text-orange-500 mb-1">
                        <MousePointerClick size={16} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {campaign.totalClicks}
                      </div>
                      <div className="text-xs text-gray-500">Clicks</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center text-blue-500 mb-1">
                        <Users size={16} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {campaign.uniqueVisitorsCount}
                      </div>
                      <div className="text-xs text-gray-500">Unique</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center text-green-500 mb-1">
                        <Calendar size={16} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {campaign.totalBookings}
                      </div>
                      <div className="text-xs text-gray-500">Bookings</div>
                    </div>
                  </div>

                  {/* URL Display */}
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Campaign URL:</div>
                    <div className="text-xs text-gray-700 truncate font-mono bg-white px-2 py-1 rounded border border-gray-200">
                      {campaign.generatedUrl}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopyUrl(campaign.generatedUrl, campaign.campaignId)}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          copiedId === campaign.campaignId
                            ? 'bg-green-500 text-white'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        {copiedId === campaign.campaignId ? (
                          <>
                            <Check size={16} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copy URL
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleViewStats(campaign)}
                        className="flex-1 py-2 px-4 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-900 transition-all"
                      >
                        View Stats
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.campaignId)}
                      disabled={deletingId === campaign.campaignId}
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        confirmDeleteId === campaign.campaignId
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      } ${deletingId === campaign.campaignId ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Trash2 size={16} />
                      {deletingId === campaign.campaignId
                        ? 'Deleting...'
                        : confirmDeleteId === campaign.campaignId
                        ? 'Click Again to Confirm'
                        : 'Delete Campaign'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats Modal */}
      {showStatsModal && selectedCampaign && (
        <CampaignStatsModal
          campaign={selectedCampaign}
          onClose={() => {
            setShowStatsModal(false);
            setSelectedCampaign(null);
            fetchCampaigns(); // Refresh data
          }}
          onDelete={() => {
            fetchCampaigns(); // Refresh campaigns list after deletion
          }}
        />
      )}
    </div>
  );
}

