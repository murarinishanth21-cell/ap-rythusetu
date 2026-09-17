import type { DealerActiveTab } from '../components/dealer/DealerSidebar';
import { api } from '../api';

export interface AppNotification {
  id: string;
  roleTarget: 'dealer' | 'farmer' | 'admin' | 'transport' | 'worker' | 'all';
  title: string;
  desc: string;
  time: string;
  timestamp: number;
  unread: boolean;
  category: string;
  linkTab?: DealerActiveTab;
  district?: string;
  metadata?: any;
}

const STORAGE_KEY = 'ap_rythusetu_notifications_v4';
const EVENT_NAME = 'ap-rythusetu-notification-change';

const SEED_NOTIFICATIONS: AppNotification[] = [
  // Dealer
  {
    id: 'notif-dlr-1',
    roleTarget: 'dealer',
    title: '🌶️ Market Rate Spike',
    desc: 'Guntur Sannam Chilli rose +4.8% to ₹18,500/Q in Guntur Mirchi Yard.',
    time: '6m ago',
    timestamp: Date.now() - 6 * 60 * 1000,
    unread: true,
    category: 'Market Update',
    linkTab: 'market_trends'
  },
  {
    id: 'notif-dlr-2',
    roleTarget: 'dealer',
    title: '🧑‍🌾 New Harvest Lot Listed',
    desc: 'Farmer V. Ramana Rao published 150 Q Teja Supreme Chilli in Tenali.',
    time: '18m ago',
    timestamp: Date.now() - 18 * 60 * 1000,
    unread: true,
    category: 'Farmer Listing',
    linkTab: 'buy_produce'
  },
  {
    id: 'notif-dlr-3',
    roleTarget: 'dealer',
    title: '🤝 Bargain Accepted',
    desc: 'Farmer Venkata Ramana accepted your counter-offer of ₹18,200/Q for lot #lst-101.',
    time: '42m ago',
    timestamp: Date.now() - 42 * 60 * 1000,
    unread: false,
    category: 'Deal Acceptance',
    linkTab: 'deal_and_ask'
  },
  {
    id: 'notif-dlr-4',
    roleTarget: 'dealer',
    title: '🚚 Transport Fleet Dispatched',
    desc: '10-Ton Freight Truck AP-07-TJ-4492 en route from Guntur Mandi to Tenali farm-gate.',
    time: '1h ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    unread: false,
    category: 'Logistics',
    linkTab: 'transport_vehicles'
  },

  // Farmer (ALL links strictly stay within Farmer Portal: farmer_sell)
  {
    id: 'notif-frm-1',
    roleTarget: 'farmer',
    title: '💼 Dealer Bargain Proposal',
    desc: 'Sri Balaji Agro Commodities submitted an offer of ₹18,000/Q for your 150 Q Chilli lot.',
    time: '4m ago',
    timestamp: Date.now() - 4 * 60 * 1000,
    unread: true,
    category: 'Bargain Offer',
    linkTab: 'farmer_sell',
    metadata: { openBargain: true, enquiryId: '101' }
  },
  {
    id: 'notif-frm-2',
    roleTarget: 'farmer',
    title: '🏛️ AP Govt MSP Price Alert',
    desc: 'Agriculture Dept declared minimum floor price safety of ₹16,500/Q for Red Chilli.',
    time: '25m ago',
    timestamp: Date.now() - 25 * 60 * 1000,
    unread: true,
    category: 'MSP Declaration',
    linkTab: 'farmer_sell'
  },
  {
    id: 'notif-frm-3',
    roleTarget: 'farmer',
    title: '🚜 Farm-Gate Transport Allocated',
    desc: 'Tractor Trolley AP-16-TX-9921 scheduled for loading today at 02:00 PM. OTP: 492011.',
    time: '2h ago',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    unread: false,
    category: 'Transport Booking',
    linkTab: 'farmer_sell',
    metadata: { farmerTab: 'transport' }
  },
  {
    id: 'notif-frm-4',
    roleTarget: 'farmer',
    title: '💰 Escrow Payment Credited',
    desc: '₹2,73,000 direct RTGS payment credited to your SBI Account (AP-Rythu Escrow).',
    time: '4h ago',
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    unread: false,
    category: 'Payment Settlement',
    linkTab: 'farmer_sell'
  },

  // Admin
  {
    id: 'notif-adm-1',
    roleTarget: 'admin',
    title: '🚨 Open Grievance Alert (#AP-GRV-0081)',
    desc: 'Farmer V. Ramana Rao reported ₹1.85L Mandi Payment Delay at Amaravathi Mandi.',
    time: '8m ago',
    timestamp: Date.now() - 8 * 60 * 1000,
    unread: true,
    category: 'Mandi Dispute',
    linkTab: 'grievances'
  },
  {
    id: 'notif-adm-2',
    roleTarget: 'admin',
    title: '📦 Buffer Stock Rebalance Alert',
    desc: 'Ananthapur and Sri Sathya Sai dryland granaries require groundnut replenishment.',
    time: '12m ago',
    timestamp: Date.now() - 12 * 60 * 1000,
    unread: true,
    category: 'State Buffer',
    linkTab: 'stock_inventory'
  },
  {
    id: 'notif-adm-3',
    roleTarget: 'admin',
    title: '❄️ Cold Storage Capacity Warning',
    desc: 'Machilipatnam and Kakinada port silos operating above 82% capacity.',
    time: '35m ago',
    timestamp: Date.now() - 35 * 60 * 1000,
    unread: false,
    category: 'Warehouse Logistics',
    linkTab: 'warehouse_storage'
  }
];

