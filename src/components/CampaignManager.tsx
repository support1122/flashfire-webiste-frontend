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
  // Date filter and report data
  const [fromDate, setFromDate] = useState<string>(() => new Date().toISOString().slice(0,10));
  const [toDate, setToDate] = useState<string>(() => new Date().toISOString().slice(0,10));
  const [reportLoading, setReportLoading] = useState(false);
  const [report, setReport] = useState<any[]>([]);
  // Campaign date filter
  const [campaignFilterDate, setCampaignFilterDate] = useState<string>('');
  const [showAllCampaigns, setShowAllCampaigns] = useState<boolean>(true);

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

  // Filter campaigns based on selected date
  const filteredCampaigns = campaigns.filter(campaign => {
    if (showAllCampaigns || !campaignFilterDate) {
      return true;
    }
    
    const campaignDate = new Date(campaign.createdAt).toISOString().slice(0, 10);
    return campaignDate === campaignFilterDate;
  });

  // Handle campaign date filter change
  const handleCampaignDateFilter = (date: string) => {
    setCampaignFilterDate(date);
    setShowAllCampaigns(!date);
  };

  // Clear campaign filter
  const clearCampaignFilter = () => {
    setCampaignFilterDate('');
    setShowAllCampaigns(true);
  };

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
                  UTM Source *
                </label>
                <input
                  type="text"
                  id="campaignName"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">This will be your campaign identifier</p>
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

        {/* Date Filter + Report */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
            Filter by Date
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
              <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <button
                onClick={async ()=>{
                  setReportLoading(true);
                  try{
                    const url = new URL(`${API_BASE_URL}/api/campaigns/report`);
                    url.searchParams.set('from', fromDate);
                    url.searchParams.set('to', toDate);
                    const res = await fetch(url.toString());
                    const data = await res.json();
                    if(data.success){ setReport(data.data || []);} else { alert(data.message || 'Failed to load report'); }
                  }catch(err){ console.error(err); alert('Failed to load report'); }
                  finally{ setReportLoading(false);}                
                }}
                className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold"
              >
                {reportLoading ? 'Loading...' : 'Load Report'}
              </button>
            </div>
          </div>

          {/* Report list */}
          {report.length > 0 && (
            <div className="mt-6 space-y-6">
              {report.map((r)=> (
                <div key={r.campaignId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{r.campaignName}</h3>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{r.totalClicks}</div>
                        <div className="text-xs text-gray-500">Total Clicks</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{r.uniqueVisitors}</div>
                        <div className="text-xs text-gray-500">Unique Visitors</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{r.totalBookings}</div>
                        <div className="text-xs text-gray-500">Bookings</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{r.conversionRate}%</div>
                        <div className="text-xs text-gray-500">Conversion Rate</div>
                      </div>
                    </div>
                  </div>
                  {/* Bookings table */}
                  {r.bookings?.length > 0 && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-600">
                            <th className="py-2 pr-4">Booking ID</th>
                            <th className="py-2 pr-4">Name</th>
                            <th className="py-2 pr-4">Email</th>
                            <th className="py-2 pr-4">Phone</th>
                            <th className="py-2 pr-4">Meeting Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.bookings.map((b:any)=> (
                            <tr key={b.bookingId} className="border-t">
                              <td className="py-2 pr-4 font-mono">{b.bookingId}</td>
                              <td className="py-2 pr-4">{b.clientName}</td>
                              <td className="py-2 pr-4">{b.clientEmail}</td>
                              <td className="py-2 pr-4">{b.clientPhone || '-'}</td>
                              <td className="py-2 pr-4">{new Date(b.scheduledEventStartTime || b.bookingCreatedAt).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Campaign Cards */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                2
              </span>
              Your Campaigns ({filteredCampaigns.length}{showAllCampaigns ? '' : ` of ${campaigns.length}`})
            </h2>
            
            {/* Date Filter */}
            <div className="flex items-center gap-3">
              <label htmlFor="campaignDateFilter" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                Filter by Date:
              </label>
              <input
                type="date"
                id="campaignDateFilter"
                value={campaignFilterDate}
                onChange={(e) => handleCampaignDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {!showAllCampaigns && (
                <button
                  onClick={clearCampaignFilter}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
                  title="Show all campaigns"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

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
          ) : filteredCampaigns.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-200">
              <div className="text-gray-400 mb-4">
                <Calendar size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No campaigns found for this date
              </h3>
              <p className="text-gray-500 mb-4">
                No campaigns were created on {campaignFilterDate ? new Date(campaignFilterDate).toLocaleDateString() : 'the selected date'}.
              </p>
              <button
                onClick={clearCampaignFilter}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
              >
                Show All Campaigns
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
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
                    <div className="mt-2 text-orange-100 text-xs">
                      Created: {new Date(campaign.createdAt).toLocaleDateString()}
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
                  <div className="p-4 bg-gray-50 border-b border-gray-100 space-y-3">
                    {/* Website URL */}
                    <div>
                      <div className="text-xs text-gray-500 mb-1 font-semibold">Website URL:</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 text-xs text-gray-700 truncate font-mono bg-white px-2 py-1 rounded border border-gray-200">
                          {campaign.generatedUrl}
                        </div>
                        <button
                          onClick={() => handleCopyUrl(campaign.generatedUrl, `web-${campaign.campaignId}`)}
                          className={`p-2 rounded transition-all ${
                            copiedId === `web-${campaign.campaignId}`
                              ? 'bg-green-500 text-white'
                              : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                          title="Copy Website URL"
                        >
                          {copiedId === `web-${campaign.campaignId}` ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Calendly URL */}
                    <div>
                      <div className="text-xs text-gray-500 mb-1 font-semibold">Calendly URL:</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 text-xs text-gray-700 truncate font-mono bg-white px-2 py-1 rounded border border-gray-200">
                          {`https://calendly.com/feedback-flashfire/30min?utm_source=${campaign.utmSource}&utm_medium=${campaign.utmMedium || 'direct'}`}
                        </div>
                        <button
                          onClick={() => handleCopyUrl(
                            `https://calendly.com/feedback-flashfire/30min?utm_source=${campaign.utmSource}&utm_medium=${campaign.utmMedium || 'direct'}`,
                            `cal-${campaign.campaignId}`
                          )}
                          className={`p-2 rounded transition-all ${
                            copiedId === `cal-${campaign.campaignId}`
                              ? 'bg-green-500 text-white'
                              : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                          title="Copy Calendly URL"
                        >
                          {copiedId === `cal-${campaign.campaignId}` ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 space-y-2">
                    <div className="flex gap-2">
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