function readStorage(): AppNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  // Initialize with seed
  saveStorage(SEED_NOTIFICATIONS);
  return SEED_NOTIFICATIONS;
}

function saveStorage(items: AppNotification[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (e) {
    console.error('Failed to save notifications', e);
  }
}

export const notificationService = {
  getNotifications(role?: string): AppNotification[] {
    const all = readStorage();
    if (!role || role === 'all') return all;
    return all.filter((n) => n.roleTarget === role || n.roleTarget === 'all');
  },

  addNotification(notif: {
    roleTarget: 'dealer' | 'farmer' | 'admin' | 'transport' | 'worker' | 'all';
    title: string;
    desc: string;
    category?: string;
    linkTab?: DealerActiveTab;
    district?: string;
    metadata?: any;
    unread?: boolean;
    time?: string;
  }): AppNotification {
    const all = readStorage();
    const item: AppNotification = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      roleTarget: notif.roleTarget,
      title: notif.title,
      desc: notif.desc,
      category: notif.category || 'System Alert',
      linkTab: notif.linkTab,
      district: notif.district,
      metadata: notif.metadata,
      unread: notif.unread !== undefined ? notif.unread : true,
      time: notif.time || 'Just now',
      timestamp: Date.now()
    };

    all.unshift(item);
    saveStorage(all);
    return item;
  },

  markAsRead(id: string): void {
    const all = readStorage();
    const updated = all.map((n) => (n.id === id ? { ...n, unread: false } : n));
    saveStorage(updated);
  },

  markAllAsRead(role?: string): void {
    const all = readStorage();
    const updated = all.map((n) => {
      if (!role || role === 'all' || n.roleTarget === role || n.roleTarget === 'all') {
        return { ...n, unread: false };
      }
      return n;
    });
    saveStorage(updated);
  },

  removeNotification(id: string): void {
    const all = readStorage();
    const updated = all.filter((n) => n.id !== id);
    saveStorage(updated);
  },

  clearAll(role?: string): void {
    const all = readStorage();
    if (!role || role === 'all') {
      saveStorage([]);
    } else {
      const remaining = all.filter((n) => n.roleTarget !== role && n.roleTarget !== 'all');
      saveStorage(remaining);
    }
  },

  async syncGrievancesFromApi(): Promise<void> {
    try {
      const grievances = await api.getGrievances();
      if (Array.isArray(grievances) && grievances.length > 0) {
        const all = readStorage();
        let changed = false;
        for (const g of grievances) {
          const notifId = `grv-notif-${g.id}`;
          if (!all.some((n) => n.id === notifId)) {
            all.unshift({
              id: notifId,
              roleTarget: 'admin',
              title: `🚨 Grievance #${g.id} (${g.category || 'Mandi Dispute'})`,
              desc: `${g.user_name || 'Farmer'} in ${g.district || 'AP'}: "${g.description || g.translated_text || 'Reported grievance'}"`,
              time: g.created_at || 'Recent',
              timestamp: Date.now(),
              unread: g.status === 'Open',
              category: g.category || 'Mandi Dispute',
              linkTab: 'grievances',
              district: g.district
            });
            changed = true;
          }
        }
        if (changed) {
          saveStorage(all);
        }
      }
    } catch (e) {
      console.error('Failed to sync grievances into notifications', e);
    }
  },

  subscribe(callback: () => void): () => void {
    const handler = () => callback();
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener('storage', handler);
    };
  }
};
